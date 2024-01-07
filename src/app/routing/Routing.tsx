import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';

export const Routing = () => {
    const isAuth = false;
    const routes = isAuth ? privateRoutes : publicRoutes;

    return (
        <Routes>
            <Route path="/">
                {routes.map(({ path, component: Component }) => {
                    return (
                        <Route
                            path={`/${path}/`}
                            element={<Component />}
                            key={path}
                        />
                    );
                })}
            </Route>
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
};
