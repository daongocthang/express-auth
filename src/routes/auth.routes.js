import { Router } from 'express';
import { authController as controller } from '../controllers';
import verifySignUp from '../middleware/verifySignUp';

const router = Router();
export default (app) => {
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });
    router.post(
        '/signup',
        [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExist],
        controller.signup,
    );

    router.post('/signin', controller.signin);
    router.post('/signout', controller.signout);

    app.use('/api/auth', router);
};
