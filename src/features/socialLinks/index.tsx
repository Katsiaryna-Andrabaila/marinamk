import Image from 'next/image';
import Link from 'next/link';

export const SocialLinks = () => {
    return (
        <div className="social_links">
            <Link
                href="https://www.facebook.com/marina.marishka.16?mibextid=ZbWKwL"
                target="_blank"
            >
                <Image
                    src="/icons/facebook.png"
                    alt="facebook-link"
                    width={48}
                    height={48}
                    sizes="(max-width: 768px) 60%, (max-width: 1200px) 60%"
                />
            </Link>
            <Link
                href="https://www.instagram.com/marinails_cairo/?igsh=NTYzOWQzNmJjMA%3D%3D"
                target="_blank"
            >
                <Image
                    src="/icons/instagram.png"
                    alt="instagram-link"
                    width={48}
                    height={48}
                    sizes="(max-width: 768px) 60%, (max-width: 1200px) 60%"
                />
            </Link>
            <Link
                href="https://www.tiktok.com/@marinails_cairo?_t=8jME3xEBBzi&_r=1"
                target="_blank"
            >
                <Image
                    src="/icons/tiktok.png"
                    alt="tiktok-link"
                    width={48}
                    height={48}
                    sizes="(max-width: 768px) 60%, (max-width: 1200px) 60%"
                />
            </Link>
        </div>
    );
};
