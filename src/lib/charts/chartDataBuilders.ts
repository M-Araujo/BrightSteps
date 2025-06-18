
import type { Goal } from "./../../types";


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
    plugins: {
      title: { display: false },
      legend: { display: true, position: "bottom" },
    },
  };
}

/**
 * Generates chart data for a weekly habit completion timeline.
 *
 * - Purpose: To visualize how many times habits were completed over the past 7 days.
 * - X-axis: Days of the week (Monday to Sunday)
 * - Y-axis: Number of habit completions on each day
 *
 * Logic:
 * - Filters all habit completion dates to keep only those within the past week.
 * - Counts how many completions occurred on each day of the week.
 * - Maps those counts to their respective weekdays using localized labels.
 */

export function buildWeeklyHabitCompletionTimeline(
  goals: Goal[],
  t: (key: string) => string
) {
  const todaysDate = new Date();
  const lastWeekDate = new Date(todaysDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekCounter: number[] = [];
  const dayCounts: number[] = [];

  goals.forEach((goal) => {
    goal.habits?.forEach((habit) => {
      const filteredHabits = habit.completions.filter((completion) => {
        const c = new Date(completion);
        return c >= lastWeekDate && c <= todaysDate;
      });

      filteredHabits.forEach((filteredHabit) => {
        weekCounter.push(new Date(filteredHabit).getDay() + 1);
      });
    });
  });

  weekCounter.forEach((day) => {
    dayCounts[day] = (dayCounts[day] || 0) + 1;
  });

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
        label: "Weekly Completions",
        data: dayCounts,
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };
}

/**
 * Calculates the weekly progress for each habit across all goals.
 *
 * For each habit, the function checks which weekdays (from the current week) the habit was scheduled
 * based on its `frequency`, and compares them against the dates listed in its `completions` array.
 *
 * The result is a per-habit breakdown of how many scheduled completions were actually completed,
 * allowing for insights such as completion rates, consistency, and gaps during the current week.
 *
 * This function can be used to power charts or progress summaries by returning, for example:
 * - A list of habits with their scheduled vs. completed count
 * - Percentage completion per habit for the current week
 * 
 * [
  { habitId: 1, title: "Read 10 pages", scheduled: 3, completed: 2, percent: 66.67 },
  ...
]
 */ export function calculateWeeklyHabitProgress(goals: Goal[]) {
  console.log("inside function calculateWeeklyHabitProgress");

  const dt = new Date(); // current date of week
  const currentWeekDay = dt.getDay();
  const lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
  const wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
  const wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));

  const progressData: {
    goal: string;
    habit: string;
    progress: number;
  }[] = [];

  goals.forEach((goal: Goal) => {
    goal.habits?.forEach((habit) => {
      const filteredHabits = habit.completions?.filter((completion) => {
        const date = new Date(completion);
        return date >= wkStart && date <= wkEnd;
      });

      let expectedCompletions = 0;
      for (let i = 0; i < 7; i++) {
        const checkDate = new Date(wkStart);
        checkDate.setDate(wkStart.getDate() + i);
        const dayOfWeek = checkDate.getDay() === 0 ? 7 : checkDate.getDay();
        if (habit.frequency.includes(dayOfWeek)) {
          expectedCompletions++;
        }
      }

      const completed = filteredHabits?.length ?? 0;
      const progress =
        expectedCompletions > 0
          ? Math.round((completed / expectedCompletions) * 100)
          : 0;

      progressData.push({
        goal: goal.title.en,
        habit: habit.title.en,
        progress,
      });
    });
  });
  return progressData;
}

export function buildWeeklyProgressBarChart(goals: Goal[]) {
  const rawProgress = calculateWeeklyHabitProgress(goals);

  return {
    labels: rawProgress.map((item) => item.habit),
    datasets: [
      {
        label: "Weekly Progress (%)",
        data: rawProgress.map((item) => item.progress),
        backgroundColor: "#10b981",
        borderRadius: 6,
      },
    ],
  };
}
