import { ThreeDots } from 'react-loader-spinner';
import './spinner.styles.scss';

export const Spinner = () => {
    return (
        <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#fda2ad"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="spinner"
        />
    );
};
