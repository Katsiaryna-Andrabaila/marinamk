import 'app/styles/index.scss';

export const metadata = {
    title: 'MarinaMK Nails',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="description"
                    content="Инновационные решения в мире нейл-арт. Откройте для себя лучшие тренды и техники от MarinaMK - настоящего мастера ногтевого искусства."
                />
                <meta
                    name="description"
                    content="Discover the artistry of nails redefined at MarinaMK. We go beyond the ordinary, bringing you a fusion of creativity and precision in every stroke.\nWitness the brilliance of MarinaMK, a maestro in the realm of nail artistry. With an eye for detail and a passion for perfection, your nails are transformed into masterpieces."
                />
                <meta
                    name="keywords"
                    content="Gel nail extensions, Gel nail polish, Hardware manicure and pedicure, Manicure and pedicure at home, Manicure and pedicure Cairo, French manicure, Nail extensions, Nail design, Professional manicure, Наращивание ногтей гелем, Гель-лак на ногтях, Аппаратный маникюр и педикюр, Маникюр и педикюр в домашних условиях, Маникюр и педикюр Каир, Френч-маникюр, Наращивание ногтей, Дизайн ногтей, Профессиональный маникюр"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
