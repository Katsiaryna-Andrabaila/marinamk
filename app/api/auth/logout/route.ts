import { NextApiHandlerWithCookie } from 'shared/apiTypes';
import authGuard from 'shared/apiUtils/authGuard';
import cookies from 'shared/apiUtils/cookie';

const logoutHandler: NextApiHandlerWithCookie = async (_, res) => {
    // для реализации выхода пользователя из системы достаточно удалить куки
    res.cookie({
        name: process.env.COOKIE_NAME,
        value: '',
        options: {
            httpOnly: true,
            maxAge: 0,
            path: '/',
            sameSite: true,
            secure: true,
        },
    });

    res.status(200).json({ message: 'Logout success' });
};

// этот роут является защищенным
export default authGuard(cookies(logoutHandler) as never);
