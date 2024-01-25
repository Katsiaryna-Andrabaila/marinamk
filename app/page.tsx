'use client';

import { AppProvider } from 'app/context';
import { AboutSection } from '../src/widgets/aboutSection';
import { EnterSection } from '../src/widgets/enterSection';
import { FeedbackSection } from '../src/widgets/feedbackSection';
import { Footer } from '../src/widgets/footer';
import { Header } from '../src/widgets/header';
import { MaterialsSection } from '../src/widgets/materialsSection';
import { PriceSection } from '../src/widgets/priceSection';
import '../i18next';

function MainPage() {
    return (
        <AppProvider>
            <Header />
            <main>
                <EnterSection />
                <AboutSection />
                <PriceSection />
                <MaterialsSection />
                <FeedbackSection />
            </main>
            <Footer />
        </AppProvider>
    );
}

export default MainPage;
