
export type Lang = 'en' | 'pt';

export type Habit = {
    id: number;
    title: {
        en: string;
        pt: string;
    };
    frequency: number[];
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

export type GoalRowProps = {
    goal: Goal;
    lang: Lang;
    onDeleteRequest: (goal: Goal) => void;
};
export type HabitRowProps = {
    goal: Goal;
    habit: Habit;
    lang: 'en' | 'pt';
    onDeleteRequest: (habit: Habit) => void;
}


export type GoalFormData = {
    title: string;
    startDate: string;
    endDate: string;
}

export type HabitsFormData = {
    title: string;
    goalId: number;
    frequency: [];
}

export type Movie = {
    id: number;
    title: {
        en?: string;
        pt?: string;
    },
    description: {
        en?: string;
        pt?: string;
    },
    link?: string
};

export type Mentor = {
    id: number;
    title: {
        en?: string;
        pt?: string;
    };
    author: string;
    image?: string;
    type: string;
    link?: string;
    description: {
        en?: string;
        pt?: string;
    }
}

export type Tip = {
    id: number,
    title: {
        en: string;
        pt: string;
    },
    description: {
        en: string;
        pt: string;
    }
}

export interface HabitFormProps {
    show: boolean;
    onClose: () => void;
}