"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const PostService_1 = require("./services/PostService");
const ProjectService_1 = require("./services/ProjectService");
exports.router = (0, express_1.Router)();
// ROTAS API PROVISÃO DOS POSTS
const postService = new PostService_1.PostService();
exports.router.get("/api/postslist", postService.getAllPosts);
exports.router.post("/api/post", postService.addNewPost);
exports.router.get("/api/post/:slug", postService.getPost);
exports.router.put("/api/post/:slug", postService.updatePost);
exports.router.delete("/api/post/:slug", postService.deletePost);
// ROTAS API PROVISÃO DOS PROJETOS
const projectService = new ProjectService_1.ProjectService();
exports.router.get("/api/project/list", projectService.getAll);
exports.router.post("/api/project", projectService.addNewProject);
exports.router.put("/api/project/:idProject", projectService.updateProject);
exports.router.delete("/api/project/:idProject", projectService.deleteProject);
