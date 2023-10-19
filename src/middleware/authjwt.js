import Messenger from '../utils/messenger';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config';
import models from '../models';

const { User } = models;
const { TOKEN_SECRET } = authConfig;

const messenger = new Messenger();
messenger.compose('Require {0} Role!', 'requireRole');
messenger.compose('Unauthorized!', 'unauthorized');
messenger.compose('No token provided!', 'notFoundToken');

const verifyToken = (req, res, next) => {
    const token = req.session.token;
    console.log(req.session);
    if (!token) {
        messenger.from(res.status(403)).send('notFoundToken');
        return;
    }
    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
        if (error) {
            messenger.from(res.status(401)).send('unauthorized');
            return;
        }

        req.userId = decoded.id;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    const { userId } = req;

    const user = await User.findByPk(userId);

    const roleList = await user.getRoles();
    for (let i = 0; i < roleList.length; i++) {
        if (roleList[i].name === 'admin') {
            next();
            return;
        }
    }

    messenger.from(res.status(403)).send('require', ['Admin']);
};

export default {
    verifyToken,
    isAdmin,
};
