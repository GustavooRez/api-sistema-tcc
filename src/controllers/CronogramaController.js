// Neste controlador é realizado todas as funções relacionadas a Cronograma

const Curso = require("../models/Curso");
const Cronograma = require("../models/Cronograma");
const Atividade = require("../models/Atividade");
const Test = require("../test/FunctionsTest")

module.exports = {
  // A Função store é responsável por fazer o armazenamento dos dados dos Cronogramas
  async store(req, res) {
    const resultsEntries = Test.cronogramaControllerValidateStoreEntries(
      req.body
    );
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    let { ano, semestre, id_curso } = req.body;

    const curso = await Curso.findByPk(id_curso);

    if ( !curso ) {
      return res.json({ status: 404, error: "Curso não encontrado" });
    }

    if ( ano !== "" && semestre !== "" ) {
      const cronograma = await Cronograma.create({
        ano,
        semestre,
        id_curso
      });

      return res.json({ status: 200, cronograma });
    } else {
      return res.json({ status: 400, error: "Preencha os campos obrigatórios" });
    }
  },
  // A Função index é responsável por retornar os dados de um cronograma
  async index(req, res) {
      const resultsEntries = Test.cronogramaControllerValidateIndexEntries(
        req.params
      );
      if (resultsEntries) {
        return res.json(resultsEntries);
      }
    const { id_cronograma } = req.params;

    const cronograma = await Cronograma.findByPk(id_cronograma);

    if (cronograma) {
      return res.json({ status: 200, cronograma });
    } else {
      return res.json({ status: 400, error: "Cronograma não encontrado" });
    }
  },
  async indexActivities(req, res) {
    const resultsEntries = Test.cronogramaControllerValidateIndexActivitiesEntries(req.params);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_cronograma } = req.params;

    const cronograma = await Cronograma.findByPk(id_cronograma);

    if (cronograma) {
      const atividades = await Atividade.findAll({
        where: { id_cronograma }
      });

      return res.json({ status: 200, atividades });
    } else {
      return res.json({ status: 400, error: "Cronograma não encontrado" });
    }
  },
  async indexAll(req, res) {
    const cronogramas = await Cronograma.findAll();

    return res.json(cronogramas);
  },
  async update(req, res) {
    let { ano, semestre } = req.body;
    let { id_cronograma } = req.params;

    const cronograma = await Cronograma.findByPk(id_cronograma);

    if ( !cronograma ) {
      return res.json({ status: 404, error: "Cronograma não encontrado" });
    }

    if ( ano !== "" && semestre !== "" ) {
      cronograma.ano = ano;
      cronograma.semestre = semestre;

      await cronograma.save()

      return res.json({ status: 200, cronograma });
    } else {
      return res.json({ status: 400, error: "Preencha os campos obrigatórios" });
    }
  },
  async delete(req, res) {
    const resultsEntries = Test.cronogramaControllerValidateDeleteEntries(req.params);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    let { id_cronograma } = req.params;

    const cronograma = await Cronograma.findByPk(id_cronograma);

    if ( !cronograma ) {
      return res.status(400).json({ error: "Cronograma não encontrado" });
    }

    await cronograma.destroy();

    return res.json({ status: 200, message: "Cronograma deletado com sucesso" });
  }
}