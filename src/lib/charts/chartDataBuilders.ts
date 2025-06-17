
import type { Goal } from "./../../types";

export default function buildDashboardBarBata(goals: Goal[]) {
  const formatDate = (date: Date) => date.toISOString().slice(0, 10);
  const todaysDate = new Date();
  const lastWeekDate = new Date(todaysDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  const todayStr = formatDate(todaysDate);
  const lastWeekStr = formatDate(lastWeekDate);
  const habitCompletionCounts: { label: string; value: number }[] = [];

  if (goals.length > 0) {
    goals.forEach((goal: Goal) => {
      goal.habits?.forEach((habit) => {
        let count = 0;
        habit["completions"].forEach((completion) => {
          const currentCompletion = completion.slice(0, 10);
          if (
            currentCompletion >= lastWeekStr &&
            currentCompletion <= todayStr
          ) {
            count++;
          }
        });
        habitCompletionCounts.push({
          label: habit.title?.en ?? habit.title?.pt,
          value: count,
        });
      });
    });
  }

  const chartData = {
    labels: habitCompletionCounts.map((h) => h.label),
    datasets: [
      {
        label: "Activity Count",
        data: habitCompletionCounts.map((h) => h.value),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };
  return chartData;
}