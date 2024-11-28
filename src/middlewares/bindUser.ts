import { NextFunction, Response } from "express"

import jwt from "jsonwebtoken"
import { AppRequest } from "../interfaces/AppRequest"

const bindUser = (request: AppRequest, response: Response, next: NextFunction) => {
   const bearer = request.headers.authorization
   const bearerToken = bearer && bearer.split(" ")[1]
   const token = bearerToken
   if (token) {
      jwt.verify(token, process.env.JWT_PRIVATE_KEY as string, (error, user) => {
         console.log(error)
         if (error) {
            next()
         } else {
            const userPaylod: { ID_UTILISATEUR: number } = user as { ID_UTILISATEUR: number }
            request.userId = userPaylod.ID_UTILISATEUR
            next()
         }
      })
   } else {
      next()
   }
}
export default bindUser
