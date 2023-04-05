import express from "express";
import { verifyToken } from '../middlewares/jwt.js';

const router = express.Router();

import { controllerHome,controllerPublicar,controllerContacto, controllerShowPost,controllerFilterPost } from '../controllers/views.controller.js';

router.get(["/", "home"], controllerHome, (req, res) => { });
router.get("/publicar",verifyToken,controllerPublicar, (req, res) => { });
router.get("/contacto", controllerContacto, (req, res) => { });
router.get("/detail/:id", controllerShowPost, (req, res) => { });
router.get("/filter/:id", controllerFilterPost, (req, res) => { });

export default router;