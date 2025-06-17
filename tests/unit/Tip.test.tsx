import { render, screen, waitFor } from '@testing-library/react';
import Tips from './../../src/routes/Tips'; 
import { ThemeProvider } from './../../src/context/theme/ThemeProvider';
import axios from 'axios';


jest.mock('axios');
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: { language: 'en' },
    }),
}));

const mockedTips = [
    { id: 1, title: 'Tip One', description: 'Do something' },
    { id: 2, title: 'Tip Two', description: 'Do something else' },
  ];


describe('Tips Component', () => {
    beforeEach(() => {
        (axios.get as jest.Mock).mockResolvedValue({ data: mockedTips })
    });
    
    it('renders page title', async () => {
   
        render(
            <ThemeProvider>
                <Tips />
            </ThemeProvider>
            );
          
        await waitFor(() => {
            expect(screen.getByText(/Tip of the day/i)).toBeInTheDocument();
              });
    })
   
});