import { Op } from 'sequelize';
import models from '../models';
import Messenger from '../utils/messenger';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../config/auth.config';

const { User, Role } = models;

const messenger = new Messenger();
messenger.compose('User was registered successfully!', 'registered');
messenger.compose('User Not found.', 'notFound');

const signup = async (req, res) => {
    const { username, password, email, roles } = req.body;

    try {
        const hashedPassword = bcrypt.hashSync(password, 8);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        if (roles) {
            const roleListFoundByName = await Role.findAll({
                where: {
                    name: { [Op.or]: roles },
                },
            });
            await newUser.setRoles(roleListFoundByName);
        } else {
            await newUser.setRoles([1]);
        }

        messenger.from(res).send('registered');
    } catch (er) {
        res.status(500).send({ message: er.message });
    }
};
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                username,
            },
        });

        if (!user) {
            messenger.from(res.status(404)).send('notFound');
            return;
        }

        //TODO: password is valid
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            res.status(401).send({
                accessToken: null,
                message: 'Invalid Password',
            });
        }

        const token = jwt.sign({ id: user.id }, secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400,
        }); // expires: 24 hours
        const roleList = await user.getRoles({ raw: true });
        const authorities = roleList.map((role) => 'ROLE_' + role.name.toUpperCase());

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    } catch (er) {
        res.status(500).send({ message: er.message });
    }
};

export default { signup, login };
