import { v2 as cd } from "cloudinary";
import { CLOUDINARY } from "../config.js";

cd.config({
	cloud_name: CLOUDINARY.name,
	api_key: CLOUDINARY.key,
	api_secret: CLOUDINARY.secret,
});

export const uploadImage = async (filePath) => {
	return await cd.uploader.upload(filePath, {
		folder: "link_saver",
	});
};

export const deleteImage = async (id) => {
	return await cd.uploader.destroy(id);
};
