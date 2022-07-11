// ORM da tabela "perfil_professor"
const { Model, DataTypes } = require("sequelize");

class PerfilProfessor extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
        link: DataTypes.STRING,
        areas_atuacao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'perfil_professor'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario', as: 'usuario'
    })
    this.hasMany(models.Projeto, {
      foreignKey: 'id_perfil_professor', as: 'projeto'
    })
  }
}

module.exports = PerfilProfessor;
