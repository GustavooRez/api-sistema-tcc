// ORM da tabela "usuario"
const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        telefone: DataTypes.STRING,
        numero: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'usuario'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Log, {
      foreignKey: 'id_usuario', as: 'log'
    })
    this.belongsTo(models.PerfilUsuario, {
      foreignKey: 'id_perfil_usuario', as: 'perfil_usuario'
    })
    this.hasOne(models.PerfilProfessor, {
      foreignKey: 'id_usuario', as: 'perfil_professor'
    })
    this.hasMany(models.Banca, {
      foreignKey: 'id_usuario', as: 'banca'
    })
    this.belongsTo(models.Curso, {
      foreignKey: 'id_curso', as: 'curso'
    })
  }
}

module.exports = Usuario;
