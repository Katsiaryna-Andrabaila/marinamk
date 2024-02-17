import './nav.styles.scss';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import useMatchMedia from '@buildinams/use-match-media';

export const Nav = ({
    setIsOpen,
}: {
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
    const { t } = useTranslation();
    const isDesktop = useMatchMedia('(min-width: 1024px)');

    const handleClick = () => {
        !isDesktop && setIsOpen !== undefined && setIsOpen(false);
    };

    return (
        <nav onClick={(event) => event.stopPropagation()}>
            <li>
                <Link to="about" activeClass="active" onClick={handleClick}>
                    {t('nav.about')}
                </Link>
            </li>
            <li>
                <Link to="prices" activeClass="active" onClick={handleClick}>
                    {t('nav.prices')}
                </Link>
            </li>
            <li>
                <Link to="materials" activeClass="active" onClick={handleClick}>
                    {t('nav.materials')}
                </Link>
            </li>
            <li>
                <Link to="feedback" activeClass="active" onClick={handleClick}>
                    {t('nav.feedback')}
                </Link>
            </li>
            <li>
                <Link
                    to="footer"
                    activeClass="active"
                    spy
                    onClick={handleClick}
                >
                    {t('nav.contact')}
                </Link>
            </li>
        </nav>
    );
};
