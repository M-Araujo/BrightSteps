import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../../src/routes/Dashboard";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/i18n";
import "@testing-library/jest-dom";
import { GoalsAndHabitsProvider } from "../../src/hooks/GoalsAndHabitsContext";

beforeAll(() => {
    // Suppress React Router warnings
    jest.spyOn(console, "warn").mockImplementation(() => { });
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    movie: {
                        title: { en: "Test Movie", pt: "Filme de Teste" },
                        description: { en: "Description", pt: "Descrição" },
                        link: ""
                    },
                    mentor: {
                        title: { en: "Test Mentor", pt: "Mentor de Teste" },
                        description: { en: "Mentor Desc", pt: "Descrição Mentor" },
                        image: ""
                    },
                    tip: {
                        title: { en: "Test Tip", pt: "Dica de Teste" },
                        description: { en: "Tip Desc", pt: "Descrição Dica" }
                    }
                })
        })
    ) as jest.Mock;
});

beforeEach(() => {
    i18n.changeLanguage("en"); // Ensure English for "Welcome"
});

afterAll(() => {
    (console.warn as jest.Mock).mockReset(); // Reset console.warn mock
    (global.fetch as jest.Mock).mockRestore();
});

describe("App routing", () => {
    test("renders Dashboard page on /dashboard route", async () => {
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

        expect(await screen.findByText(/Welcome/i)).toBeInTheDocument();
    });
});