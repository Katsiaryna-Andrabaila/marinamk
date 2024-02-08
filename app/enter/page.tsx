'use client';

import { AppProvider } from 'app/context';
import { AdminEnterForm } from 'entities/adminEnterForm';
import { useEffect } from 'react';
import { IS_ADMIN } from 'shared/const/isAdmin';

function EnterPage() {
    useEffect(() => {
        IS_ADMIN.isAdmin = false;
    }, []);

    return (
        <AppProvider>
            <AdminEnterForm />
        </AppProvider>
    );
}

export default EnterPage;
