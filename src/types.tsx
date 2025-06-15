import type { FC, SVGProps } from 'react';

export type Lang = 'en' | 'pt';

export type Habit = {
    id: number;
    goalId: number,
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
        en: string;
        pt: string; 
    };
    completed: boolean;
    startDate: string;
    endDate: string; 
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
    completions?: string[];
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

export type ButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    text: string;
    variant?: 'default' | 'cancel' | 'failure' | 'create' | 'edit';
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
};

export interface NavItem {
    label: string;
    link: string;
    icon: FC<SVGProps<SVGSVGElement>>; // 👈 This tells TypeScript it's a React component for an SVG
}

export interface NavLinkProps {
    listItem: NavItem;
    closeSidebar: () => void;
}

export interface PageTitleProps {
    title: string;
}

export interface FormProps {
    show: boolean;
    onClose: () => void;
    item?: Goal | Habit,
    lang: Lang
};

export interface DeleteConfirmationProps {
    show: boolean;
    onClose: () => void;
    onConfirm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
};

export interface CalendarEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
}

export type ThemeMode = 'light' | 'dark';

export type ThemeContextType = {
    toggleTheme: () => void;
    theme: ThemeMode | null;
    setTheme: (mode: ThemeMode) => void;
};


export interface CreateButtonProps {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}