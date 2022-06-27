import { RecipeApi } from "../api/RecipeApi";
import { CreateRecipe, LeaveRatingDTO, Recipe, Result } from "../types";
import { Handler } from "./result";

export interface IRecipeService {
  createRecipe(recipe: CreateRecipe): Promise<Result<Recipe>>;
  fetchRecipeById(recipe_id: number): Promise<Result<Recipe>>;
  getTopRecipes(): Promise<Result<Array<Recipe>>>;
  getAllRecipes(): Promise<Result<Array<Recipe>>>;
  leaveRating(rating: LeaveRatingDTO): Promise<Result<Recipe>>;
}

export const RecipeService: IRecipeService = {
  async createRecipe(recipe: CreateRecipe): Promise<Result<Recipe>> {
    return await RecipeApi.createRecipe(recipe)
      .then((res) => Handler.SuccessResult(res.data))
      .catch((err) => Handler.ErrorResult(err));
  },
  async fetchRecipeById(recipe_id) {
    return await RecipeApi.fetchRecipeById(recipe_id)
      .then((res) => Handler.SuccessResult(res.data))
      .catch((err) => Handler.ErrorResult(err));
  },
  async getTopRecipes() {
    return await RecipeApi.getTopRecipes()
      .then((res) => Handler.SuccessResult(res.data))
      .catch((err) => Handler.ErrorResult(err));
  },
  async getAllRecipes() {
    return await RecipeApi.getAllRecipes()
      .then((res) => Handler.SuccessResult(res.data))
      .catch((err) => Handler.ErrorResult(err));
  },
  async leaveRating(rating: LeaveRatingDTO): Promise<Result<Recipe>> {
    return await RecipeApi.leaveRating(rating)
      .then((res) => Handler.SuccessResult(res.data))
      .catch((err) => Handler.ErrorResult(err));
  },
};
