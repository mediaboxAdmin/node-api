const { Op } = require("sequelize")
const { updateDriverLocation } = require("../../controllers/driver/drivers.controller")
const Drivers = require("../../models/admin/Drivers")
const moment = require("moment")

const UPDATE_DRIVER_LAST_ONLINE_DATE = async (data, io) => {
          const { locations, driverId } = data
          //         console.log(data)
          if (driverId) {
                    Drivers.update({
                              LAST_EN_LIGNE_DATE: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                              // LAST_LOCATION_DATE: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                    }, {
                              where: {
                                        [Op.and]: [
                                          { ID_DRIVER: driverId },
                                          { EN_LIGNE: 1 }
                                        ]
                              }
                    })
          }
}

module.exports = UPDATE_DRIVER_LAST_ONLINE_DATE