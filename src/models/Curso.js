// ORM da tabela "atividade"
const { Model, DataTypes } = require("sequelize");

class Curso extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        codigo: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'curso'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Instituto, {
      foreignKey: 'id_instituto', as: 'instituto'
    })
    this.hasMany(models.Cronograma, {
      foreignKey: 'id_curso', as: 'cronograma'
    })
    this.hasMany(models.Norma, {
      foreignKey: 'id_curso', as: 'norma'
    })
    this.hasMany(models.Usuario, {
      foreignKey: 'id_curso', as: 'usuario'
    })
  }
}

module.exports = Curso;
