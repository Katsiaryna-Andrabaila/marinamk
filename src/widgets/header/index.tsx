import { Langs } from 'features/langs';
import { Nav } from 'entities/nav';
import { Logo } from 'shared/logo';
import './header.styles.scss';
import useMatchMedia from '@buildinams/use-match-media';
import { Burger } from 'features/burger';

export const Header = () => {
    const isDesktop = useMatchMedia('(min-width: 1024px)');

    return (
        <header>
            <div className="header_wrapper">
                <Logo />
                {isDesktop ? (
                    <>
                        <Nav />
                        <Langs />
                    </>
                ) : (
                    <>
                        <Langs />
                        <Burger />
                    </>
                )}
            </div>
        </header>
    );
};
