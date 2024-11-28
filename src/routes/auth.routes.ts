import express from "express"
const auth_routes = express.Router()
import * as auth_controller from "../controllers/auth.controller"

auth_routes.post("/login", auth_controller.login)

export default auth_routes
