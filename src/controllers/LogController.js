// Neste controlador é realizado todas as funções relacionadas ao Log do sistema
const Log = require("../models/Log");
const Usuario = require("../models/Usuario");
const Test = require("../test/FunctionsTest");

module.exports = {
  // A Função index é responsável por retornar todos os logs relacionados à um usuário
  async index(req, res) {
    const resultsEntries = Test.usuarioControllerValidateIndexEntries(
      req.params
    );
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_usuario } = req.params;

    const usuario = await Usuario.findByPk(id_usuario, {
      include: { association: "log" },
    });

    return res.json(usuario.professor);
  },
  // A Função store é responsável por fazer o armazenamento do log
  async store(req, res) {
    const resultsEntries = Test.logControllerValidateStoreEntries(req.params);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_usuario } = req.params;
    const { acao } = req.body;

    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const log = await Log.create({
      acao,
      id_usuario,
    });

    return res.json(log);
  },
};
