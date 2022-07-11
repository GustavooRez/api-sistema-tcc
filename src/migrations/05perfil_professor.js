'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('perfil_professor', {
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
      descricao:{
        type: Sequelize.STRING,
        allowNull: false
      },
      link:{
        type: Sequelize.STRING,
        allowNull: false
      },
      areas_atuacao:{
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
    return queryInterface.dropTable('perfil_professor', {
    })
  }
};
