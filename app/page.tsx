'use client';

import { AppProvider } from 'app/context';
import { AboutSection } from 'widgets/aboutSection';
import { EnterSection } from 'widgets/enterSection';
import { FeedbackSection } from 'widgets/feedbackSection';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { MaterialsSection } from 'widgets/materialsSection';
import { PriceSection } from 'widgets/priceSection';
import '../i18next';
import { useReportWebVitals } from 'next/web-vitals';
import { useEffect, useState } from 'react';
import { IS_ADMIN } from 'shared/const/isAdmin';
import { Spinner } from 'features/spinner';

function MainPage() {
    const [isLoading, setIsLoading] = useState(true);

    useReportWebVitals((metric) => {
        console.log(metric);
    });

    useEffect(() => {
        IS_ADMIN.isAdmin = false;
        setIsLoading(false);
    }, []);

    return (
        <AppProvider>
            {!isLoading ? (
                <>
                    <Header />
                    <main>
                        <EnterSection />
                        <AboutSection />
                        <PriceSection />
                        <MaterialsSection />
                        <FeedbackSection />
                    </main>
                    <Footer />
                </>
            ) : (
                <Spinner />
            )}
        </AppProvider>
    );
}

export default MainPage;
