'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('Propiedads', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      userid: {
        type: Sequelize.STRING,
        references: { model: 'users', key: 'id' },
        allowNull: false,
      },
      renta: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      numeroHabitaciones:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numeroBanios:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numeroEstacionamientos: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      precio: {
        allowNull: false,
        type: Sequelize.DECIMAL(19,4),
      },
      metrosCuadrados: {
        allowNull: false,
        type: Sequelize.DECIMAL(19,4),
      },
      
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Propiedads');
  }
};
