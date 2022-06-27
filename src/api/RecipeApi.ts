import { AxiosResponse } from "axios";
import { CreateRecipe, LeaveRatingDTO, Recipe } from "../types";
import instance from "./axios";

export interface IRecipeApi {
  createRecipe(recipe: CreateRecipe): Promise<AxiosResponse<Recipe>>;
  fetchRecipeById(recipe_id: number): Promise<AxiosResponse<Recipe>>;
  getTopRecipes(): Promise<AxiosResponse<Array<Recipe>>>;
  getAllRecipes(): Promise<AxiosResponse<Array<Recipe>>>;
  leaveRating(rating: LeaveRatingDTO): Promise<AxiosResponse<Recipe>>;
}

export const RecipeApi: IRecipeApi = {
  async createRecipe(recipe: CreateRecipe): Promise<AxiosResponse<Recipe>> {
    const route = "/recipe/create";
    return await instance.post<Recipe>(route, recipe);
  },
  async fetchRecipeById(recipe_id: number): Promise<AxiosResponse<Recipe>> {
    const route = `/recipe/getById/${recipe_id}`;
    return await instance.get<Recipe>(route);
  },
  async getTopRecipes(): Promise<AxiosResponse<Array<Recipe>>> {
    const route = "/recipe/getTopRecipes";
    return await instance.get<Array<Recipe>>(route);
  },
  async getAllRecipes(): Promise<AxiosResponse<Array<Recipe>>> {
    const route = "/recipe/findAll";
    return await instance.get<Array<Recipe>>(route);
  },
  async leaveRating(rating: LeaveRatingDTO): Promise<AxiosResponse<Recipe>> {
    const route = "/recipe/leaveRating";
    return await instance.post<Recipe>(route, rating);
  },
};
