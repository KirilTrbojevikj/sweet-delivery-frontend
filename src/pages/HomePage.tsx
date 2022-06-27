import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "../components/Carousel/Carousel";
import { Recipe, Status } from "../types";
import { useEffect, useState } from "react";
import { Modal } from "../components/Modal/Modal";
import { RecipeService } from "../service/RecipeService";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [recipes, setRecipes] = useState<Array<Recipe>>([]);

  useEffect(() => {
    RecipeService.getTopRecipes().then((resp) => {
      if (resp.status === Status.SUCCESS) {
        setRecipes(resp.value);
      }
    });
  }, []);

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-12 bg-gray-100 -mt-6 shadow-lg px-8">
        <div className="col-span-6 mt-10">
          <Link
            to="/recipes"
            className="block p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto text-center">
              Check out all of our recipes
            </h5>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
              />
            </svg>
          </Link>
        </div>
        <div className="col-span-6">
          <h1 className="text-center font-bold text-3xl mb-6">
            Our top rated recipes
          </h1>

          <Carousel
            items={recipes}
            slidesToScroll={1}
            slidesToShow={1}
            infinite={true}
            speed={700}
            dots={false}
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-red-500 text-white text-xl font-bold p-5 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          Add new recipe
        </button>
      </div>

      <Modal open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};
