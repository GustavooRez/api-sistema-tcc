// ORM da tabela "perfil_usuario"
const { Model, DataTypes } = require("sequelize");

class FuncaoUsuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'funcao_usuario'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.UsuarioTfg, {
      foreignKey: 'id_funcao', as: 'funcao_usuario'
    })
  }
} 

module.exports = FuncaoUsuario;
