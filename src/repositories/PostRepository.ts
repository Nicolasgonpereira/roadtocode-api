import { sql } from "@vercel/postgres";
import { Post } from "../services/PostService";

export class PostRepository {
    
    getAllPosts = async () => {
        const data = await sql`
        SELECT slug, thumb_url, title, summary, published_at, techs
        FROM posts
        ORDER BY published_at ASC
        LIMIT 5`;
        return data;
    }

    getPost = async (postSlug:string) => {
        const data = await sql`
        SELECT *
        FROM posts
        WHERE slug = ${postSlug}`;
        return data.rows[0]
    }

    addPost = async (newPost: Post,techsArray:string) => {

        const newData = await sql<Post>`
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
            RETURNING *;`;
        
        return newData.rows[0];
    }

    editPost = async (idPost:string, editedPost: Post, techsArray:string) => {
        await sql<Post>`
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
    }
}