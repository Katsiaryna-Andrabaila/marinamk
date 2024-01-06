import { Langs } from '../../entities/langs';
import { Logo } from '../../shared/logo';
import './header.styles.scss';

export const Header = () => {
    return (
        <header>
            <Logo />
            <Langs />
        </header>
    );
};
