import './logo.styles.scss';

export const Logo = () => {
    const handleClick = () => {
        window.location.reload();
    };

    return (
        <span className="logo" onClick={handleClick}>
            MarinaMK
        </span>
    );
};
