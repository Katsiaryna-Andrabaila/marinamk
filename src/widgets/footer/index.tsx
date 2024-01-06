import { NavLink } from 'react-router-dom';
import './footer.styles.scss';

export const Footer = () => {
    return (
        <footer>
            <div className="footer-wrapper">
                <NavLink to="https://github.com/Andrabaila" target="_blank">
                    Yury Andrabaila
                </NavLink>
                <NavLink
                    to="https://github.com/Katsiaryna-Andrabaila"
                    target="_blank"
                >
                    Katsiaryna Andrabaila
                </NavLink>
            </div>
        </footer>
    );
};
