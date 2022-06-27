import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useCart } from "../hooks/useCart";
//import { CartContextProvider } from "../contexts/CartContext";
import { RecipeService } from "../service/RecipeService";
import { Recipe, Status } from "../types";

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const RecipeDetail: React.FC = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);
  const cart = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    RecipeService.fetchRecipeById(parseInt(id!)).then((resp) => {
      if (resp.status === Status.SUCCESS) {
        setRecipe(resp.value);
      }
    });
  }, [id]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            {/* Image selector */}

            <img
              src={recipe.img_url}
              alt={`${recipe.name}`}
              className="w-full h-full object-center object-cover sm:rounded-lg"
            />
          </div>
          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {recipe.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Recipe information</h2>
              <p className="text-3xl text-gray-900">{recipe.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Rating
                    allowHalfIcon={true}
                    key={recipe.id}
                    ratingValue={
                      recipe.averageRating !== 0.0
                        ? recipe.averageRating * 20 - 20
                        : 0
                    }
                    iconsCount={5}
                    readonly={true}
                    size={25}
                  />
                </div>
                <p className="sr-only">3 out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="text-base text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{ __html: recipe.description }}
              />
            </div>

            <div className="mt-10 flex sm:flex-col1">
              <button
                type="button"
                onClick={() => {
                  cart.addShoppingCartItem({ recipe: recipe, quantity: 1 });
                  navigate("/cart");
                }}
                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
              >
                Add to cart
              </button>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="border-t divide-y divide-gray-200">
                <div>
                  <h3>
                    <div className="group relative w-full py-6 flex justify-between items-center text-left">
                      <span className={"text-indigo-600 text-sm font-medium"}>
                        Ingredients
                      </span>
                    </div>
                  </h3>
                  <div className="pb-6 prose prose-sm">
                    <ul>
                      {recipe.itemList?.map((item) => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
