'use client';

import '../i18next';
import { AboutSection } from '../src/widgets/aboutSection';
import { EnterSection } from '../src/widgets/enterSection';
import { FeedbackSection } from '../src/widgets/feedbackSection';
import { Footer } from '../src/widgets/footer';
import { Header } from '../src/widgets/header';
import { MaterialsSection } from '../src/widgets/materialsSection';
import { PriceSection } from '../src/widgets/priceSection';

function MainPage() {
    return (
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
    );
}

export default MainPage;
