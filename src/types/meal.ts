// types/mealPlan.ts
export type TMealItem = {
  menu: string;
  price: number;
  _id: string;
};

export type TDailyMeal = {
  length: number;
  day: string;
  morning: TMealItem | null;
  evening: TMealItem | null;
  night: TMealItem | null;
  _id: string;
};

export type TMealPlan = {
  _id: string;
  meals: TDailyMeal[];
  author_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
