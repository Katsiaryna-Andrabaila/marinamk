'use client';

import { NotFound } from '../src/entities/notFound';
import '../i18next';
import { Footer } from 'widgets/footer';
import { AppProvider } from 'app/context';
import { useEffect } from 'react';
import { IS_ADMIN } from 'shared/const/isAdmin';

const PageNotFound = () => {
    useEffect(() => {
        IS_ADMIN.isAdmin = false;
    }, []);

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
