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
import { useEffect, useState } from 'react';
import { Spinner } from 'features/spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
                    <ToastContainer autoClose={5000} />
                </>
            ) : (
                <Spinner />
            )}
        </AppProvider>
    );
}

export default MainPage;
