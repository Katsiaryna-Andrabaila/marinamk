import './footer.styles.scss';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer-wrapper">
                <Link
                    href="https://www.linkedin.com/in/katsiaryna-andrabaila-94669b23a/"
                    target="_blank"
                >
                    @TechnoBoar
                </Link>
                <span>2024</span>
            </div>
        </footer>
    );
};
