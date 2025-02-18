const express = require('express');
const utilisateurs_routes = require('./routes/utilisateurs.routes');
const app = express();
const dotenv = require('dotenv');
const upload_routes = require('./routes/upload.routes');
const fileUpload = require("express-fileupload");
const auth_routes = require('./routes/auth.routes');
const bindUser = require('./middlewares/bindUser');
const cors = require("cors");
const http = require("http")
const https = require("https")
const handleSocketEvents = require('./socket');
const { RESEARCH_CONDUCTOR } = require('./crons/RESEARCH_CONDUCTOR');
dotenv.config()

const port = process.env.PORT;

app.use(cors({
     origin: "*"
}));
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


const enableHttps = process.env.ENABLE_HTTPS
var server
if (enableHttps == 1) {
  var options = {
    key: fs.readFileSync("/var/www/html/api/https/privkey.pem"),
    cert: fs.readFileSync("/var/www/html/api/https/fullchain.pem"),
  };
  server = https.createServer(options, app);
} else {
  server = http.createServer(app);
}

// sockets
handleSocketEvents(io)
app.io = io

server.listen(port, () => {
   // crons
   RESEARCH_CONDUCTOR(io)
  console.log(`Serveur écoutant sur le port ${port}`);
});