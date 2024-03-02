'use client';

import { AdminContent } from 'widgets/adminContent';
import { useEffect, useState } from 'react';
import { Spinner } from 'features/spinner';
import { useUser } from 'shared/apiUtils/swr';
import Link from 'next/link';
import 'widgets/adminContent/adminContent.styles.scss';

function AdminPage() {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (!user) {
        return isLoading ? (
            <Spinner />
        ) : (
            <Link href="/enter" className="enter_link">
                Войти
            </Link>
        );
    }

    return <>{isLoading ? <Spinner /> : <AdminContent />}</>;
}

export default AdminPage;
