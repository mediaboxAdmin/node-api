import express from "express"
const utilisateurs_routes = express.Router()

import * as utilisateurs_controller from "../controllers/utilisateurs.controller"
import requireAuth from "../middlewares/requireAuth"

utilisateurs_routes.get("/utilisateurs", utilisateurs_controller.getUtilisateurs)
utilisateurs_routes.post("/utilisateurs", utilisateurs_controller.creerUtilisateurs)
utilisateurs_routes.get("/utilisateurs/:ID_UTILISATEUR", utilisateurs_controller.findByid)
utilisateurs_routes.put("/utilisateurs/:ID_UTILISATEUR", requireAuth, utilisateurs_controller.modifierUtilisateur)
utilisateurs_routes.delete("/utilisateurs/:ID_UTILISATEUR", requireAuth, utilisateurs_controller.supprimerUtilisateur)

export default utilisateurs_routes
