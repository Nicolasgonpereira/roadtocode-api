import { Request, Response } from "express";
import { PostRepository } from "../repositories/PostRepository";

export interface Post {
    id?: string;
    title: string;
    slug: string;
    content: string;
    summary: string;
    published_at?: string;
    techs: Array<string>;
    image_url: string;
    thumb_url: string;
}

export class PostService {
    private postRepository: PostRepository;

    constructor(
        postRepository = new PostRepository()
    ){
        this.postRepository = postRepository;
    }

    getAllPosts = async (request:Request, response:Response) => {
        const result = await this.postRepository.getAllPosts();

        const data = {
            items:result.rows,
            count:result.rowCount
        }

        return response.status(200).json(data);
    }

    getPost = async (request:Request, response: Response) => {
        const {slug} = request.params;
        const result = await this.postRepository.getPost(slug);

        return response.status(200).json(result);
    }

    addNewPost = async (request:Request, response:Response) => {
        const newPostData = request.body;
        const techsArray:string = `{${newPostData.techs.map((tech:string) => `"${tech}"`).join(',')}}`;
        const newPost = await this.postRepository.addPost(newPostData,techsArray);
        
        return response.status(200).json(newPost);
    }

    updatePost = async (request:Request, response:Response) => {
        const {slug} = request.params;
        try {
            const currentPostData = await this.postRepository.getPost(slug);
            if (!currentPostData) {
                return response.status(404).json({message: "Post not found"});
            }
            const editPostData = request.body;
            const editedPost = {...currentPostData, ...editPostData};
            const techsArray:string = `{${editedPost.techs.map((tech:string) => `"${tech}"`).join(',')}}`;
            await this.postRepository.editPost(editedPost.id, editedPost, techsArray)
            return response. status(200).json(editedPost)

        } catch (error) {
            return response.status(500).json({message:"An error occurred", error})
        }
    }

    deletePost = async (request: Request, response: Response) => {
        const {slug} = request.params;
        try {
            await this.postRepository.deletePost(slug);
            return response.status(200).json({message:`${slug} deletado com sucesso`});
        } catch (error) {
            return response.status(500).json({message: "An error occurred", error});
        }
    }
}
