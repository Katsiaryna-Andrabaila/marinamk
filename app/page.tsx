'use client';

import { BrowserRouter } from 'react-router-dom';
import { Routing } from '../src/app/routing/Routing';
import { StrictMode } from 'react';
import { AppProvider } from '../src/app/context';
import '../i18next';
import '../src/app/styles/index.scss';

function App() {
    /* if (typeof document !== 'undefined') {
        return;
    } */

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
