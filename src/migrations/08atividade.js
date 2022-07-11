'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('atividade', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_cronograma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'cronograma', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      data:{
        type: Sequelize.DATE,
        allowNull: false
      },
      titulo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao:{
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
    return queryInterface.dropTable('atividade', {
    })
  }
};
