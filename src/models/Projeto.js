// ORM da tabela "projeto"
const { Model, DataTypes } = require("sequelize");

class Projeto extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        pre_requisito: DataTypes.STRING,
        disponivel: DataTypes.BOOLEAN
      },
      {
        sequelize,
        tableName: 'projeto'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.PerfilProfessor, {
      foreignKey: 'id_perfil_professor', as: 'perfil_professor'
    })
  }
}

module.exports = Projeto;
