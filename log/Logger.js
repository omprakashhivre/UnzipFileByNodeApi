const {createLogger,transports,format} = require('winston')

const Logger = createLogger({
    transports: [
        new transports.File({
            filename:"./status.log",
            level : "info",
            format: format.combine(format.timestamp(), format.simple())
        }),
        new transports.File({
            filename:"./status.log",
            level : "error",
            format: format.combine(format.timestamp(), format.simple())
        }) 
    ]
})

module.exports = Logger 