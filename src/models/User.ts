import { Model, DataTypes, BuildOptions} from 'sequelize';

const sequelize = require("../database/db");

const Propiedad = require('../models/Propiedad')

interface UserModel extends Model {
    readonly id: string;
    email: string,
    password: string
}

type UserModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel;
}

const User = <UserModelStatic>sequelize.define(
    'user',
    {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });



module.exports = User;