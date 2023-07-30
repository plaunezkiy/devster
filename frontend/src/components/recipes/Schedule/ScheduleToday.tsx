"use client";
import { useEffect, useState } from "react";
import FlatRecipeCard from "../FlatRecipeCard";
import { Recipe, Schedule } from "../types";
import useFetch from "@/lib/hooks/useFetch";
import { headers } from "next/headers";
import { API_URL } from "@/lib/const";
import ScheduleEditor from "./ScheduleEditor";

const ScheduleToday = () => {
  const [schedule, setSchedule] = useState<Schedule>({} as Schedule);
  const { loading, error, _fetch } = useFetch();

  useEffect(() => {
    // _fetch("/api/recipes/schedule", { credentials: "same-site" }).then(
    //   (data) => {
    //     console.log(data);
    //   }
    // );
    _fetch("/api/schedules/today", {}).then((data: Schedule) =>
      setSchedule(data)
    );
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <p className="text-2xl font-medium">Today</p>
        <ScheduleEditor />
      </div>
      <div className="flex flex-grow justify-between flex-col">
        <div>
          <p>Breakfast</p>
          <button className="w-full">
            <FlatRecipeCard recipe={schedule?.breakfast} />
          </button>
        </div>
        <div>
          <p>Lunch</p>
          <FlatRecipeCard recipe={schedule?.lunch} />
        </div>
        <div>
          <p>Dinner</p>
          <FlatRecipeCard recipe={schedule?.dinner} />
        </div>
      </div>
    </>
  );
};

export default ScheduleToday;
