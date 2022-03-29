const {format, createLogger, transports} = require('winston');
const {combine, timestamp, printf} = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        logFormat
    ),
    transports: [
        new transports.File({ filename: '/logs/error.log', level: 'error' }),
        new transports.File({ filename: '/logs/info.log' })
    ]
});

module.exports = logger;
