'use client';

import { NotFound } from 'entities/notFound';
import '../i18next';
import { Footer } from 'widgets/footer';
import { AppProvider } from 'app/context';

const PageNotFound = () => {
    return (
        <AppProvider>
            <main className="not_found_main">
                <NotFound />
            </main>
            <Footer isAbsolute={true} />
        </AppProvider>
    );
};

export default PageNotFound;
