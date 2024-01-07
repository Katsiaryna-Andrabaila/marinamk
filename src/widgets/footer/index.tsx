import { NavLink } from 'react-router-dom';
import './footer.styles.scss';

export const Footer = () => {
    return (
        <footer>
            <div className="footer-wrapper">
                <NavLink
                    to="https://www.linkedin.com/in/katsiaryna-andrabaila-94669b23a/"
                    target="_blank"
                >
                    @TechnoBoar 2024
                </NavLink>
            </div>
        </footer>
    );
};
