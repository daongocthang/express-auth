import { Router } from 'express';
import { userController as controller } from '../controllers';
import authJwt from '../middleware/authjwt';

const { verifyToken, isAdmin } = authJwt;

const router = Router();
export default (app) => {
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });
    router.get('/all', controller.allAccess);
    router.get('/user', [verifyToken], controller.userBoard);
    router.get('/admin', [verifyToken, isAdmin], controller.adminBoard);
    router.get('/mod', controller.moderatorBoard);
    app.use('/api/test', router);
};
