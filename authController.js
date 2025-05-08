const bcrypt = require('bcrypt');
const User = require('./models/User');


async function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Gebruikersnaam en wachtwoord zijn verplicht!" });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: 'Gebruiker bestaat al!' });
    }

    // Genereer salt en hash het wachtwoord
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Sla de gebruiker op in de database
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Gebruiker geregistreerd!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Er is een fout opgetreden bij de registratie.' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Gebruikersnaam en wachtwoord zijn vereist!' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: 'Gebruiker niet gevonden!' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.status(200).json({ message: 'Inloggen succesvol!' });
    } else {
      res.status(400).json({ message: 'Ongeldig wachtwoord!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Er is een fout opgetreden bij het inloggen.' });
  }
}

module.exports = { register, login };
