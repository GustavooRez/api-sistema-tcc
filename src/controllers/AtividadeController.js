const Cronograma = require("../models/Cronograma");
const Atividade = require("../models/Atividade");

module.exports = {
  async store(req, res) {
    let { data, titulo, descricao, id_cronograma } = req.body;

    const cronograma = await Cronograma.findByPk(id_cronograma);

    if ( !cronograma ) {
      return res.json({ status: 404, error: "Cronograma não encontrado" });
    }

    if ( data !== "" && titulo !== "" && descricao !== "" ) {
      const atividade = await Atividade.create({
        data,
        titulo,
        descricao,
        id_cronograma
      });

      return res.json({ status: 200, atividade });
    } else {
      return res.json({ status: 400, error: "Preencha os campos obrigatórios" });
    }
  },
  async index(req, res) {
    const { id_atividade } = req.params;

    const atividade = await Atividade.findByPk(id_atividade);

    if (atividade) {
      return res.json({ status: 200, atividade });
    } else {
      return res.json({ status: 400, error: "Atividade não encontrada" });
    }
  },
  async indexAll(req, res) {
    const atividades = await Atividade.findAll();

    return res.json(atividades);
  },
  async update(req, res) {
    let { data, titulo, descricao } = req.body;
    let { id_atividade } = req.params;

    const atividade = await Atividade.findByPk(id_atividade);

    if ( !atividade ) {
      return res.json({ status: 404, error: "Atividade não encontrada" });
    }

    if ( data !== "" && titulo !== "" && descricao !== "" ) {
      await atividade.update({
        data,
        titulo,
        descricao
      });

      return res.json({ status: 200, atividade });
    } else {
      return res.json({ status: 400, error: "Preencha os campos obrigatórios" });
    }
  }
}