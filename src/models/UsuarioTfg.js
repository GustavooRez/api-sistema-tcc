// ORM da tabela "usuario_tfg"
const { Model, DataTypes } = require("sequelize");

class UsuarioTfg extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: DataTypes.INTEGER,
        id_tfg: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: 'usuario_tfg'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.FuncaoUsuario, {
      foreignKey: 'id_funcao', as: 'funcao_usuario'
    })
  }
}

module.exports = UsuarioTfg;
