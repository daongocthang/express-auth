import { DataTypes } from 'sequelize';

const Role = (sequelize) =>
    sequelize.define('roles', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.STRING(255),
    });

export default Role;
