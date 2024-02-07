'use client';

import { AppContext, AppProvider } from 'app/context';
import { AdminContent } from 'entities/adminContent';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { IS_ADMIN } from 'shared/const/isAdmin';

function AdminPage() {
    const { isAdmin } = useContext(AppContext);
    const router = useRouter();
    console.log(isAdmin);

    useEffect(() => {
        if (!IS_ADMIN.isAdmin) {
            router.replace('/enter');
        }
    }, []);

    return (
        <AppProvider>
            <AdminContent />
        </AppProvider>
    );
}

export default AdminPage;
