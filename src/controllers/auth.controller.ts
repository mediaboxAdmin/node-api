import { Request, Response } from "express"

import Validation from "../class/Validation"
import Utilisateurs from "../models/Utilisateurs"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const login = async (req: Request, res: Response) => {
   try {
      const { EMAIL, MOT_DE_PASSE } = req.body
      const validation = new Validation(
         req.body,
         {
            EMAIL: {
               required: true,
               email: true,
            },
            MOT_DE_PASSE: {
               required: true,
            },
         },
         {
            EMAIL: {
               required: "L'email est obligatoire",
               email: "Email invalide",
            },
            MOT_DE_PASSE: {
               required: "Le mot de passe est obligatoire",
            },
         },
      )
      await validation.run()
      const isValid = await validation.isValidate()
      if (!isValid) {
         const errors = await validation.getErrors()
         res.status(422).json({
            message: "La validation des données a echouée",
            data: errors,
         })
         return
      }
      const utilisateur = await Utilisateurs.findOne({
         where: {
            EMAIL: EMAIL,
         },
      })
      if (utilisateur) {
         const isPasswordValid = await bcrypt.compare(MOT_DE_PASSE, utilisateur.toJSON().MOT_DE_PASSE)
         if (isPasswordValid) {
            const payload = {
               ID_UTILISATEUR: utilisateur.toJSON().ID_UTILISATEUR,
            }
            const accessToken = jwt.sign(payload, process.env.JWT_PRIVATE_KEY as string, { expiresIn: 259200 })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { MOT_DE_PASSE: mdp, ...other } = utilisateur.toJSON()
            res.status(200).json({
               message: "Identifiants correct",
               data: {
                  ...other,
                  token: accessToken,
               },
            })
         } else {
            res.status(401).json({
               message: "Identifiants incorrects",
            })
         }
      } else {
         res.status(401).json({
            message: "Identifiants incorrects",
         })
      }
   } catch (error) {
      console.log(error)
      res.status(500).send("Erreur interne du serveur")
   }
}
