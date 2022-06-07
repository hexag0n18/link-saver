import fs from "fs-extra";

import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import Link from "../models/Link.js";

export const getLinks = async (req, res) => {
	try {
		const links = await Link.find();
		res.send(links);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createLink = async (req, res) => {
	try {
		const { name, link, description } = req.body;
		let image;
		if (req.files?.image) {
			const result = await uploadImage(req.files.image.tempFilePath);
			await fs.remove(req.files.image.tempFilePath);
			image = {
				url: result.secure_url,
				public_id: result.public_id,
			};
		}

		const new_link = new Link({ name, link, description, image });
		await new_link.save();

		res.json(new_link);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const updateLink = async (req, res) => {
	try {
		const link_updated = await Link.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.send(link_updated);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deleteLink = async (req, res) => {
	try {
		const link_romoved = await Link.findByIdAndDelete(req.params.id);
		if (!link_romoved) return res.sendStatus(404);

    if (link_romoved.image?.public_id) await deleteImage(link_romoved.image.public_id)

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getLink = async (req, res) => {
	try {
		const link = await Link.findById(req.params.id);
		if (!link) return res.sendStatus(404);
		res.json(link);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
