// ORM da tabela "status_tfg"
const { Model, DataTypes } = require("sequelize");

class StatusTfg extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        codigo: {
          type: DataTypes.STRING,
          primaryKey: true
        }
      },
      {
        sequelize,
        tableName: 'status_tfg'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Tfg, {
      foreignKey: 'status', as: 'tfg'
    })
  }
}

module.exports = StatusTfg;
