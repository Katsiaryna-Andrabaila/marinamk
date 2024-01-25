import '../src/app/styles/index.scss';

export const metadata = {
    title: 'Marina MK Nails',
    description: 'Generated by Next.js',
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
            </head>
            <body>{children}</body>
        </html>
    );
}
