import Slider from "react-slick";
import { Recipe } from "../../types";
import { CarouselItem } from "./CarouselItem";
export type CarouselProps = {
  items: Array<Recipe>;
  slidesToShow: number;
  speed: number;
  slidesToScroll: number;
  infinite: boolean;
  dots: boolean;
};

const ArrowPrev = (props: any) => {
  const { className, style, onClick } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 ${className} `}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      onClick={onClick}
      style={{ ...style, display: "block", color: "black" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );
};

const ArrowNext = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6  w-6 ${className} `}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      onClick={onClick}
      style={{ ...style, display: "block", color: "black" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
};

export const Carousel: React.FC<CarouselProps> = ({ items, ...rest }) => {
  return (
    <Slider
      {...rest}
      autoplay={true}
      autoplaySpeed={5000}
      prevArrow={<ArrowPrev />}
      nextArrow={<ArrowNext />}
    >
      {items.map((item) => {
        return <CarouselItem item={item} />;
      })}
    </Slider>
  );
};
