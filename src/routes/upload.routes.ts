import express from "express"
const upload_routes = express.Router()
import * as upload_controller from "../controllers/upload.controller"

upload_routes.post("/fichier", upload_controller.uploadFicher)

export default upload_routes
