/* eslint-disable @typescript-eslint/no-explicit-any */
type ValidationRules = Record<string, any>
type CustomMessages = Record<string, Record<string, string>>
type Errors = Record<string, string[]>

export default class Validation {
   private data: Record<string, any>
   private validation: ValidationRules
   private customMessages: CustomMessages | undefined
   private errors: Errors

   constructor(data: Record<string, any>, validation: ValidationRules, customMessages?: CustomMessages) {
      this.data = data
      this.validation = validation
      this.customMessages = customMessages
      this.errors = {}
   }

   /**
    * Check if passed data are valid
    * @returns Boolean
    */
   async isValidate(): Promise<boolean> {
      const errors = await this.getErrors()
      return Object.keys(errors).length === 0 && errors.constructor === Object
   }

   /**
    * Set a new error message
    * @param key - message key
    * @param message - error description
    */
   async setError(key: string, message: string): Promise<void> {
      const errorList = this.errors[key] ? [...this.errors[key], message] : [message]
      this.errors = { ...this.errors, [key]: errorList }
   }

   /**
    * Get error message by key
    * @param key - message key
    * @returns string[] | undefined
    */
   async getError(key: string): Promise<string[] | undefined> {
      await this.run()
      return this.errors[key]
   }

   /**
    * Mark input data as required
    * @param key - key to mark as required
    * @param value - input value
    */
   async required(key: string, intitialValue: string) {
      try {
         if (!this.validation[key] || !this.validation[key].required) return false
         const value = typeof intitialValue == "string" ? (intitialValue ? intitialValue.trim() : "") : intitialValue
         let isInvalid = false
         if (typeof value == "string" || Array.isArray(value)) {
            if (!value || value === "" || value.length === 0) {
               isInvalid = true
            }
         } else if (typeof value == "object" && !Array.isArray(value)) {
            if (!value) {
               isInvalid = true
            }
         } else if (!value) {
            isInvalid = true
         }
         if (isInvalid) {
            this.setError(key, this.customMessages?.[key]?.required || `Ce champ est obligatoire`)
         }
      } catch (error) {
         console.log(error)
         throw error
      }
   }

   async length(key: string, value: string, params: [number?, number?]): Promise<void> {
      if (!value) return
      const [min, max] = params

      if (min && !max && value.length < min) {
         await this.setError(key, this.customMessages?.[key]?.length || `Enter at least ${min} characters`)
      } else if (!min && max && value.length > max) {
         await this.setError(key, this.customMessages?.[key]?.length || `You cannot exceed ${max} characters`)
      } else if (min && max && (value.length < min || value.length > max)) {
         await this.setError(key, this.customMessages?.[key]?.length || `The value must be between ${min} and ${max}`)
      }
   }

   async match(key: string, value: string, matchKey: string): Promise<void> {
      if (!value) return
      if (this.data[matchKey] !== value) {
         await this.setError(key, this.customMessages?.[key]?.match || `Value does not match ${matchKey}`)
      }
   }

   async username(key: string, value: string): Promise<void> {
      if (!value) return
      const validUsername = /^[a-zA-Z0-9._]+$/.test(value)
      if (!validUsername || value.length < 2) {
         await this.setError(
            key,
            this.customMessages?.[key]?.username || "Incorrect username (letters, numbers, point, or underscore)",
         )
      }
   }

   async email(key: string, value: string): Promise<void> {
      if (!value) return
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      if (!validEmail) {
         await this.setError(key, this.customMessages?.[key]?.email || "Incorrect email")
      }
   }

   async image(key: string, value: { mimetype: string; size: number }, maxSize: number): Promise<void> {
      if (!value) return
      const IMAGES_MIMES = ["image/jpeg", "image/jpg", "image/gif", "image/png"]
      if (!IMAGES_MIMES.includes(value.mimetype)) {
         await this.setError(key, this.customMessages?.[key]?.image || "Please choose a valid image")
      } else if (value.size > maxSize) {
         const megaBytes = (maxSize - 1000000) / 1000000
         await this.setError(key, this.customMessages?.[key]?.size || `Image is too large (max: ${megaBytes} MB)`)
      }
   }

   async fileTypes(key: string, value: { mimetype: string; size: number }, params: string[]) {
      if (!value || !value?.mimetype) return
      const VALID_MIMES = params
      if (!VALID_MIMES.includes(value.mimetype)) {
         this.setError(key, this.customMessages?.[key]?.fileTypes || `Invalid file type(${params.join(", ")})`)
      }
   }

   async fileSize(key: string, value: { mimetype: string; size: number }, params: number) {
      if (!value || !value?.size) return
      if (params < value.size) {
         const megaBite = (params - 1000000) / 1000000
         this.setError(key, this.customMessages?.[key]?.fileSize || `File too large (max: ${megaBite} MB)`)
      }
   }

   alpha(key: string, value: string) {
      if (!value) return
      const pattern = /^[\w\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~\u00C0-\u017F]+$/u
      const isString = pattern.test(value)
      if (!isString) {
         this.setError(
            key,
            this.customMessages?.[key]?.alpha || `Ce champ doit contenir uniquement des caractères alphanumériques`,
         )
      }
   }

   url(key: string, value: string) {
      if (!value) return
      function isValidURL(text: string) {
         const pattern = new RegExp(
            "^(https?:\\/\\/)?" + // Optional protocol
               "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" + // Domain name
               "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IPv4 address
               "(\\:\\d+)?" + // Optional port
               "(\\/[-a-zA-Z0-9%_.~+]*)*" + // Path
               "(\\?[;&a-zA-Z0-9%_.~+=-]*)?" + // Query string
               "(\\#[-a-zA-Z0-9_]*)?$", // Fragment
            "i",
         )
         return !!pattern.test(text)
      }
      if (!isValidURL(value)) {
         this.setError(key, this.customMessages?.[key]?.url || `Invalid url`)
      }
   }

   async run(): Promise<void> {
      for (const key in this.validation) {
         const value = this.getValue(key)
         const [properties, params] = this.getProperties(this.validation[key])

         await Promise.all(
            properties.map(async (property: string) => {
               const method = this[property as keyof Validation] as
                  | ((key: string, value: any, param?: any) => Promise<void>)
                  | undefined

               if (method) {
                  await method.call(this, key, value, params?.[property])
               } else {
                  throw new Error(`Method ${property} not found on Validation class`)
               }
            }),
         )
      }
   }

   /**
    * Get all errors
    * @returns Errors
    */
   async getErrors(): Promise<Errors> {
      return this.errors
   }

   private getProperties(value: any): [string[], Record<string, any> | null] {
      if (typeof value == "string") {
         return [value.split(","), null]
      } else if (typeof value == "object" && value) {
         const properties = Object.keys(value)
         return [properties, value]
      } else {
         return [[], null]
      }
   }

   private getValue(key: string): any {
      return this.data[key]
   }
}
