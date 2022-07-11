'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('tfg', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {model: 'status_tfg', key: 'codigo'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      titulo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      palavras_chave:{
        type: Sequelize.STRING,
        allowNull: false
      },
      introducao:{
        type: Sequelize.STRING,
        allowNull: false
      },
      objetivos:{
        type: Sequelize.STRING,
        allowNull: false
      },
      bibliografia:{
        type: Sequelize.STRING,
        allowNull: false
      },
      metodologia:{
        type: Sequelize.STRING,
        allowNull: false
      },
      resultados:{
        type: Sequelize.STRING,
        allowNull: false
      },
      nota_parcial:{
        type: Sequelize.STRING,
        allowNull: true
      },
      nota_final:{
        type: Sequelize.STRING,
        allowNull: true
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
    return queryInterface.dropTable('tfg', {
    })
  }
};
