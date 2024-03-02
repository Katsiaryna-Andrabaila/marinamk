'use client';

import { useState } from 'react';
import { AddSlots } from '../../entities/addSlots';
import { Schedule } from '../../entities/schedule';
import { Services } from '../../entities/services';

export const AdminContent = () => {
    const [activeTab, setActiveTab] = useState<'add' | 'watch' | 'service'>(
        'watch'
    );

    const handleClick = (tab: 'add' | 'watch' | 'service') => setActiveTab(tab);

    return (
        <section className="admin_content_wrapper">
            <div className="tabs">
                <span
                    className={activeTab === 'add' ? 'tab_active' : ''}
                    onClick={() => handleClick('add')}
                >
                    Добавить слоты
                </span>
                <span
                    className={activeTab === 'watch' ? 'tab_active' : ''}
                    onClick={() => handleClick('watch')}
                >
                    Расписание
                </span>
                <span
                    className={activeTab === 'service' ? 'tab_active' : ''}
                    onClick={() => handleClick('service')}
                >
                    Сервисы
                </span>
            </div>
            {activeTab === 'add' ? (
                <AddSlots />
            ) : activeTab === 'watch' ? (
                <Schedule />
            ) : (
                <Services />
            )}
        </section>
    );
};
