import Image from "next/image";
import { Recipe } from "./types";

const RecipeCard = ({
  recipe,
  children,
  className,
  onClick,
  ...props
}: {
  recipe: Recipe;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col border rounded ${className}`}
      {...props}
    >
      <div className="relative w-full h-36 overflow-hidden">
        <Image
          loader={({ src, width, quality }) => `${src}`}
          alt="recipe image"
          src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872"
          fill
          className=""
        />
        <p className="absolute bottom-0 w-full z-10 bg-black/60 text-white px-2 py-1 text-xl font-medium line-clamp-2">
          {recipe?.title}
        </p>
      </div>
      <div className="body flex flex-grow p-2">{children}</div>
    </div>
  );
};

export default RecipeCard;
