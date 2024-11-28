import { Request, Response } from "express"
import path from "path"

export const uploadFicher = async (req: Request, res: Response) => {
   try {
      if (req.files) {
         const fichier = Array.isArray(req.files.fichier) ? req.files.fichier[0] : req.files.fichier
         const dossier = path.resolve("./") + path.sep + "public" + path.sep
         const nomFichier = fichier.name
         const destination = dossier + nomFichier
         await fichier.mv(destination)
         res.status(200).json({
            message: "Votre fichier a été enregistré",
         })
      } else {
         res.status(422).send("Aucun fichier envoyé")
      }
   } catch (error) {
      console.log(error)
      res.status(500).send("Erreur interne du serveur")
   }
}
