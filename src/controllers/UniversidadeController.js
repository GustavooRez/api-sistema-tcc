// Neste controlador é realizado todas as funções relacionadas a Universidade

const Universidade = require("../models/Universidade");
const Instituto = require("../models/Instituto");
const Test = require("../test/FunctionsTest");

module.exports = {
  // A Função é store é responsável por cadastrar uma nova universidade
  async store(req, res) {
    const resultsEntries = Test.universidadeControllerValidateStoreEntries(
      req.body
    );
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    let { nome } = req.body;

    if (nome !== "") {
      const universidade = await Universidade.create({
        nome
      });

      return res.json({ status: 200, universidade });
    } else {
      return res.json({ status: 400, error: "Preencha os campos obrigatórios" });
    }
  },
  // A Função index é responsável por retornar os dados de uma universidade
  async index(req, res) {
      const resultsEntries = Test.universidadeControllerValidateIndexEntries(
        req.params
      );
      if (resultsEntries) {
        return res.json(resultsEntries);
      }
    const { id_universidade } = req.params;

    const universidade = await Universidade.findByPk(id_universidade);

    if (universidade) {
      return res.json({ status: 200, universidade });
    } else {
      return res.json({ status: 400, error: "Universidade não encontrada" });
    }
  },
  // A Função indexAll é responsável por retornar todas as universidades
  async indexAll(req, res) {
    const universidades = await Universidade.findAll();

    return res.json({ status: 200, universidades });
  },
  // A Função indexInstitute é responsável por retornar os institutos apartir de uma universidade
  async indexInstitutes(req, res) {
      const resultsEntries = Test.universidadeControllerValidateIndexInstitutesEntries(
        req.params
      );
      if (resultsEntries) {
        return res.json(resultsEntries);
      }
    const { id_universidade } = req.params;

    const universidade = await Universidade.findByPk(id_universidade);

    if (universidade) {
      const institutos = await Instituto.findAll({
        where: { id_universidade },
      });

      return res.json({ status: 200, institutos });
    } else {
      return res.json({ status: 400, error: "Universidade não encontrada" });
    }
  },
  // A Função update é responsável por realizar o update de uma universidade
  async update(req, res) {
    let { nome } = req.body;
    const { id_universidade } = req.params;

    const universidade = await Universidade.findByPk(id_universidade);

    if ( !universidade ) {
      return res.status(400).json({ error: "Universidade não encontrada" });
    } else {
      if ( nome !== "" ) {
        universidade.nome = nome;

        await universidade.save();

        return res.json({ 
          status: 200,
          message: "Universidade atualizada com sucesso",
          universidade
        });
      } else {
        return res.status(400).json({ error: "Preencha os campos necessários" });
      }
    }
  },
  // A Função delete é responsável por deletar uma universidade
  async delete(req, res) {
    const resultsEntries = Test.universidadeControllerValidateDeleteEntries(
      req.params
    );
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_universidade } = req.params;

    const universidade = await Universidade.findByPk(id_universidade);

    if ( !universidade ) {
      return res.status(400).json({ error: "Universidade não encontrada" });
    }

    await universidade.destroy();

    return res.json({ status: 200, message: "Universidade deletada com sucesso" });
  },
};
