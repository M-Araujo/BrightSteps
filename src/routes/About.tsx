export default function About() {
    return (
        <>
            <h1>About</h1>
            <h2>Welcome to My Habit Tracker Portfolio!</h2>
            <p>
                Hi, I'm Miriam, a passionate developer focused on building intuitive and practical applications.
                This project is a <strong>habit tracker</strong> where you can easily manage and track your personal goals and daily habits.
            </p>
            <p>
                <strong>Note:</strong> Any data you add or alter is only stored for the current session and will be reset upon refreshing the page. This allows you to experiment without worrying about your data being saved or shared.
            </p>
            <p>
                This project is a demonstration of my skills in frontend development, with features including real-time data updates, interactive checkboxes, and a responsive layout. Feel free to explore and learn more about my work!
            </p>
            <p>
                You can also connect with me on{" "}
                <a
                    href="https://www.linkedin.com/in/seu-perfil"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn
                </a>{" "}
                for more details or opportunities.
            </p>


            <ul className="list-disc ml-6 space-y-2">
                <li>➕ Add new habits and customize your tracking.</li>
                <li>📈 Track your progress towards specific goals and stay motivated.</li>
                <li>🔐 Explore a sandbox mode with limited functionality to safely test features without affecting data.</li>
            </ul>

                </>
    );
}
