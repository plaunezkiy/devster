export type Recipe = {
  id: number;
  title: string;
  steps: string;
  ingredients: { title: string; unit: string; quantity: number }[];
};

export type Schedule = {
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
};

export type ScheduleSlot = { date: string; meal?: string };
