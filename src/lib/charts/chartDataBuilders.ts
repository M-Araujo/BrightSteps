
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


const getDateToString = (m: number, y: number, d: number): string => {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
};

export function buildDonutData(goals: Goal[]) {
  let total = 0;
  let completed = 0;

  const now = new Date();
  const year = now.getFullYear();
  const today = getDateToString(now.getMonth(), year, now.getDate());
  const currentDay = now.getDay();
  const weekday = currentDay === 0 ? 7 : currentDay;

  goals.forEach((goal) => {
    goal.habits.forEach((habit) => {
      if (habit.frequency.includes(weekday)) {
        total++;
        if (habit.completions.includes(today)) {
          completed++;
        }
      }
    });
  });

  return {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completed, total - completed],
        backgroundColor: ["#10b981", "#e5e7eb"],
        hoverOffset: 4,
      },
    ],
  };
}