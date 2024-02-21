import { Nav } from '../../entities/nav';
import { useState } from 'react';
import './burger.styles.scss';

export const Burger = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="burger_icon" onClick={() => setIsOpen(true)}></div>
            {isOpen && (
                <div
                    className="burger_menu_wrapper"
                    onClick={() => setIsOpen(false)}
                >
                    <Nav setIsOpen={setIsOpen} />
                </div>
            )}
        </>
    );
};
