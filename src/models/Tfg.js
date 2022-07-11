const { Model, DataTypes } = require("sequelize");

// ORM da tabela "tfg"
class Tfg extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        palavras_chave: DataTypes.STRING,
        introducao: DataTypes.STRING,
        objetivos: DataTypes.STRING,
        bibliografia: DataTypes.STRING,
        metodologia: DataTypes.STRING,
        resultados: DataTypes.STRING,
        nota_parcial: DataTypes.STRING,
        nota_final: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'tfg'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Banca, {
      foreignKey: 'id_tfg', as: 'banca'
    })
    this.belongsTo(models.StatusTfg, {
      foreignKey: 'status', as: 'status_tfg'
    })
  }
}

module.exports = Tfg;
