'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('projeto', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_perfil_professor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'perfil_professor', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      titulo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao:{
        type: Sequelize.STRING,
        allowNull: false
      },
      pre_requisito:{
        type: Sequelize.STRING,
        allowNull: false
      },
      disponivel:{
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('projeto', {
    })
  }
};
