import Image from "next/image";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/common/Dialog";
import { Recipe } from "./types";
import { BsX } from "react-icons/bs";

const FlatRecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <DialogRoot>
    <DialogTrigger asChild>
      <div className="rounded overflow-hidden flex h-16 border shadow hover:border-blue-500 hover:text-blue-500">
        <div className="relative w-16 h-16">
          <Image
            loader={({ src, width, quality }) => `${src}`}
            alt="recipe image"
            src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872"
            fill
            className=""
          />
        </div>
        <div className="body h-full flex flex-col p-2 justify-center">
          <div className="title text-lg font-medium line-clamp-1">
            <p>{recipe?.title}</p>
          </div>
        </div>
      </div>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay />
      <DialogContent>
        <div className="flex flex-col w-[40vw]">
          {/* <DialogTitle>Recipe Card</DialogTitle>
            <DialogDescription className="hidden md:block">
              Hello lol
            </DialogDescription> */}
          {/*  */}
          <div className="relative w-full h-36 overflow-hidden">
            <Image
              loader={({ src, width, quality }) => `${src}`}
              alt="recipe image"
              src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872"
              fill
              className=""
            />
            <p className="md:hidden absolute bottom-0 w-full z-20 bg-black/60 text-white px-2 py-1 text-xl font-medium line-clamp-2">
              <DialogTitle>Recipe Card</DialogTitle>
            </p>
          </div>
          {/*  */}
          <div className="flex flex-col p-4">
            <div className="ingredients flex flex-col">
              <p className="font-medium text-lg">Ingredients:</p>
              <ul className="pl-6 list-disc">
                {recipe?.ingredients?.map((ingredient) => (
                  <li className="" key={ingredient.title}>
                    {ingredient.title}
                  </li>
                ))}
              </ul>
            </div>
            <p className="steps">{recipe?.steps}</p>
          </div>
        </div>
        <DialogClose asChild>
          <button
            className="border border-red-400 text-red-400 hover:bg-red-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded shadow"
            aria-label="Close"
          >
            <BsX className="w-10 h-fit" />
          </button>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
);

export default FlatRecipeCard;
