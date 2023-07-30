import { BsPlus, BsXLg } from "react-icons/bs";
import RecipeCard from "./RecipeCard";
import Button from "../Buttons/Button";
import { Recipe } from "./types";

const FeaturedRecipes = (recipes: Recipe[]) => {
  return (
    <div className="col-span-1 md:col-span-3 h-96 border rounded">
      <p>Featured recipes</p>
      <div className="flex gap-8 p-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe}>
            <div className="w-full flex flex-col">
              <div className="description flex flex-grow">
                <p>30 min</p>
              </div>
              <div className="footer flex justify-between">
                <Button>
                  <BsXLg className="text-lg m-1" />
                </Button>
                <Button>
                  <p className="py-1 px-2 flex gap-1 items-center">
                    Add To List
                    <BsPlus className="text-2xl" />
                  </p>
                </Button>
              </div>
            </div>
          </RecipeCard>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRecipes
