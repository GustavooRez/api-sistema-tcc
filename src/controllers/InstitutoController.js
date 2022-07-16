// Neste controlador é realizado todas as funções relacionadas a Instituto

const Instituto = require("../models/Instituto");
const Universidade = require("../models/Universidade");
const Curso = require("../models/Curso");
const Test = require("../test/FunctionsTest");


module.exports = {
    // A Função store é responsável por fazer o armazenamento dos dados do Instituto
    async store(req, res) {
      const resultsEntries = Test.institutoControllerValidateStoreEntries(req.body);
        if (resultsEntries) {
          return res.json(resultsEntries);
        }
      let { nome, id_universidade } = req.body;

      const universidade = await Universidade.findByPk(id_universidade);

      if ( !universidade ) {
        return res.status(400).json({ error: "Universidade não encontrada" });
      }

      if ( nome !== "" ) {
        const instituto = await Instituto.create({
          nome,
          id_universidade
        });

        return res.status(200).json({ instituto });
      } else {
        return res.status(400).json({ error: "Preencha os campos obrigatórios" });
      }

    },
    // A Função index é responsável por retornar os dados de um instituto
    async index(req, res) {
        const resultsEntries = Test.institutoControllerValidateIndexEntries(
          req.params
        );
        if (resultsEntries) {
          return res.json(resultsEntries);
        }
      const { id_instituto } = req.params;
  
      const instituto = await Instituto.findByPk(id_instituto);
  
      if (instituto) {
        return res.json({ status: 200, instituto });
      } else {
        return res.json({ status: 400, error: "Instituto não encontrado" });
      }
    },
    // A Função indexCourses é responsável por retornar os cursos apartir de um instituto
    async indexCourses(req, res) {
        const resultsEntries = Test.institutoControllerValidateIndexCoursesEntries(
          req.params
        );
        if (resultsEntries) {
          return res.json(resultsEntries);
        }
      const { id_instituto } = req.params;
  
      const instituto = await Instituto.findByPk(id_instituto);
  
      if (instituto) {
        const cursos = await Curso.findAll({
          where: { id_instituto },
        });
  
        return res.json({ status: 200, cursos });
      } else {
        return res.json({ status: 400, error: "Instituto não encontrado" });
      }
    },
    async indexAll(req, res) {
      const institutos = await Instituto.findAll();

      return res.json({ status: 200, institutos });
    },
    // A Função update é responsável por atualizar os institutos.
    async update(req, res) {
      let { nome, id_universidade } = req.body;
      let { id_instituto } = req.params;

      const instituto = await Instituto.findByPk(id_instituto);

      if ( !instituto ) {
        return res.status(400).json({ error: "Instituto não encontrado" });
      }

      const universidade = await Universidade.findByPk(id_universidade);

      if ( universidade ) {
        if ( nome !== "" ) {
          instituto.nome = nome;
          instituto.id_universidade = id_universidade;

          await instituto.save();

          return res.json({ status: 200, instituto });
        } else {
          return res.status(400).json({ error: "Preencha os campos obrigatórios" })
        }
      } else {
        return res.status(400).json({ error: "Universidade não encontrada" });
      }
    },
    // A Função de delete é responsável por deletar um instituto.
    async delete(req, res) {
      const resultsEntries = Test.institutoControllerValidateDeleteEntries(req.params);
        if (resultsEntries) {
          return res.json(resultsEntries);
        }
      let { id_instituto } = req.params;

      const instituto = await Instituto.findByPk(id_instituto);

      if ( !instituto ) {
        return res.status(400).json({ error: "Instituto não encontrado" });
      }

      await instituto.destroy();

      return res.json({ status: 200, message: "Instituto deletado com sucesso" });
    }
  };
  