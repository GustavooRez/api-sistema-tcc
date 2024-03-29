// Neste controlador é realizado todas as funções relacionadas a Banca

const Banca = require('../models/Banca');
const Usuario = require('../models/Usuario');
const Tfg = require('../models/Tfg');
const Test = require('../test/FunctionsTest');

module.exports = {
    async store(req, res) {
        const resultsEntries = Test.bancaControllerValidateStoreEntries(req.body);
          if (resultsEntries) {
            return res.json(resultsEntries);
          }
        const { id_tfg, id_usuario, dia_horario } = req.body;

        const usuario = await Usuario.findByPk(id_usuario);

        if ( !usuario ) {
          return res.json({ status: 400, error: "Usuário não encontrado" });
        }

        const tfg = await Tfg.findByPk(id_tfg);

        if ( !tfg ) {
          return res.json({ status: 400, error: "Tfg não encontrado" });
        }

        if ( dia_horario !== "" ) {
          const banca = await Banca.create({ 
            id_tfg,
            id_usuario,
            dia_horario
          });

          return res.json({ status: 200, banca });
        } else {
          return res.json({ status: 400, error: "Dia e horário não informados" });
        }
    },
    async index(req, res) {
      const resultsEntries = Test.bancaControllerValidateIndexEntries(req.params);
        if (resultsEntries) {
          return res.json(resultsEntries);
        }
      const { id_banca } = req.params;

      const banca = await Banca.findByPk(id_banca);

      if (banca) {
        return res.json({ status: 200, banca });
      } else {
        return res.json({ status: 400, error: "Banca não encontrado" });
      }
    },
    async indexAll(req, res) {
      const bancas = await Banca.findAll();

      if (bancas) {
        return res.json({ status: 200, bancas });
      } else {
        return res.json({ status: 400, error: "Bancas não encontradas" });
      }
    },
    async update(req, res) {
      const { id_banca } = req.params;
      const { id_tfg, id_usuario, dia_horario } = req.body;

      const usuario = await Usuario.findByPk(id_usuario);

      if ( !usuario ) {
        return res.json({ status: 400, error: "Usuário não encontrado" });
      }

      const tfg = await Tfg.findByPk(id_tfg);

      if ( !tfg ) {
        return res.json({ status: 400, error: "Tfg não encontrado" });
      }

      if ( dia_horario !== "" ) {
        const banca = await Banca.update({ 
          id_tcc,
          id_usuario,
          dia_horario
        }, { where: { id_banca } });

        return res.json({ status: 200, banca });
      } else {
        return res.json({ status: 400, error: "Dia e horário não informados" });
      }
    },
    async delete(req, res) {
      const resultsEntries = Test.bancaControllerValidateDeleteEntries(req.params);
        if (resultsEntries) {
          return res.json(resultsEntries);
        }
      const { id_banca } = req.params;

      const banca = await Banca.findByPk(id_banca);

      if (banca) {
        await banca.destroy();

        return res.json({ status: 200, message: "Banca deletada com sucesso" });
      } else {
        return res.json({ status: 400, error: "Banca não encontrado" });
      }
    }
}