import Link from 'next/link';
import Image from 'next/image';

type MaterialLinkProps = {
    href: string;
    src: string;
    alt: string;
    sizes?: string;
    className?: string;
};

export const MaterialLink = ({
    href,
    src,
    alt,
    sizes = '(max-width: 768px) 60%, (max-width: 1200px) 60%',
    className = '',
}: MaterialLinkProps) => {
    return (
        <Link href={href} target="_blank">
            <Image
                src={src}
                className={className}
                alt={alt}
                fill={true}
                sizes={sizes}
            />
        </Link>
    );
};
