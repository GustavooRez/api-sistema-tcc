// ORM da tabela "norma"
const { Model, DataTypes } = require("sequelize");

class Norma extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        link: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'norma'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Curso, {
      foreignKey: 'id_curso', as: 'curso'
    })
  }
}

module.exports = Norma;
