import express, { Application } from "express"
import ip from "ip"
import utilisateurs_routes from "./routes/utilisateurs.routes"
import upload_routes from "./routes/upload.routes"
import fileUpload from "express-fileupload"
import auth_routes from "./routes/auth.routes"
import bindUser from "./middlewares/bindUser"
import cors from "cors"

export class App {
   readonly app: Application
   private readonly APPLICATION_RUNNING = `application is running on:`

   constructor(private readonly port: string | number = process.env.PORT || 3000) {
      this.app = express()
      this.middleware()
      this.routes()
   }

   async listen(): Promise<void> {
      this.app.listen(this.port, async () => {
         console.log(`${this.APPLICATION_RUNNING} http://${ip.address()}:${this.port}`)
      })
   }

   private middleware(): void {
      this.app.use(cors({ origin: "*" }))
      this.app.use(bindUser)
      this.app.use(express.static(__dirname + "/public"))
      this.app.use(express.json())
      this.app.use(fileUpload())
   }

   private routes(): void {
      this.app.use("/", utilisateurs_routes)
      this.app.use("/upload", upload_routes)
      this.app.use("/auth", auth_routes)
      this.app.all("*", (req, res) => {
         res.status(404).send("Route not found")
      })
   }
}
