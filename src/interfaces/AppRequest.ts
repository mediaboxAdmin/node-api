import { Request } from "express"

export interface AppRequest extends Request {
   userId?: number
   authStatus?: string
}
