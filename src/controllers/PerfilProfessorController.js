// Neste controlador é realizado todas as funções relacionadas ao Perfil professor

const PerfilProfessor = require("../models/PerfilProfessor");
const Usuario = require("../models/Usuario");
const Test = require("../test/FunctionsTest");

module.exports = {
  // A Função store é responsável por fazer o armazenamento dos dados do perfil professor
  async store(req, res) {
    const resultsEntries = Test.perfilProfessorValidateStoreEntries(req.body);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    let { descricao, areas_atuacao, link, id_usuario } = req.body;

    if (
      descricao !== "" &&
      areas_atuacao !== "" &&
      link !== "" &&
      id_usuario !== ""
    ) {
      var perfilProfessor = await PerfilProfessor.create({
        descricao,
        areas_atuacao,
        link,
        id_usuario,
      });
      if(perfilProfessor){
        return res.json({
          status: 200,
          error: "Perfil Professor cadastrado com sucesso",
        });
      }else{
        return res.json({
          status: 400,
          error: "Erro na criação do Perfil professor",
        });
      }
    } else {
      return res.json({
        status: 400,
        error: "Preencha os campos obrigatórios",
      });
    }
  },
  // A função index é responsável por retornar os dados do perfil professores
  async indexUser(req, res) {
      const resultsEntries = Test.perfilProfessorControllerValidateIndexUserEntries(
        req.params
      );
      if (resultsEntries) {
        return res.json(resultsEntries);
      }
    const { id_usuario } = req.params;

    const perfilProfessor = await PerfilProfessor.findOne({
      where: { id_usuario }
    });
    if (perfilProfessor) {
      return res.json({ status: 200, perfilProfessor });
    } else {
      return res.json({ status: 201, perfilProfessor });
    }
  },
  // A função index é responsável por retornar os dados do perfil professores
  async index(req, res) {
      const resultsEntries = Test.perfilProfessorControllerValidateIndexEntries(
        req.params
      );
      if (resultsEntries) {
        return res.json(resultsEntries);
      }
    const { id_perfil_professor } = req.params;

    const perfilProfessor = await PerfilProfessor.findOne({
      where: { id: id_perfil_professor },
      include: [{ model: Usuario, as: "usuario"}]
    });
    if (perfilProfessor) {
      return res.json({ status: 200, perfilProfessor });
    } else {
      return res.json({ status: 201, perfilProfessor });
    }
  },
  // A função index é responsável por retornar os dados do perfil professores
  async indexAll(req, res) {

    const perfilProfessor = await PerfilProfessor.findAll({
      include: [{ model: Usuario, as: "usuario"}]
    });
    return res.json({ status: 200, perfilProfessor });
  }
};
