export default function About() {
    return (
        <>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">About</h1>
                <h2 className="text-xl font-semibold mb-4">Welcome to My Habit Tracker Portfolio!</h2>
                <p className="text-base leading-relaxed mb-4">
                    Hi, I'm Miriam, a passionate developer focused on building intuitive and practical applications.
                    This project is a <strong>habit tracker</strong> where you can easily manage and track your personal goals and daily habits.
                </p>
                <p className="text-base leading-relaxed mb-4">
                    <strong>Note:</strong> Any data you add or alter is only stored for the current session and will be reset upon refreshing the page. This allows you to experiment without worrying about your data being saved or shared.
                </p>
                <p className="text-base leading-relaxed mb-4">
                    This project is a demonstration of my skills in frontend development, with features including real-time data updates, interactive checkboxes, and a responsive layout. Feel free to explore and learn more about my work!
                </p>

                <p className="text-base leading-relaxed mb-4">
                    You can also connect with me on{" "}
                    <a
                        href="https://www.linkedin.com/in/seu-perfil"
                        className="text-blue-600 hover:underline focus:outline-none focus:ring focus:ring-blue-400 rounded"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>{" "}
                    for more details or opportunities.
                </p>

                <ul className="list-disc ml-6 space-y-2 text-base leading-relaxed">
                    <li>➕ Add new habits and customize your tracking.</li>
                    <li>📈 Track your progress towards specific goals and stay motivated.</li>
                    <li>🔐 Explore a sandbox mode with limited functionality to safely test features without affecting data.</li>
                </ul>
            </div>
                </>
    );
}
