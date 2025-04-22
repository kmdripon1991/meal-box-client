// components/MealPlanCards.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TDailyMeal, TMealPlan } from "@/types";

export function MyMenuCard({ data }: { data: TMealPlan }) {
  console.log(data);
  const meals = data?.meals;

  // Empty state condition
  if (!meals || meals.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-8 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-rose-800 mb-2">
            No Meals Added Yet
          </h2>
          <p className="text-muted-foreground mb-6">
            Your weekly meal plan is currently empty. Add some meals to get
            started!
          </p>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Add Meals
          </button>
        </div>
      </div>
    );
  }

  // Calculate total price for a day
  const getTotalPrice = (meal: TDailyMeal) => {
    return (
      (meal?.morning?.price || 0) +
      (meal?.evening?.price || 0) +
      (meal?.night?.price || 0)
    );
  };

  const weeklyTotal = meals?.reduce(
    (sum, meal) => sum + getTotalPrice(meal),
    0
  );
  const maxDailyTotal =
    Math.max(...meals.map((meal) => getTotalPrice(meal))) * 1.2;

  return (
    <section className="mx-5">
      <div className="container mx-auto pb-8 px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Weekly Meal Plan
          </h1>
          <p className="text-muted-foreground">
            Nutritionally balanced meals for every day
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-800 text-sm">
                Weekly Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">${weeklyTotal}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader>
              <CardTitle className="text-green-800 text-sm">
                Daily Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                ${(weeklyTotal / 7).toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100">
            <CardHeader>
              <CardTitle className="text-amber-800 text-sm">
                Most Expensive Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-amber-600">
                {
                  meals?.reduce((max, meal) =>
                    getTotalPrice(meal) > getTotalPrice(max) ? meal : max
                  ).day
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => {
            const total = getTotalPrice(meal);
            const percentage = (total / maxDailyTotal) * 100;

            return (
              <Card
                key={meal?._id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                  <CardHeader className="p-0">
                    <CardTitle className="text-white flex justify-between items-center">
                      <span>{meal?.day}</span>
                      <Badge variant="secondary" className="px-3 py-1 text-sm">
                        ${total}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                </div>

                <CardContent className="p-6">
                  {/* Morning Meal */}
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-indigo-800">
                          Breakfast
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {meal?.morning?.menu || "Not specified"}
                        </p>
                      </div>
                      {meal?.morning?.price && (
                        <Badge className="bg-green-100 text-green-800">
                          ${meal?.morning.price}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Evening Meal */}
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-indigo-800">Lunch</h3>
                        <p className="text-sm text-muted-foreground">
                          {meal?.evening?.menu || "Not specified"}
                        </p>
                      </div>
                      {meal.evening?.price && (
                        <Badge className="bg-blue-100 text-blue-800">
                          ${meal?.evening.price}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Night Meal */}
                  <div className="mb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-indigo-800">Dinner</h3>
                        <p className="text-sm text-muted-foreground">
                          {meal?.night?.menu || "Not specified"}
                        </p>
                      </div>
                      {meal.night?.price && (
                        <Badge className="bg-purple-100 text-purple-800">
                          ${meal?.night?.price}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="px-6 pb-4">
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Daily Total</span>
                      <span>{Math?.round(percentage)}% of max</span>
                    </div>
                    <Progress
                      value={percentage}
                      className="h-2"
                      indicatorColor="bg-gradient-to-r from-indigo-400 to-purple-500"
                    />
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Nutrition Summary */}
        <Card className="mt-10 border-0 shadow-sm bg-gradient-to-br from-rose-50 to-rose-100">
          <CardHeader>
            <CardTitle className="text-rose-800">
              Weekly Nutrition Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Protein Meals", value: 12, color: "bg-rose-500" },
                { label: "Vegetarian", value: 8, color: "bg-emerald-500" },
                { label: "Carbs Focus", value: 14, color: "bg-amber-500" },
                { label: "Healthy Fats", value: 10, color: "bg-indigo-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <div>
                    <p className="font-medium">{item?.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {item?.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
