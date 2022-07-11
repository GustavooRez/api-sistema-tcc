'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('curso', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_instituto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'instituto', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo:{
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('curso', {
    })
  }
};
