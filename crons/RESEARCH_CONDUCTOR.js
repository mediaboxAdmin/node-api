const { Op } = require("sequelize")
const IDS_COURSE_DRIVER_DEMANDES = require("../constants/IDS_COURSE_DRIVER_DEMANDES")
const IDS_COURSE_STATUS = require("../constants/IDS_COURSE_STATUS")
const TIMING = require("../constants/TIMING")
const { findDrivers } = require("../controllers/course/courses.controller")
const Course_driver_demandes = require("../models/admin/Course_driver_demandes")
const Courses = require("../models/admin/Courses")
const { findOne } = require("../models/course/courses.model")
const { query } = require("../utils/db")
const moment = require("moment-timezone")

/**
 * Cela présente le nombre de seconde que le chauffeur va voir pour accepter la demande
 * @author Dukizwe Darcy <darcy@mediabox.bi>
 */
const TIME_TO_ACCEPT = TIMING.TIME_TO_ACCEPT

/**
 * Le temps additionnel pour accepter la demande
 * @author Dukizwe Darcy <darcy@mediabox.bi>
 */
const ADDITIONAL_SECONDS = TIMING.ADDITIONAL_SECONDS

/**
 * Un cron qui écoute les demandes de chaffeur qui ne sont encore acceptee pour les relancer
 * @author Dukizwe Darcy <darcy@mediabox.bi>
 */
const RESEARCH_CONDUCTOR = (io) => {
   var interval = setInterval(() => {
      clearInterval(interval)
      researchAgain(io)
   }, (TIME_TO_ACCEPT + ADDITIONAL_SECONDS) * 1000)
}

const researchAgain = async (io) => {
   try {
      const courses = await query(`SELECT ID_COURSE, ID_DRIVER, ID_DRIVER_DEMANDE, ID_STATUT, ID_RIDER, LATITUDE_PICKUP, LONGITUDE_PICKUP, ADDRESSE_PICKUP, ADDRESSE_DESTINATION, DISTANCE, MONTANT_ESTIMATIF, DATE_INSERTION FROM courses WHERE ID_DRIVER IS NULL AND ID_STATUT IN (?) AND DATE_REDEMANDE <= NOW() - INTERVAL ${TIME_TO_ACCEPT + ADDITIONAL_SECONDS} SECOND`, [[IDS_COURSE_STATUS.EN_ETTENTE]])
      const annulesDemandes = await query("SELECT ID_COURSE FROM courses WHERE ID_DRIVER_DEMANDE IS NOT NULL AND ID_DRIVER IS NULL AND ID_STATUT = ?", [IDS_COURSE_STATUS.ANNLER_PAR_RIDER])
      const coursesIds = courses.map(c => c.ID_COURSE)
      const annulesIds = annulesDemandes.map(c => c.ID_COURSE)
      if (coursesIds.length > 0 || annulesIds.length > 0) {
         await query("UPDATE courses SET ID_DRIVER_DEMANDE = NULL WHERE ID_COURSE IN (?)", [...coursesIds, ...annulesIds])
      }
      const exceedWaiting = courses.filter(c => moment().diff(moment(c.DATE_INSERTION), "minutes") > 60)
      const normalTips = courses.filter(c => moment().diff(moment(c.DATE_INSERTION), "minutes") <= 60)
      if (exceedWaiting.length > 0) {
         const tripsIds = exceedWaiting.map(c => c.ID_COURSE)
         await Courses.update({
            ID_STATUT: IDS_COURSE_STATUS.ANNLER_PAR_ADMIN,
            ID_RAISON_ANNULATION: 6
         }, {
            where: {
               ID_COURSE: {
                  [Op.in]: tripsIds
               }
            }
         })
      }
      if (normalTips.length > 0) {
         // const course_driver_demandes = courses.filter(c => c.ID_DRIVER_DEMANDE).map(c => ({
         //           ID_DRIVER: c.ID_DRIVER_DEMANDE,
         //           ID_COURSE: c.ID_COURSE,
         //           ID_DEMANDE_STATUT: IDS_COURSE_DRIVER_DEMANDES.DEMANDE_EXPIREE
         // }))
         await query("UPDATE drivers SET HAS_DEMANDE_COURSE = NULL WHERE HAS_DEMANDE_COURSE IN (?)", [coursesIds])
         const alreadyExpired = await query("SELECT ID_DRIVER FROM course_driver_demandes WHERE ID_COURSE IN (?) AND ID_DEMANDE_STATUT = ?", [coursesIds, IDS_COURSE_DRIVER_DEMANDES.DEMANDE_EXPIREE])
         const expiredDriversIds = alreadyExpired.map(d => d.ID_DRIVER)
         var sqlQuery = "SELECT * FROM course_driver_demandes WHERE ID_COURSE IN (?) AND ID_DEMANDE_STATUT = ? "
         var binds = [coursesIds, IDS_COURSE_DRIVER_DEMANDES.ENVOIE_DEMANDE, expiredDriversIds]
         if (expiredDriversIds.length > 0) {
            sqlQuery += " AND ID_DRIVER NOT IN (?)"
            binds.push(expiredDriversIds)
         }
         const demandesExpires = await query(sqlQuery, binds)
         const course_driver_demandes = demandesExpires.map(d => ({
            ID_DRIVER: d.ID_DRIVER,
            ID_COURSE: d.ID_COURSE,
            ID_DEMANDE_STATUT: IDS_COURSE_DRIVER_DEMANDES.DEMANDE_EXPIREE
         }))
         if (course_driver_demandes) {
            await Course_driver_demandes.bulkCreate(course_driver_demandes)
         }
         await Promise.all(normalTips.map(async course => {
            const courseOG = await findOne(course.ID_COURSE)
            findDrivers(courseOG, course.LATITUDE_PICKUP, course.LONGITUDE_PICKUP, io)
         }))
      }
      RESEARCH_CONDUCTOR()
   } catch (error) {
      console.log(error)
   }
}

module.exports = {
   RESEARCH_CONDUCTOR,
   TIME_TO_ACCEPT,
   ADDITIONAL_SECONDS
}