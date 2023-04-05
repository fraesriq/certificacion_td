import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();


import { addPost,addComment,addLike,addDisLike } from "../controllers/posts.controller.js";

router.post("/add_post",verifyToken,upload,addPost,(req, res) => { });
router.post("/add_comment",verifyToken,addComment,(req, res) => { });
router.post("/add_like",verifyToken,addLike,(req, res) => { });
router.post("/add_dislike",verifyToken,addDisLike,(req, res) => { });

export default router;