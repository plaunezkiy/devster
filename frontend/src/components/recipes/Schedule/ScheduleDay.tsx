"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Recipe, Schedule, ScheduleSlot } from "../types";
import useFetch from "@/lib/hooks/useFetch";

interface Props {
  index: number;
  //   expanded: { date: string | false; meal: string | null };
  //   setExpanded: (arg0: { date: string; meal?: string | null } | false) => void;
  slot: ScheduleSlot;
  setSlot: (arg0: ScheduleSlot) => void;
  date: Date;
}

const meals = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

const ScheduleDay = ({ slot, setSlot, date }: Props) => {
  const { _fetch } = useFetch();
  const [schedule, setSchedule] = useState<Schedule | null>();

  const formattedDate = date.toLocaleString("en-UK", {
    day: "numeric",
    month: "long",
  });
  const fullDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const show = fullDate === slot?.date;

  useEffect(() => {
    _fetch(`/api/schedules/${fullDate}`, {}).then((schedule) =>
      setSchedule(schedule)
    );
  }, [slot]);

  return (
    <div className="w-full min-w-[10rem] rounded md:overflow-hidden flex flex-col min-h-[4rem] border shadow hover:border-blue-500 hover:text-blue-500 p-2 select-none">
      <p
        className="w-full text-center text-lg font-medium cursor-pointer"
        onClick={() =>
          setSlot(show ? ({} as ScheduleSlot) : { date: fullDate })
        }
      >
        {formattedDate}
        {/* {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`} */}
      </p>
      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            className="flex flex-col gap-2"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{
              duration: 0.2,
              // ease: [0.04, 0.62, 0.23, 0.98],
            }}
          >
            {Object.keys(meals).map((meal, index) => {
              //   const [selected, setSelected] = useState();

              const selected = slot?.meal === meal && slot.date === fullDate;
              return (
                <div
                  key={index}
                  onClick={() =>
                    setSlot(
                      selected ? { date: fullDate } : { date: fullDate, meal }
                    )
                  }
                  className={`flex flex-col md:flex-row justify-between hover:text-green-500 cursor-pointer line-clamp-1 ${
                    selected ? "text-green-500" : ""
                  }`}
                >
                  <p className="w-full md:w-fit text-start md:text-center">
                    {meals[meal as keyof typeof meals]}
                  </p>
                  <p className="text-center text-lg font-medium">
                    {schedule && schedule[meal as keyof Schedule]?.title}
                  </p>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScheduleDay;
