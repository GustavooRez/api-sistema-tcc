// ORM da tabela "atividade"
const { Model, DataTypes } = require("sequelize");

class Atividade extends Model {
  static init(sequelize) {
    super.init(
      {
        data: DataTypes.DATE,
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'atividade'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Projeto, {
      foreignKey: 'id_cronograma', as: 'cronograma'
    })
  }
}

module.exports = Atividade;
