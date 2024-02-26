'use client';

import { AppProvider } from 'app/context';
import { AdminContent } from 'widgets/adminContent';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from 'features/spinner';
import { useUser } from 'shared/apiUtils/swr';

function AdminPage() {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        if (!user) {
            redirect('/enter');
        }
        setIsLoading(false);
    }, [user]);

    return (
        <AppProvider>
            {isLoading || !user ? <Spinner /> : <AdminContent />}
        </AppProvider>
    );
}

export default AdminPage;
