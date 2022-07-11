// Neste arquivo é realizada a conexão das models e suas associações com o banco de dados
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

const Atividade = require('../models/Atividade');
const Banca = require('../models/Banca');
const CodigoProfessor = require('../models/CodigoProfessor');
const Cronograma = require('../models/Cronograma');
const Curso = require('../models/Curso');
const FuncaoUsuario = require('../models/FuncaoUsuario');
const Instituto = require('../models/Instituto');
const Log = require('../models/Log');
const Norma = require('../models/Norma');
const PerfilProfessor = require('../models/PerfilProfessor');
const PerfilUsuario = require('../models/PerfilUsuario');
const Projeto = require('../models/Projeto');
const StatusTfg = require('../models/StatusTfg');
const Tfg = require('../models/Tfg');
const Universidade = require('../models/Universidade');
const Usuario = require('../models/Usuario');
const UsuarioTfg = require('../models/UsuarioTfg');

Atividade.init(connection);
Banca.init(connection);
CodigoProfessor.init(connection);
Cronograma.init(connection);
Curso.init(connection);
FuncaoUsuario.init(connection);
Log.init(connection);
Instituto.init(connection);
Norma.init(connection);
PerfilProfessor.init(connection);
PerfilUsuario.init(connection);
Projeto.init(connection);
StatusTfg.init(connection);
Tfg.init(connection);
Usuario.init(connection);
Universidade.init(connection);
UsuarioTfg.init(connection);

Atividade.associate(connection.models)
Banca.associate(connection.models)
Cronograma.associate(connection.models)
Curso.associate(connection.models)
FuncaoUsuario.associate(connection.models)
Instituto.associate(connection.models)
Log.associate(connection.models)
Norma.associate(connection.models)
PerfilProfessor.associate(connection.models)
PerfilUsuario.associate(connection.models)
Projeto.associate(connection.models)
StatusTfg.associate(connection.models)
Tfg.associate(connection.models)
Universidade.associate(connection.models)
Usuario.associate(connection.models)
UsuarioTfg.associate(connection.models)

module;exports = connection;