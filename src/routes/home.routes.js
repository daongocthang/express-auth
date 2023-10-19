import { Router } from 'express';

const router = Router();

export default (app) => {
    router.get('/', (req, res) => {
        // res.send({ message: 'Welcome to ExpresJS' });
        res.render('index');
    });

    app.use('/', router);
};
