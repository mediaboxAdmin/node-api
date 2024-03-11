const express = require('express');
const utilisateurs_routes = require('./routes/utilisateurs.routes');
const app = express();
const dotenv = require('dotenv');
const upload_routes = require('./routes/upload.routes');
const fileUpload = require("express-fileupload");
const auth_routes = require('./routes/auth.routes');
const bindUser = require('./middlewares/bindUser');
dotenv.config()

const port = process.env.PORT;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
// app.use(monMiddleware);

// Middleware spécifique à une route
app.all("*", bindUser);
app.use('/', utilisateurs_routes)
app.use('/upload', upload_routes)
app.use('/auth', auth_routes)

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});