// Neste controlador é realizado todas as funções relacionadas ao Projeto

const Projeto = require("../models/Projeto");
const Usuario = require("../models/Usuario");
const PerfilProfessor = require("../models/PerfilProfessor");
const Test = require("../test/FunctionsTest");

module.exports = {
  // A Função store é responsável por fazer o armazenamento dos dados do projeto
  async store(req, res) {
    const resultsEntries = Test.projetoValidateStoreEntries(req.body);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    let { titulo, descricao, disponivel, id_perfil_professor, pre_requisito } = req.body;

    if (
        titulo !== "" &&
        descricao !== "" &&
        disponivel !== "" &&
        pre_requisito !== "" &&
        id_perfil_professor !== ""
    ) {
      var projeto = await Projeto.create({
        titulo,
        descricao,
        disponivel,
        pre_requisito,
        id_perfil_professor,
      });
      if(projeto){
        return res.json({
          status: 200,
          error: "Projeto cadastrado com sucesso",
        });
      }else{
        return res.json({
          status: 400,
          error: "Erro na criação do Projeto",
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
  async index(req, res) {
      const resultsEntries = Test.projetoControllerValidateIndexEntries(
        req.params
      );
      if (resultsEntries) {
        return res.json(resultsEntries);
      }
    const { id_projeto } = req.params;

    const projeto = await Projeto.findByPk(id_projeto);
    if (projeto) {
      return res.json({ status: 200, projeto });
    } else {
      return res.json({ status: 400, error: "Projeto não encontrado" });
    }
  },
  // A função index é responsável por retornar os dados do perfil professores
  async indexAll(req, res) {

    const projetosDisponiveis = await Projeto.findAll({where: {disponivel: 1},
      include: [{ model: PerfilProfessor, as: "perfil_professor", include: [{ model: Usuario, as: "usuario"}] }],});
    const projetosNaoDisponiveis = await Projeto.findAll({where: {disponivel: 0},
      include: [{ model: PerfilProfessor, as: "perfil_professor", include: [{ model: Usuario, as: "usuario"}] }],});
    return res.json({ status: 200, projetosDisponiveis, projetosNaoDisponiveis });
    
  }
};
