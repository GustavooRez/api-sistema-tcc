'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('usuario', {
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
      nome:{
        type: Sequelize.STRING,
        allowNull: false
      },
      telefone:{
        type: Sequelize.STRING,
        allowNull: false
      },
      numero:{
        type: Sequelize.STRING,
        allowNull: true
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false
      },
      senha:{
        type: Sequelize.STRING,
        allowNull: false
      },
      id_perfil_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'perfil_usuario', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    return queryInterface.dropTable('usuario', {
    })
  }
};
