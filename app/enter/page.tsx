'use client';

import { AdminEnterForm } from '../../src/entities/adminEnterForm';
import { Spinner } from 'features/spinner';
import { useEffect, useState } from 'react';

function EnterPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return <>{isLoading ? <Spinner /> : <AdminEnterForm />}</>;
}

export default EnterPage;
