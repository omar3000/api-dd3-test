import { Model, DataTypes, BuildOptions, IntegerDataType} from 'sequelize';

const sequelize = require("../database/db");

const User = require("../models/User")

interface PropiedadModel extends Model {
    readonly id: string;
    userid: string;
    renta: boolean;
    numeroHabitaciones: number;
    numeroEstacionamientos: number;
    numeroBanios: number;
    precio: number;
    metrosCuadrados: number;

}

type PropiedadModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): PropiedadModel;
}

const Propiedad = <PropiedadModelStatic>sequelize.define(
    'Propiedad',
    {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        userid: {
            type: DataTypes.STRING,
            references: { model: 'user', key: 'id' },
            allowNull: false,
        },
        renta: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        numeroHabitaciones:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        numeroEstacionamientos: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        numeroBanios: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        precio: {
            allowNull: false,
            type: DataTypes.DECIMAL(19,4),
        },
        metrosCuadrados: {
            allowNull: false,
            type: DataTypes.DECIMAL(19,4),
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
    });
    
    User.belongsTo(Propiedad, {foreignKey: 'id'}); // Adds fk_company to User

    Propiedad.hasOne(User, {foreignKey: 'id',sourceKey: 'userid'});



module.exports = Propiedad;