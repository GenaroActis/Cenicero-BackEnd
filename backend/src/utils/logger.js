import winston from 'winston'
import 'winston-mongodb'
import { MongoDBUrl } from '../config.js';

    const logConfig ={
        level:'info',
        transports: [
            new winston.transports.MongoDB({
                options:{ useUnifiedTopology: true },
                db: MongoDBUrl,
                collection: "logs",
                tryReconnect: true,
                level: "error"
            }),
            new winston.transports.Console({ level: "silly" }),
            new winston.transports.File({
                filename: "./logs.log",
                level: "info", 
            }),
        ]
    };
export const logger = winston.createLogger(logConfig)