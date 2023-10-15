import { Router } from 'express';
import { userController as controller } from '../controllers';

const router = Router();
export default (app) => {
    router.get('/all', controller.allAccess);
    router.get('/user', controller.userBoard);
    router.get('/admin', controller.adminBoard);
    router.get('/mod', controller.moderatorBoard);

    app.use('/api/test', router);
};
