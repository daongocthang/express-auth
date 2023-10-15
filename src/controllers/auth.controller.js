import { Op } from 'sequelize';
import models from '../models';
import Messenger from '../utils/messenger';
import Role from '../models/role.model';

const { User } = models;

const messenger = new Messenger();
messenger.compose('User was registered successfully!', 'registered');

const signup = async (req, res) => {
    const { username, password, email, roles } = req.body;

    try {
        const newUser = await User.create({
            username,
            password,
            email,
        });
        if (roles) {
            const roleListFoundByName = await Role.findAll({
                where: {
                    [Op.or]: roles,
                },
            });
            await newUser.setRoles(roleListFoundByName);

            messenger.from(res).send('registered');
        } else {
            await newUser.setRoles([1]);
            messenger.from(res).send('registered');
        }
    } catch (er) {
        res.status(500).send({ message: er.message });
    }
};
const login = (req, res) => {};

export default { signup, login };
