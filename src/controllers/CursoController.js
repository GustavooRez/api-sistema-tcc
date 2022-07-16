// Neste controlador é realizado todas as funções relacionadas a Curso

const Curso = require("../models/Curso");
const Instituto = require("../models/Instituto");
const Cronograma = require("../models/Cronograma");
const Test = require("../test/FunctionsTest");

module.exports = {
    // A Função store é responsável por fazer o armazenamento dos Cursos
    async store(req, res) {
      const resultsEntries = Test.cursoControllerValidateStoreEntries(
        req.body
      );
      if (resultsEntries) {
        return res.json(resultsEntries);
      }
      let { nome, codigo, id_instituto } = req.body;

      const instituto = await Instituto.findByPk(id_instituto);

      if ( !instituto ) {
        return res.status(400).json({ error: "Instituto não encontrado" });
      }

      if ( nome !== "" ) {
        const curso = await Curso.create({
          nome,
          codigo,
          id_instituto
        });

        return res.status(200).json({ curso });
      } else {
        return res.status(400).json({ error: "Preencha os campos obrigatórios" });
      }

    },
    // A Função index é responsável por retornar os dados de um curso
    async index(req, res) {
        const resultsEntries = Test.cursoControllerValidateIndexEntries(
          req.params
        );
        if (resultsEntries) {
          return res.json(resultsEntries);
        }
      const { id_curso } = req.params;
  
      const curso = await Curso.findByPk(id_curso);
  
      if (curso) {
        return res.json({ status: 200, curso });
      } else {
        return res.json({ status: 400, error: "Curso não encontrado" });
      }
    },
    async indexAll(req, res) {
      const cursos = await Curso.findAll();

      return res.json(cursos);
    },
    async indexTimelines(req, res) {
      const resultsEntries = Test.cursoControllerValidateIndexTimelinesEntries(
        req.params
      );
      if (resultsEntries) {
        return res.json(resultsEntries);
      }
      const { id_curso } = req.params;

      const curso = await Curso.findByPk(id_curso);

      

      if (curso) {
        const cronogramas = await Cronograma.findAll({
          where: { id_curso },
        });

        return res.json({ status: 200, cronogramas });
      } else {
        return res.json({ status: 400, error: "Cronograma não encontrado" });
      }
    },
    async update(req, res) {
      let { nome, codigo } = req.body;
      let { id_curso } = req.params;

      const curso = await Curso.findByPk(id_curso);

      if ( !curso ) {
        return res.status(400).json({ error: "Curso não encontrado" });
      }

      if ( nome !== "" && codigo !== "" ) {
        curso.nome = nome;
        curso.codigo = codigo;

        await curso.save();

        return res.json({ status: 200, curso })
      } else {
        return res.status(400).json({ error: "Preencha os campos obrigatórios" })
      }
    },
    async delete(req, res) {
      const resultsEntries = Test.cursoControllerValidateDeleteEntries(
        req.params
      );
      if (resultsEntries) {
        return res.json(resultsEntries);
      }
      let { id_curso } = req.params;

      const curso = await Curso.findByPk(id_curso);

      if ( !curso ) {
        return res.status(400).json({ error: "Curso não encontrado" });
      }

      await curso.destroy();

      return res.json({ status: 200, message: "Curso deletado com sucesso" });
    }
}