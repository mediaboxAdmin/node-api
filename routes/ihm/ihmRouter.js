const express = require("express")
const utilisateurs_routes = require("../utilisateurs.routes")

const ihmRouter= express.Router()

ihmRouter.use("/utilisateurs", utilisateurs_routes)

module.exports=ihmRouter