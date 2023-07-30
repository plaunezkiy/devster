"use client";
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
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecipeFinder from "./RecipeFinder";
import ScheduleDay from "./ScheduleDay";
import { Recipe, ScheduleSlot } from "../types";
import useFetch from "@/lib/hooks/useFetch";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ScheduleEditor = () => {
  const { _fetch } = useFetch();
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot>(
    {} as ScheduleSlot
  );
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>({} as Recipe);
  const today = new Date();
  const day = 60 * 60 * 24 * 1000;

  const [dates, setDates] = useState([
    new Date(today.getTime() - day),
    new Date(),
    new Date(today.getTime() + day),
    new Date(today.getTime() + 2 * day),
    new Date(today.getTime() + 3 * day),
  ]);

  const lockInMeal = () => {
    // if (date/meal chosen) and (recipe chosen)
    // create/update a schedule
    // _fetch();
    if (selectedSlot.date && selectedSlot.meal && selectedRecipe.id) {
      _fetch(`/api/schedules/${selectedSlot.date}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [selectedSlot.meal]: selectedRecipe.id }),
      }).then((data) => {
        // to trigger update

        setSelectedSlot({ date: selectedSlot.date });
        setSelectedRecipe({} as Recipe);
        console.log("done");
        
      });
    }
  };

  useEffect(() => {
    lockInMeal();
  }, [selectedRecipe, selectedSlot]);

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <p className="text-sm font-medium p-2 text-blue-500 hover:text-white hover:bg-blue-500 rounded hover:shadow cursor-pointer duration-150">
          Edit Schedule
        </p>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <div className="flex flex-col md:flex-row w-[90vw] md:w-[80vw] gap-4 p-4">
            <div className="w-full h-full md:w-1/3 flex md:flex-col items-center gap-2 overflow-scroll md:overflow-hidden no-scrollbar">
              <p className="hidden md:block text-2xl font-medium">Dates:</p>
              <p className="md:hidden flex items-center justify-center">
                <ChevronLeftIcon className="w-10 h-5" />
              </p>
              {dates.map((date, index) => (
                <ScheduleDay
                  key={index}
                  index={index}
                  date={date}
                  //   expanded={expanded}
                  //   setExpanded={setExpanded}
                  slot={selectedSlot}
                  setSlot={setSelectedSlot}
                />
              ))}
              <p className="md:hidden flex items-center justify-center">
                <ChevronRightIcon className="w-10 h-5" />
              </p>
            </div>
            <RecipeFinder
              onSelect={setSelectedRecipe}
              selectedRecipe={selectedRecipe}
            />
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

export default ScheduleEditor;
