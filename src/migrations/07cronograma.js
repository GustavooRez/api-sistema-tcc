'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('cronograma', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_curso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'curso', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ano:{
        type: Sequelize.STRING,
        allowNull: false
      },
      semestre:{
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
    return queryInterface.dropTable('cronograma', {
    })
  }
};
