const express = require("express")
const utilisateurs_routes = express.Router("")
const utilisateurs_controller = require("../controllers/utilisateurs.controller")

utilisateurs_routes.get("/utilisateurs", utilisateurs_controller.getUtilisateurs)
utilisateurs_routes.post("/utilisateurs", utilisateurs_controller.creerUtilisateur)
utilisateurs_routes.get("/utilisateurs/:ID_UTILISATEUR", utilisateurs_controller.findByid)
utilisateurs_routes.put("/utilisateurs/:ID_UTILISATEUR", utilisateurs_controller.modifierUtilisateur)
utilisateurs_routes.delete("/utilisateurs/:ID_UTILISATEUR", utilisateurs_controller.supprimerUtilisateur)

module.exports = utilisateurs_routes