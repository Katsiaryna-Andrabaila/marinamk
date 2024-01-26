'use client';

import { NotFound } from 'entities/notFound';
import '../i18next';
import { Footer } from 'widgets/footer';

const PageNotFound = () => {
    return (
        <>
            <main className="not_found_main">
                <NotFound />
            </main>
            <Footer isAbsolute={true} />
        </>
    );
};

export default PageNotFound;
