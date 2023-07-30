"use client";
import React, { useState } from "react";
import RecipeCard from "../RecipeCard";
import { Recipe } from "../types";
import useFetch from "@/lib/hooks/useFetch";
import Spinner from "@/components/common/loaders/Spinner";

interface Props {
  onSelect: (arg0: Recipe) => void;
  selectedRecipe: Recipe;
}

const RecipeFinder = ({ onSelect, selectedRecipe }: Props) => {
  const { loading, _fetch } = useFetch();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.trim().length >= 3) {
      _fetch("/api/recipes/", {}).then((recipes) => setRecipes(recipes));
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-2xl font-medium">Recipes</p>
      <div className="flex gap-4 items-center">
        <input
          onChange={changeHandler}
          type="text"
          placeholder="Search"
          className="rounded dark:bg-zinc-700 w-36 px-2 py-1 tracking-tight font-medium shadow"
        />
        <p className="px-2 py-1 rounded shadow border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer">
          Generate by AI
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {loading ? (
          <Spinner />
        ) : (
          recipes?.map((recipe) => {
            const selected = recipe === selectedRecipe;
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                className={`w-48 hover:border-green-500 hover:text-green-500 cursor-pointer overflow-hidden ${
                  selected ? "border-green-500 text-green-500" : ""
                }`}
                onClick={() => onSelect(recipe)}
              >
                <p>12</p>
              </RecipeCard>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecipeFinder;
