import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { RecipeService } from "../service/RecipeService";
import { LeaveRatingDTO, Recipe, Status } from "../types";
import { Rating } from "react-simple-star-rating";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useTokenData } from "../hooks/useTokenData";
export const RecipesList: React.FC = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const cart = useCart();
  const token = useTokenData();
  useEffect(() => {
    RecipeService.getAllRecipes().then((resp) => {
      if (resp.status === Status.SUCCESS) {
        setRecipes(resp.value);
      }
    });
  }, []);

  const handleRating = (recipeId: number, rating: number) => {
    console.log(rating);
    const newRating: LeaveRatingDTO = {
      recipeId,
      recipeStars: rating,
      username: token?.sub!,
    };

    RecipeService.leaveRating(newRating).then((resp) => {
      window.location.reload();
    });
  };

  const navigate = useNavigate();
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <li
          key={recipe.id}
          className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <Link to={`/recipes/${recipe.id}`}>
            <div className="flex-1 flex flex-col p-8">
              <img
                className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                src={recipe.img_url}
                alt=""
              />
              <h3 className="mt-6 text-gray-900 text-base font-medium">
                {recipe.name}
              </h3>
              <dl className="mt-1 flex-grow flex flex-col justify-between">
                <dd className="text-gray-500 text-sm">{recipe.description}</dd>
                <dd className="mt-3">
                  <div className="text-gray-800 text-sm">Rating: {recipe.averageRating.toFixed(2)}/5 ({recipe.ratings.length} ratings)</div>
                  <Rating
                    allowHalfIcon={true}
                    key={recipe.id}
                    ratingValue={recipe.averageRating !== 0.0 ? recipe.averageRating * 20 - 20 : 0}
                    iconsCount={5}
                    readonly={true}
                    size={25}
                  />
                </dd>
                <dd className="text-gray-800 font-semibold mt-3 text-lg">
                  Price : {recipe.price}$
                </dd>
              </dl>
            </div>
          </Link>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="w-0 flex-1 flex">
                <div className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                  <span className="ml-3">
                    <div>Rate :</div>
                    <Rating
                      key={recipe.id}
                      ratingValue={0}
                      iconsCount={5}
                      size={20}
                      onClick={(value) => {
                        handleRating(recipe.id, value / 20);
                      }}
                    />
                  </span>
                </div>
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                <button
                  onClick={(e) => {
                    cart.addShoppingCartItem({ recipe: recipe, quantity: 1 });
                    navigate("/cart");
                  }}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <ShoppingCartIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
