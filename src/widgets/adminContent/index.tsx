'use client';

import { useState } from 'react';
import './adminContent.styles.scss';
import { AddSlots } from '../../entities/addSlots';
import { Schedule } from '../../entities/schedule';

export const AdminContent = () => {
    const [activeTab, setActiveTab] = useState<'add' | 'watch'>('watch');

    const handleClick = (tab: 'add' | 'watch') => setActiveTab(tab);

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
            </div>
            {activeTab === 'add' ? <AddSlots /> : <Schedule />}
        </section>
    );
};
