import { render, screen, act } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../../src/routes/Dashboard";
import Goals from "../../src/routes/Goals";
import Habits from "../../src/routes/Habits";
import Calendar from "../../src/routes/GoalsCalendar";
import Stats from "../../src/routes/Stats";
import About from "../../src/routes/About";
import Settings from "../../src/routes/Settings";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/i18n";
import "@testing-library/jest-dom";
import { GoalsAndHabitsProvider } from "../../src/hooks/GoalsAndHabitsContext";


// mocks the localstorage
const mockLocalStorage = (() => {
    let store: { [key: string]: string } = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => (store[key] = value),
        removeItem: (key: string) => delete store[key],
        clear: () => (store = {}),
    }
})();
Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });

beforeEach(() => {
    i18n.changeLanguage("en"); // Ensure English for "Welcome"
    localStorage.clear();
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    (console.warn as jest.Mock).mockReset(); // Reset console.warn mock
    (global.fetch as jest.Mock).mockRestore();
});



describe("App routing", () => {


    const mockGoals = [
        {
            id: 1,
            title: { en: 'Test Goal', pt: 'Meta de Teste' },
            completed: false,
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            habits: [
                {
                    id: 1,
                    title: { en: 'Test Habit', pt: 'Hábito de Teste' },
                    goalId: 1,
                    frequency: [1, 2, 3],
                    completions: ['2025-01-01'],
                },
            ],
        },
    ];

    test('renders Dashboard page on /dashboard route', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        mentor: {
                            title: { en: 'Test Mentor', pt: 'Mentor de Teste' },
                            description: { en: 'Mentor Desc', pt: 'Descrição Mentor' },
                            image: '',
                        },
                        tip: {
                            title: { en: 'Test Tip', pt: 'Dica de Teste' },
                            description: { en: 'Tip Desc', pt: 'Descrição Dica' },
                        },
                        movie: {
                            title: { en: 'Test Movie', pt: 'Filme de Teste' },
                            description: { en: 'Movie Desc', pt: 'Descrição Filme' },
                            link: '',
                        },
                        goals: mockGoals,
                    }),
            })
        ) as jest.Mock;

        await act(async () => {
        render(
            <GoalsAndHabitsProvider>
                <I18nextProvider i18n={i18n}>
                    <MemoryRouter initialEntries={["/dashboard"]}>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </MemoryRouter>
                </I18nextProvider>
            </GoalsAndHabitsProvider>
        );
        });

        expect(await screen.findByText(/Welcome/i)).toBeInTheDocument();
        expect(await screen.findByText(/Test Mentor/i)).toBeInTheDocument();
        expect(await screen.findByText(/Test Tip/i)).toBeInTheDocument();
        expect(await screen.findByText(/Test Movie/i)).toBeInTheDocument();
    });



    test("renders Goals page", async () => {
        // simulate dashboard saving goals to localstorage
        localStorage.setItem('brightsteps.goalsAndHabits', JSON.stringify(mockGoals));
        await act(() => {


            render(
                <GoalsAndHabitsProvider>
                    <I18nextProvider i18n={i18n}>
                        <MemoryRouter initialEntries={["/goals"]}>
                            <Routes>
                                <Route path="/goals" element={<Goals />} />
                            </Routes>
                        </MemoryRouter>
                    </I18nextProvider>
                </GoalsAndHabitsProvider>
            );
        });
        expect(await screen.findByText(/Goals/i)).toBeInTheDocument();
        expect(await screen.findByText(/Test Goal/i)).toBeInTheDocument();
    });

    test("renders habits page", async () => {
        localStorage.setItem('brightsteps.goalsAndHabits', JSON.stringify(mockGoals));
        await act(() => {
            render(
                <GoalsAndHabitsProvider>
                    <I18nextProvider i18n={i18n}>
                        <MemoryRouter initialEntries={["/habits"]}>
                            <Routes>
                                <Route path="/habits" element={<Habits />} />
                            </Routes>
                        </MemoryRouter>
                    </I18nextProvider>
                </GoalsAndHabitsProvider>
            );
        });

        expect(await screen.findByText(/Habits/i)).toBeInTheDocument();
        expect(await screen.findByText(/Test Habit/i)).toBeInTheDocument();
    });


    test("renders calendar page", async () => {
        localStorage.setItem('brightsteps.goalsAndHabits', JSON.stringify(mockGoals));

        await act(async () => {
            render(
                <GoalsAndHabitsProvider>
                    <I18nextProvider i18n={i18n}>
                        <MemoryRouter initialEntries={["/calendar"]}>
                            <Routes>
                                <Route path="/calendar" element={<Calendar />} />
                            </Routes>
                        </MemoryRouter>
                    </I18nextProvider>
                </GoalsAndHabitsProvider>
            );
        });
        expect(await screen.findByText(/Calendar/i)).toBeInTheDocument();
    });

    test("renders stats page", async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <MemoryRouter initialEntries={["/stats"]}>
                    <Routes>
                        <Route path="/stats" element={<Stats />} />
                    </Routes>
                </MemoryRouter>
            </I18nextProvider>
        );
        expect(await screen.findByText(/Stats/i)).toBeInTheDocument();
    });

    test("renders about page", async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <MemoryRouter initialEntries={["/about"]}>
                    <Routes>
                        <Route path="/about" element={<About />} />
                    </Routes>
                </MemoryRouter>
            </I18nextProvider>
        );
        expect(await screen.findByRole('heading', { name: /About/i })).toBeInTheDocument();
    });

    test("renders settings page", async () => {
        localStorage.setItem('brightsteps.goalsAndHabits', JSON.stringify(mockGoals));
        render(
            <GoalsAndHabitsProvider>
                <I18nextProvider i18n={i18n}>
                    <MemoryRouter initialEntries={["/settings"]}>
                        <Routes>
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </MemoryRouter>
                </I18nextProvider>
            </GoalsAndHabitsProvider>
        );
        expect(await screen.findByRole('heading', { name: /Settings/i })).toBeInTheDocument();
    });

});