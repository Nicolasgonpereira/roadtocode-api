"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const PostRepository_1 = require("../repositories/PostRepository");
class PostService {
    constructor(postRepository = new PostRepository_1.PostRepository()) {
        this.getAllPosts = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.postRepository.getAllPosts();
            const data = {
                items: result.rows,
                count: result.rowCount
            };
            return response.status(200).json(data);
        });
        this.getPost = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { slug } = request.params;
            const result = yield this.postRepository.getPost(slug);
            return response.status(200).json(result);
        });
        this.addNewPost = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const newPostData = request.body;
            const techsArray = `{${newPostData.techs.map((tech) => `"${tech}"`).join(',')}}`;
            const newPost = yield this.postRepository.addPost(newPostData, techsArray);
            return response.status(200).json(newPost);
        });
        this.updatePost = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { slug } = request.params;
            try {
                const currentPostData = yield this.postRepository.getPost(slug);
                if (!currentPostData) {
                    return response.status(404).json({ message: "Post not found" });
                }
                const editPostData = request.body;
                const editedPost = Object.assign(Object.assign({}, currentPostData), editPostData);
                const techsArray = `{${editedPost.techs.map((tech) => `"${tech}"`).join(',')}}`;
                yield this.postRepository.editPost(editedPost.id, editedPost, techsArray);
                return response.status(200).json(editedPost);
            }
            catch (error) {
                return response.status(500).json({ message: "An error occurred", error });
            }
        });
        this.deletePost = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { slug } = request.params;
            try {
                yield this.postRepository.deletePost(slug);
                return response.status(200).json({ message: `${slug} deletado com sucesso` });
            }
            catch (error) {
                return response.status(500).json({ message: "An error occurred", error });
            }
        });
        this.postRepository = postRepository;
    }
}
exports.PostService = PostService;
