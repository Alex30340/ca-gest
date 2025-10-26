const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Importer vos routes ici si besoin
// const usersRouter = require('./routes/users');
// app.use('/api/users', usersRouter);

// Servir le frontend compilé depuis le dossier public
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log('Server is running on port ' + PORT);
});
