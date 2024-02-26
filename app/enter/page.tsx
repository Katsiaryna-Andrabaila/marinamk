'use client';

import { AppProvider } from 'app/context';
import { AdminEnterForm } from '../../src/entities/adminEnterForm';
import { Spinner } from 'features/spinner';
import { useEffect, useState } from 'react';

function EnterPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <AppProvider>
            {isLoading ? <Spinner /> : <AdminEnterForm />}
        </AppProvider>
    );
}

export default EnterPage;
