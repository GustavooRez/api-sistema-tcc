// ORM da tabela "cronograma"
const { Model, DataTypes } = require("sequelize");

class Universidade extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'universidade'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Instituto, {
      foreignKey: 'id_universidade', as: 'instituto'
    })
  }
}

module.exports = Universidade;
