import './nav.styles.scss';
import { Link } from 'react-scroll';

export const Nav = () => {
    return (
        <nav>
            <li>
                <Link to="about" activeClass="active">
                    About me
                </Link>
            </li>
            <li>
                <Link to="prices" activeClass="active">
                    Prices
                </Link>
            </li>
            <li>
                <Link to="materials" activeClass="active">
                    Materials
                </Link>
            </li>
            <li>
                <Link to="feedback" activeClass="active">
                    Feedback
                </Link>
            </li>
            <li>
                <Link to="footer" activeClass="active" spy>
                    Contact
                </Link>
            </li>
        </nav>
    );
};
