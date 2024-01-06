import { NavLink } from 'react-router-dom';
import './footer.styles.scss';

export const Footer = () => {
    return (
        <footer>
            <div className="footer-wrapper">
                <NavLink to="https://github.com/Andrabaila">
                    Yury Andrabaila
                </NavLink>
                <NavLink to="https://github.com/Katsiaryna-Andrabaila">
                    Katsiaryna Andrabaila
                </NavLink>
            </div>
        </footer>
    );
};
