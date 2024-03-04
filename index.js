const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bienvenue sur votre application Express.js !');
});

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});