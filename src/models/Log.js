// ORM da tabela "log"
const { Model, DataTypes } = require("sequelize");

class Log extends Model {
  static init(sequelize) {
    super.init(
      {
        acao: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'log'
      }
    );
  }

  static associate(models){
    this.belongsTo(models.Usuario, {foreignKey: 'id_usuario', as: 'log'})
  }
}

module.exports = Log;
