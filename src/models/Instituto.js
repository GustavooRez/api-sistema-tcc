// ORM da tabela "atividade"
const { Model, DataTypes } = require("sequelize");

class Instituto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'instituto'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Curso, {
      foreignKey: 'id_instituto', as: 'curso'
    })
    this.belongsTo(models.Universidade, {
      foreignKey: 'id_universidade', as: 'universidade'
    })
  }
}

module.exports = Instituto;
