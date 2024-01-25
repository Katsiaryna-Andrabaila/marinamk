import './footer.styles.scss';
import Link from 'next/link';

type FooterProps = {
    isAbsolute?: boolean;
};

export const Footer = ({ isAbsolute }: FooterProps) => {
    return (
        <footer id="footer" className={isAbsolute ? 'footer_absolute' : ''}>
            <div className="footer-wrapper">
                <Link
                    href="https://www.linkedin.com/in/katsiaryna-andrabaila-94669b23a/"
                    target="_blank"
                >
                    @TechnoExpert
                </Link>
                <span>2024</span>
            </div>
        </footer>
    );
};
