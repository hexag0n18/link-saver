import { Router } from "express";

import * as links from "../controllers/links.controller.js";

const router = Router()

router.get('/links', links.getLinks)
router.post('/links', links.createLink)
router.put('/links/:id', links.updateLink)
router.delete('/links/:id', links.deleteLink)

router.get('/links/:id', links.getLink)

export default router