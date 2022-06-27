import { Link } from "react-router-dom";
import { Recipe } from "../../types";

type CarouselItemProps = {
  item: Recipe;
};

export const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  return (
    <div className="m-auto pb-3 w-full">
      <h3 className="text-center font-semibold text-2xl m-4">{item.name}</h3>
      <Link to={`/recipes/${item.id}`}>
        <img
          src={`${item.img_url}`}
          alt={`${item.name}`}
          className="m-auto w-full h-96"
        />
      </Link>
    </div>
  );
};
