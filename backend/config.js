import dotenv from "dotenv";

dotenv.config();

const e = process.env;

export const URI = e.MONGODB_URI || "mongodb://localhost:27018/links_saver";
export const PORT = e.PORT || e.SERVER_PORT || 3000;

export const CLOUDINARY = {
	name: e.CLOUDINARY_NAME,
	key: e.CLOUDINARY_API_KEY,
	secret: e.CLOUDINARY_API_SECRET,
};
