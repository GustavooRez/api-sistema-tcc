// Neste controlador é realizado todas as funções relacionadas a Curso

const Curso = require("../models/Curso");
const Instituto = require("../models/Instituto")
const Test = require("../test/FunctionsTest");

module.exports = {
    // A Função store é responsável por fazer o armazenamento dos Cursos
    async store(req, res) {
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
      //   const resultsEntries = Test.institutoControllerValidateIndexEntries(
      //     req.params
      //   );
      //   if (resultsEntries) {
      //     return res.json(resultsEntries);
      //   }
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
      let { id_curso } = req.params;

      const curso = await Curso.findByPk(id_curso);

      if ( !curso ) {
        return res.status(400).json({ error: "Curso não encontrado" });
      }

      await curso.destroy();

      return res.json({ status: 200, message: "Curso deletado com sucesso" });
    }
}