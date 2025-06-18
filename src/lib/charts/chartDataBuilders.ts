
import type { Goal } from "./../../types";
import { useTranslation } from "react-i18next";

/**
 * Builds bar chart data showing the number of times each habit
 * was completed in the past 7 days.
 *
 * X-axis: Habit titles
 * Y-axis: Completion count over the past week
 *
 * Filters completions to only include dates between today and 7 days ago..
 */

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

/**
 * Builds donut chart data representing today's habit completion status.
 *
 * Filters habits scheduled for today (based on frequency).
 * Counts how many of those have been completed (based on today's date).
 *
 * Returns data formatted for a donut/pie chart:
 * - "Completed" vs "Remaining"
 * - Useful for visualizing daily habit progress at a glance.
 */

export function buildDonutData(goals: Goal[]) {
  let total = 0;
  let completed = 0;

  const now = new Date();
  const year = now.getFullYear();
  const today = getDateToString(now.getMonth(), year, now.getDate());
  const currentDay = now.getDay();
  const weekday = currentDay === 0 ? 7 : currentDay;

  goals.forEach((goal) => {
    goal.habits?.forEach((habit) => {
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

export function generateHabitCompletionTimeline(goals: Goal[]) {
  const { t } = useTranslation();

  console.log("lets generate a line chart");

  /* mon-sun seg dom */

  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  const today = getDateToString(
    todaysDate.getMonth(),
    year,
    todaysDate.getDate()
  );
  const currentDay = todaysDate.getDay();
  const weekday = currentDay === 0 ? 7 : currentDay;

  const lastWeekDate = new Date(todaysDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  const weekCounter = [];
  let cData = [];

  goals.forEach((goal) => {
    //console.log(goal);
    goal.habits?.forEach((habit) => {
      // console.log(habit);
      const filteredHabits = habit.completions.filter((completion) => {
        const c = new Date(completion);
        return c >= lastWeekDate && c <= todaysDate;
      });

      filteredHabits.forEach((filteredHabit) => {
        console.log("inside the other loop");
        console.log(filteredHabit);
        console.log(new Date(filteredHabit).getDay());
        weekCounter.push(new Date(filteredHabit).getDay() + 1);
      });
    });
  });

  weekCounter.forEach((day) => {
    cData[day] = (cData[day] || 0) + 1;
  });

  console.log("cData", cData);

  return {
    labels: [
      t("habits.days.1"),
      t("habits.days.2"),
      t("habits.days.3"),
      t("habits.days.4"),
      t("habits.days.5"),
      t("habits.days.6"),
      t("habits.days.7"),
    ],
    datasets: [
      {
        data: cData,
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };
}