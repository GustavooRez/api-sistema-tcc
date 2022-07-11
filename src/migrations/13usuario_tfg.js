'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('usuario_tfg', {
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
      id_funcao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'funcao_usuario', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      funcao:{
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
    return queryInterface.dropTable('usuario_tfg', {
    })
  }
};
