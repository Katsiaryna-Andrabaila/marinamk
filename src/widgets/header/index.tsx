import { Langs } from '../../entities/langs';
import { Nav } from '../../entities/nav';
import { Logo } from '../../shared/logo';
import './header.styles.scss';

export const Header = () => {
    return (
        <header>
            <div className="header_wrapper">
                <Logo />
                <Nav />
                <Langs />
            </div>
        </header>
    );
};
