'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('status_tfg', {
      nome:{
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo:{
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('status_tfg', {
    })
  }
};
