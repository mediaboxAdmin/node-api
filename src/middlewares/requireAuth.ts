import { NextFunction, Response } from "express"
import { AppRequest } from "../interfaces/AppRequest"

const requireAuth = (request: AppRequest, response: Response, next: NextFunction) => {
   if (request.userId) {
      next()
   } else {
      response.status(401).json({
         errors: {
            main: "Jeton d'authentification manquante ou invalide",
         },
         authStatus: request.authStatus,
      })
   }
}

export default requireAuth
