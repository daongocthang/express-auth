import authRoutes from './auth.routes';
import homeRoutes from './home.routes';
import userRoutes from './user.routes';

export default (app) => {
    homeRoutes(app);
    userRoutes(app);
    authRoutes(app);
};
