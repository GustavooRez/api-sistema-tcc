'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('banca', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'usuario', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_tfg: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'tfg', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      dia_horario:{
        type: Sequelize.DATE,
        allowNull: false
      },
      nota_final:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      nota_apresentacao:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      nota_trabalho:{
        type: Sequelize.FLOAT,
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
    return queryInterface.dropTable('banca', {
    })
  }
};
