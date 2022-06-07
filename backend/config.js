import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({
	path: join(__dirname, "../.env"),
});

const e = process.env;

export const URI = e.MONGODB_URI || "mongodb://localhost:27018/links_saver";
export const PORT = e.PORT || e.SERVER_PORT || 3000;

export const CLOUDINARY = {
	name: e.CLOUDINARY_NAME,
	key: e.CLOUDINARY_API_KEY,
	secret: e.CLOUDINARY_API_SECRET,
};
