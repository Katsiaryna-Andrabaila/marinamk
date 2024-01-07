import { BrowserRouter } from 'react-router-dom';
import { Routing } from './app/routing/Routing';
import { StrictMode } from 'react';
import { AppProvider } from './app/context';
import '../i18next';

function App() {
    return (
        <StrictMode>
            <AppProvider>
                <BrowserRouter>
                    <Routing />
                </BrowserRouter>
            </AppProvider>
        </StrictMode>
    );
}

export default App;
