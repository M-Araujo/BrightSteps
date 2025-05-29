export type Habit = {
    id: number;
    title: {
        en: string;
        pt: string;
    };
    frequency: string[];
};

export type Goal = {
    id: number;
    title: {
        en: string;
        pt: string;
    };
    completed: boolean;
    startDate?: string;
    endDate?: string;
    habits?: Habit[];
  };