import './nav.styles.scss';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';

export const Nav = () => {
    const { t } = useTranslation();

    return (
        <nav>
            <li>
                <Link to="about" activeClass="active">
                    {t('nav.about')}
                </Link>
            </li>
            <li>
                <Link to="prices" activeClass="active">
                    {t('nav.prices')}
                </Link>
            </li>
            <li>
                <Link to="materials" activeClass="active">
                    {t('nav.materials')}
                </Link>
            </li>
            <li>
                <Link to="feedback" activeClass="active">
                    {t('nav.feedback')}
                </Link>
            </li>
            <li>
                <Link to="footer" activeClass="active" spy>
                    {t('nav.contact')}
                </Link>
            </li>
        </nav>
    );
};
