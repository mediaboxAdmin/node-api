const express = require("express")
const utilisateurs_routes = express.Router("")
const utilisateurs_controller = require("../controllers/utilisateurs.controller")
const requireAuth = require("../middlewares/requireAuth")

utilisateurs_routes.get("/utilisateurs", requireAuth, utilisateurs_controller.getUtilisateurs)
utilisateurs_routes.post("/utilisateurs", utilisateurs_controller.creerUtilisateur)
utilisateurs_routes.get("/utilisateurs/:ID_UTILISATEUR", requireAuth, utilisateurs_controller.findByid)
utilisateurs_routes.put("/utilisateurs/:ID_UTILISATEUR", requireAuth, utilisateurs_controller.modifierUtilisateur)
utilisateurs_routes.delete("/utilisateurs/:ID_UTILISATEUR", requireAuth, utilisateurs_controller.supprimerUtilisateur)

module.exports = utilisateurs_routes