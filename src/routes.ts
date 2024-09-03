import { Router } from "express";
import { PostService } from "./services/PostService";


export const router = Router();

const postService = new PostService();

router.get("/api/postslist", postService.getAllPosts)
router.post("/api/post", postService.addNewPost)
router.get("/api/post/:slug", postService.getPost)
router.put("/api/post/:slug", postService.updatePost)