'use client';

import { AppContext, AppProvider } from 'app/context';
import { AdminContent } from 'widgets/adminContent';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { IS_ADMIN } from 'shared/const/isAdmin';
import { Spinner } from 'features/spinner';

function AdminPage() {
    const { isAdmin } = useContext(AppContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    console.log(isAdmin);

    useEffect(() => {
        if (!IS_ADMIN.isAdmin) {
            router.replace('/enter');
        }
        setIsLoading(false);
    }, []);

    return (
        <AppProvider>
            {isLoading || !IS_ADMIN.isAdmin ? <Spinner /> : <AdminContent />}
        </AppProvider>
    );
}

export default AdminPage;
