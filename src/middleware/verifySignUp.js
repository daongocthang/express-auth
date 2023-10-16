import Messenger from '../utils/messenger';
import models from '../models';
import { ROLES } from '../models';

const User = models.User;

const messenger = new Messenger();
messenger.compose('Failed! {0} is already in use!', 'exist');
messenger.compose('Failed! {0} does not exist = {1}', 'notFound');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const { username, email } = req.body;
    const userFounndByName = await User.findOne({ where: { username } });

    if (userFounndByName) {
        messenger.from(res.status(400)).send('exist', ['Username']);
        return;
    }

    const userFounndByEmail = await User.findOne({ where: { email } });

    if (userFounndByEmail) {
        messenger.from(res.status(400)).send('exist', ['Email']);
        return;
    }

    next();
};
const checkRolesExist = (req, res, next) => {
    const { roles } = req.body;
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i];
            if (!ROLES.includes(role)) {
                messenger.from(res.status(400)).send('notFound', ['Role', role]);
                return;
            }
        }
    }

    next();
};

export default {
    checkDuplicateUsernameOrEmail,
    checkRolesExist,
};
