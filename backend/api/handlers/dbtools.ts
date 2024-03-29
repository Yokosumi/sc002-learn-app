import { join } from "path";
import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { IDatabase } from "../../../src/shared/interfaces";

export const getDb = async () => {
	try {
		const projectBasePath = process.cwd();
		const dbPathAndFileName = join(projectBasePath, "backend/data/db.json");
		const adapter = new JSONFile<IDatabase>(dbPathAndFileName);
		const db: Low<IDatabase> = new Low<IDatabase>(adapter, {} as IDatabase);
		await db.read();
		if (Object.keys(db.data).length === 0) {
			return null;
		} else {
			return db;
		}
	} catch (e) {
		return null;
	}
};

export const getSuuid = () => {
	const characters =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	const length = 6;
	let suuid = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		suuid += characters.charAt(randomIndex);
	}

	return suuid;
};

export const suuidIsValid = (text: string) => {
	const suuidRegex = /^[a-zA-Z0-9]{6}$/;
	return suuidRegex.test(text);
};
