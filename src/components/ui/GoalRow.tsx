
type Goal = {
    id: number;
    title: {
        en: string;
        pt: string;
    };
    completed: boolean;
    startDate?: string;
    endDate?: string;
};

type GoalRowProps = {
    goal: Goal;
    lang: string;
};

export default function GoalRow({ goal, lang }: GoalRowProps) {

    return (
        <>
            <div
                key={goal.id}
                className="grid grid-cols-4 items-center px-4 py-3 bg-white rounded-lg shadow transition hover:shadow-md"
            >

                <span className={goal.completed ? "line-through text-gray-500" : "text-gray-800"}>
                    {goal.title[lang] ?? goal.title.en}
                </span>

                <span className="text-gray-500">{goal.startDate ?? '—'}</span>
                <span className="text-gray-500">{goal.endDate ?? '—'}</span>

                <div className="flex justify-start">
                    <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-semibold ${goal.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                    >
                        {goal.completed ? "🎉" : "🛠️"}
                        {goal.completed ? "All done!" : "In progress"}
                    </span>
                </div>
            </div>
        </>
    );
}