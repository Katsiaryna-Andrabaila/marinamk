'use client';

import { AppProvider } from 'app/context';
import { AdminEnterForm } from '../../src/entities/adminEnterForm';
import { Spinner } from 'features/spinner';
import { useEffect, useState } from 'react';
import { IS_ADMIN } from 'shared/const/isAdmin';

function EnterPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        IS_ADMIN.isAdmin = false;
        setIsLoading(false);
    }, []);

    return (
        <AppProvider>
            {isLoading ? <Spinner /> : <AdminEnterForm />}
        </AppProvider>
    );
}

export default EnterPage;
