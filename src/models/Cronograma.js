// ORM da tabela "cronograma"
const { Model, DataTypes } = require("sequelize");

class Cronograma extends Model {
  static init(sequelize) {
    super.init(
      {
        ano: DataTypes.STRING,
        semestre: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'cronograma'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Atividade, {
      foreignKey: 'id_cronograma', as: 'atividade'
    })
    this.belongsTo(models.Curso, {
      foreignKey: 'id_curso', as: 'curso'
    })
  }
}

module.exports = Cronograma;
