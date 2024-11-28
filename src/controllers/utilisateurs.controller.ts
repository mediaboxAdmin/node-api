import { Request, Response } from "express"

import Validation from "../class/Validation"
import path from "path"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import IMAGES_DESTINATIONS from "../constants/IMAGES_DESTINATIONS"
import UtilisateurUpload from "../class/uploads/UtilisateurUpload"
import Utilisateurs from "../models/Utilisateurs"
import Profils from "../models/Profils"
dotenv.config()

export const getUtilisateurs = async (req: Request, res: Response) => {
   try {
      const utilisateurs = await Utilisateurs.findAll({
         include: {
            model: Profils,
            as: "profil",
         },
      })
      res.status(200).json(utilisateurs)
   } catch (error) {
      console.log(error)
      res.status(500).send("Erreur interne du serveur")
   }
}

export const findByid = async (req: Request, res: Response) => {
   try {
      const { ID_UTILISATEUR } = req.params
      const utilisateur = await Utilisateurs.findOne({
         where: {
            ID_UTILISATEUR: ID_UTILISATEUR,
         },
      })
      res.status(200).json(utilisateur)
   } catch (error) {
      console.log(error)
      res.status(500).send("Erreur interne du serveur")
   }
}

export const creerUtilisateurs = async (req: Request, res: Response) => {
   try {
      const { NOM, PRENOM, ID_PROFIL, EMAIL, MOT_DE_PASSE } = req.body
      const { IMAGE: IMAGES } = req.files || {}
      const IMAGE = Array.isArray(IMAGES) ? IMAGES[0] : IMAGES
      const data = {
         ...req.body,
         ...req.files,
      }
      const validation = new Validation(
         data,
         {
            NOM: {
               required: true,
               alpha: true,
               length: [2, 20],
            },
            PRENOM: {
               required: true,
               alpha: true,
               length: [2, 20],
            },
            ID_PROFIL: {
               required: true,
               number: true,
               exists: "profils,ID_PROFIL",
            },
            IMAGE: {
               required: true,
               image: 2000000,
            },
            EMAIL: {
               required: true,
               email: true,
               unique: "utilisateurs,EMAIL",
            },
            MOT_DE_PASSE: {
               required: true,
               length: [8],
            },
         },
         {
            NOM: {
               required: "Ce champ est obligatoire",
               alpha: "Le nom doit contenir des caractères alphanumériques",
               length: "Le nom doit comporter entre 2 et 20 caractères",
            },
            PRENOM: {
               required: "Ce champ est obligatoire",
               alpha: "Le prénom doit contenir des caractères alphanumériques",
               length: "Le prénom doit comporter entre 2 et 20 caractères",
            },
            ID_PROFIL: {
               required: "Le profil est obligatoire",
               number: "Ce champ doit contenir un nombre valide",
               exists: "Le profil n'existe pas",
            },
            IMAGE: {
               required: "L'image de l'utilisateur est obligatoire",
               image: "L'image est valide",
               size: "Image trop volumineuse (max: 2Mo)",
            },
            EMAIL: {
               required: "L'email est obligatoire",
               email: "Email invalide",
               unique: "Email déjà utilisé",
            },
            MOT_DE_PASSE: {
               required: "Le mot de passe est obligatoire",
               length: "Le mot de passe doit contenir au moins 8 caracteres",
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
      const utilisateurUpload = new UtilisateurUpload()
      const fichier = await utilisateurUpload.upload(IMAGE)
      const imageUrl = `${req.protocol}://${req.get("host")}${IMAGES_DESTINATIONS.utilisateurs}${path.sep}${fichier.fileInfo.fileName}`
      const salt = await bcrypt.genSalt()
      const password = await bcrypt.hash(MOT_DE_PASSE, salt)
      const nouveauUtilisateur = await Utilisateurs.create({
         NOM: NOM,
         PRENOM: PRENOM,
         ID_PROFIL: ID_PROFIL,
         IMAGE: imageUrl,
         EMAIL: EMAIL,
         MOT_DE_PASSE: password,
      })
      const payload = {
         ID_UTILISATEUR: nouveauUtilisateur.toJSON().ID_UTILISATEUR,
      }
      const accessToken = jwt.sign(payload, process.env.JWT_PRIVATE_KEY as string, { expiresIn: 259200 })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { MOT_DE_PASSE: mdp, ...other } = nouveauUtilisateur.toJSON()
      res.status(200).json({
         message: "Nouvel utilisateur créé avec succès",
         data: {
            ...other,
            token: accessToken,
         },
      })
   } catch (error) {
      console.log(error)
      res.status(500).send("Erreur interne du serveur")
   }
}

export const modifierUtilisateur = async (req: Request, res: Response) => {
   try {
      const { ID_UTILISATEUR } = req.params
      const { NOM, PRENOM } = req.body
      await Utilisateurs.update(
         {
            NOM: NOM,
            PRENOM: PRENOM,
         },
         {
            where: {
               ID_UTILISATEUR: ID_UTILISATEUR,
            },
         },
      )
      res.status(200).json({
         message: "Utilisateur modifié avec succès",
         data: {
            ID_UTILISATEUR,
            NOM,
            PRENOM,
         },
      })
   } catch (error) {
      console.log(error)
      res.status(500).send("Erreur interne du serveur")
   }
}

export const supprimerUtilisateur = async (req: Request, res: Response) => {
   try {
      const { ID_UTILISATEUR } = req.params
      await Utilisateurs.destroy({
         where: {
            ID_UTILISATEUR: ID_UTILISATEUR,
         },
      })
      res.status(200).json({
         message: "L'utilisateur a été supprimé avec succès",
      })
   } catch (error) {
      console.log(error)
      res.status(500).send("Erreur interne du serveur")
   }
}
