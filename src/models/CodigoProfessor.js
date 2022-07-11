// ORM da tabela "codigo_professor"
const { Model, DataTypes } = require("sequelize");

class CodigoProfessor extends Model {
  static init(sequelize) {
    super.init(
      {
        codigo: DataTypes.STRING,
        disponivel: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: 'codigo_professor'
      }
    );
  }
}

module.exports = CodigoProfessor;
