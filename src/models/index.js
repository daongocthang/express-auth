import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config';
import User from './user.model';
import Role from './role.model';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    timezone: dbConfig.timezone,
    pool: dbConfig.pool,
    operatorsAliases: false,
});

// Add models
export const ROLES = ['user', 'admin', 'moderator'];

const user = User(sequelize);
const role = Role(sequelize);

role.belongsToMany(user, { through: 'user_roles' });
user.belongsToMany(role, { through: 'user_roles' });

export async function createRolesIfNotExist() {
    const count = await role.count();
    if (count > 0) return;

    let i = ROLES.length;
    while (i--) {
        await role.create({
            id: i + 1,
            name: ROLES[i],
        });
    }
}

export default { sequelize, User: user, Role: role };
