const express = require('express');
const utilisateurs_routes = require('./routes/utilisateurs.routes');
const app = express();
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(monMiddleware);

// Middleware spécifique à une route
app.use('/', utilisateurs_routes)

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});