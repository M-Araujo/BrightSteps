export type Lang = 'en' | 'pt';

export type Habit = {
    id: number;
    title: {
        en: string;
        pt: string;
    };
    frequency: number[];
    completions: string[];
};

export type Goal = {
    id: number;
    title: {
        en: string; // Non-optional
        pt: string; // Non-optional
    };
    completed: boolean;
    startDate: string; // Non-optional to match form validation
    endDate: string; // Non-optional
    habits?: Habit[];
};

export type GoalRowProps = {
    goal: Goal;
    lang: Lang;
    onDeleteRequest: (goal: Goal) => void;
};

export type TipRowProps = {
    tip: {
        id: number;
        title: { en: string; pt: string };
        description: { en: string; pt: string };
    };
    lang: Lang;
};


export type HabitRowProps = {
    goal: Goal;
    habit: Habit;
    lang: 'en' | 'pt';
    onDeleteRequest: (habit: Habit) => void;
};

export type GoalsFormData = {
    title: string; 
    startDate: string;
    endDate: string;
};

export type HabitsFormData = {
    title: string;
    goalId: number;
    frequency: number[];
};

export type Movie = {
    id: number;
    title: {
        en?: string;
        pt?: string;
    };
    description: {
        en?: string;
        pt?: string;
    };
    link?: string;
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
    };
};

export type Tip = {
    id: number;
    title: {
        en: string;
        pt: string;
    };
    description: {
        en: string;
        pt: string;
    };
};

export interface FormProps {
    show: boolean;
    onClose: () => void;
};

export interface DeleteConfirmationProps {
    show: boolean;
    onClose: () => void;
    onConfirm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
};