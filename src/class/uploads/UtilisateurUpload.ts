import IMAGES_DESTINATIONS from "../../constants/IMAGES_DESTINATIONS"
import Upload from "../Upload"
import path from "path"

class UtilisateurUpload extends Upload {
   readonly destinationPath: string
   constructor() {
      super()
      this.destinationPath = path.resolve("./") + path.sep + "public" + IMAGES_DESTINATIONS.utilisateurs
   }
}
export default UtilisateurUpload
