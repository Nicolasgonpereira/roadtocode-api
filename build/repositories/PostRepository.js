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
exports.PostRepository = void 0;
const postgres_1 = require("@vercel/postgres");
class PostRepository {
    constructor() {
        this.getAllPosts = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, postgres_1.sql) `
            SELECT slug, thumb_url, title, summary, published_at, techs
            FROM posts
            ORDER BY published_at ASC
            LIMIT 5`;
            return data;
        });
        this.getPost = (postSlug) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, postgres_1.sql) `
            SELECT *
            FROM posts
            WHERE slug = ${postSlug}`;
            return data.rows[0];
        });
        this.addPost = (newPost, techsArray) => __awaiter(this, void 0, void 0, function* () {
            const newData = yield (0, postgres_1.sql) `
            INSERT INTO posts (title, slug, content, summary, techs, image_url, thumb_url)
            VALUES (
                ${newPost.title},
                ${newPost.slug},
                ${newPost.content},
                ${newPost.summary},
                ${techsArray},
                ${newPost.image_url},
                ${newPost.thumb_url}
            )
            RETURNING *;
        `;
            return newData.rows[0];
        });
        this.editPost = (idPost, editedPost, techsArray) => __awaiter(this, void 0, void 0, function* () {
            yield (0, postgres_1.sql) `
            UPDATE posts
            SET
                title = ${editedPost.title},
                slug = ${editedPost.slug},
                content = ${editedPost.content},
                summary = ${editedPost.summary},
                techs = ${techsArray},
                image_url = ${editedPost.image_url},
                thumb_url = ${editedPost.thumb_url}
            WHERE id = ${idPost};
        `;
        });
        this.deletePost = (slug) => __awaiter(this, void 0, void 0, function* () {
            yield (0, postgres_1.sql) `
            DELETE FROM posts
            WHERE slug = ${slug};
        `;
        });
    }
}
exports.PostRepository = PostRepository;
