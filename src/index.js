import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import models, { createRolesIfNotExist } from './models';
import routes from './routes';

global.__basedir = __dirname + '/public';

dotenv.config({ path: './.env.local' });

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public/static'));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

models.sequelize.sync().then(async () => {
    await createRolesIfNotExist();
});
// .catch((e) => console.log('Failed to sync database: ' + e.message));

routes(app);

const port = process.env.NODE_DOCKER_PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
