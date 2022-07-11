// ORM da tabela "perfil_usuario"
const { Model, DataTypes } = require("sequelize");

class PerfilUsuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'perfil_usuario'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Usuario, {
      foreignKey: 'id_perfil_usuario', as: 'perfil_usuario'
    })
  }
}

module.exports = PerfilUsuario;
