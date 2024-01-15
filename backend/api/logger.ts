import winston from "winston";
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
	level: process.env.LOG_LEVEL || "debug",
	format: combine(timestamp(), json()),
	transports: [
		new winston.transports.File({
			filename: "backend/api/logs/app.log",
			level: "debug",
		}),
	],
});
