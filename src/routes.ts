import { Router } from "express";
import { PostService } from "./services/PostService";
import { ProjectService } from "./services/ProjectService";


export const router = Router();

// ROTAS API PROVISÃO DOS POSTS
const postService = new PostService();

router.get("/api/postslist", postService.getAllPosts)
router.post("/api/post", postService.addNewPost)
router.get("/api/post/:slug", postService.getPost)
router.put("/api/post/:slug", postService.updatePost)
router.delete("/api/post/:slug", postService.deletePost)

// ROTAS API PROVISÃO DOS PROJETOS

const projectService = new ProjectService();

router.get("/api/project/list", projectService.getAll)
router.post("/api/project", projectService.addNewProject)
router.put("/api/project/:idProject", projectService.updateProject)
router.delete("/api/project/:idProject", projectService.deleteProject)
