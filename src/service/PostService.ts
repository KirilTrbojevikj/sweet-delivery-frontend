import { PostApi } from "../api/PostApi";
import { CreatePost, Post, Result } from "../types";
import { Handler } from "./result";

export interface IPostService {
  createPost(post: CreatePost): Promise<Result<Post>>;
  approvePost(postId: number): Promise<any>;
  declinePost(postId: number): Promise<any>;
}

export const PostService: IPostService = {
  async createPost(post: CreatePost): Promise<Result<Post>> {
    return await PostApi.createPost(post)
      .then((resp) => Handler.SuccessResult(resp.data))
      .catch((err) => Handler.ErrorResult(err));
  },
  async approvePost(postId: number): Promise<any> {
    return await PostApi.approvePost(postId)
      .then((resp) => Handler.SuccessResult(resp.data))
      .catch((err) => Handler.ErrorResult(err));
  },
  async declinePost(postId: number): Promise<any> {
    return await PostApi.declinePost(postId)
      .then((resp) => Handler.SuccessResult(resp.data))
      .catch((err) => Handler.ErrorResult(err));
  },
};
