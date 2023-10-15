import { DataTypes } from 'sequelize';

const User = (sequelize) =>
    sequelize.define('users', {
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: DataTypes.STRING(255),
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    });

export default User;
