import { UploadedFile } from "express-fileupload"
import path from "path"
import fs from "fs"
import sharp from "sharp"

const IMAGES_MIMES = ["image/jpeg", "image/gif", "image/png"]
export default class Upload {
   readonly destinationPath: string
   constructor() {
      this.destinationPath = path.resolve("./") + path.sep + "public" + path.sep + "uploads"
   }
   async upload(file: UploadedFile, withThumb = true, fileDestination?: string, enableCompressing = true) {
      try {
         const extname = fileDestination ? path.extname(fileDestination) : path.extname(file.name)
         const defaultFileName = Date.now() + extname
         const finalFileName = fileDestination ? path.basename(fileDestination) : defaultFileName
         const thumbName = path.parse(finalFileName).name + "_thumb" + path.extname(finalFileName)
         const destinationFolder = fileDestination ? path.dirname(fileDestination) : this.destinationPath
         const filePath = destinationFolder + path.sep + finalFileName
         const thumbPath = destinationFolder + path.sep + thumbName
         if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true })
         }
         const isImage = IMAGES_MIMES.includes(file.mimetype)
         let thumbInfo = undefined
         if (withThumb && isImage) {
            thumbInfo = await sharp(file.data).resize(354, 221, { fit: "inside" }).toFormat("jpg").toFile(thumbPath)
         }
         let fileInfo = {}
         if (isImage && enableCompressing) {
            fileInfo = await sharp(file.data)
               .resize(500)
               .toFormat("jpeg", { quality: 100 })
               .toFile(filePath.toLowerCase())
         } else {
            await file.mv(filePath)
            fileInfo = file
         }
         return {
            fileInfo: { ...fileInfo, fileName: finalFileName },
            thumbInfo: withThumb ? { ...thumbInfo, thumbName } : undefined,
         }
      } catch (error) {
         console.log(error)
         throw error
      }
   }
}
