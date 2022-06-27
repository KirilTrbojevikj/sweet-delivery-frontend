import { AxiosResponse } from "axios";
import { CreatePost, Post } from "../types";
import instance from "./axios";


export interface IPostApi{
    createPost(post : CreatePost) : Promise<AxiosResponse<Post>>;
    approvePost(postId : number) : Promise<any>;
    declinePost(postId : number) : Promise<any>;
}

export const PostApi : IPostApi = {
    async  createPost(post : CreatePost) : Promise<AxiosResponse<Post>>{
        const route = "/post/create";
        return await instance.post<Post>(route,post);
    },
    async approvePost(postId : number) : Promise<any>{
        const route = `/post/approive/${postId}`;
        return await instance.post<any>(route); 
    },
    async declinePost(postId : number) : Promise<any>{
        const route = `/post/decline/${postId}`;
        return await instance.post<any>(route); 
    }
}