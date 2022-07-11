// ORM da tabela "banca"
const { Model, DataTypes } = require("sequelize");

class Banca extends Model {
  static init(sequelize) {
    super.init(
      {
        dia_horario: DataTypes.DATE,
        nota_final: DataTypes.FLOAT,
        nota_apresentacao: DataTypes.FLOAT,
        nota_trabalho: DataTypes.FLOAT
      },
      {
        sequelize,
        tableName: 'banca'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario', as: 'usuario'
    })
    this.belongsTo(models.Tfg, {
      foreignKey: 'id_tfg', as: 'tfg'
    })
  }
}

module.exports = Banca;
