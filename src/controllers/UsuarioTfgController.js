// Neste controlador é realizado todas as funções relacionadas ao usuário tfg
const Tfg = require('../models/Tfg');
const Usuario = require('../models/Usuario');
const FuncaoUsuario = require ('../models/FuncaoUsuario');
const UsuarioTfg = require('../models/UsuarioTfg');
const Test = require('../test/FunctionsTest');

module.exports = {
  // A Função store é responsável por fazer o armazenamento dos dados do usuário tfg
  async store (req, res) {
    const resultsEntries = Test.usuarioTfgControllerValidateStoreEntries(req.body);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    let {
      id_usuario,
      id_tfg,
      id_funcao
    } = req.body;

    const tfg = await Tfg.findByPk(id_tfg);
    const usuario = await Usuario.findByPk(id_usuario);
    const funcao = await FuncaoUsuario.findByPk(id_funcao);

    if ( !tfg ) {
      return res.json({ status: 200, error: "Tfg não foi encontrado" });
    }

    if ( !usuario ) {
      return res.json({ status: 200, error: "Usuário não foi encontrado" });
    }

    if ( !funcao ) {
      return res.json({ status: 200, error: "Função do usuário não foi encontrada" });
    }

    const usuarioTfg = await UsuarioTfg.create ({
      id_usuario,
      id_tfg,
      id_funcao
    })

    return res.json({
      status: 201,
      usuarioTfg
    })
  },
  // A função index é responsável por retornar os dados de um usuário tfg
  async index (req, res) {
    const resultsEntries = Test.usuarioControllerValidateIndexEntries(req.params);
    if (resultsEntries) { 
      return res.json(resultsEntries);
    }  
    const { id_usuarioTfg } = req.params;

    const usuarioTfg = await UsuarioTfg.findByPk(id_usuarioTfg);

    if ( !usuarioTfg ) {
      return res.json({
        status: 400,
        error: "Usuário Tfg não encontrado"
      })
    }

    return res.json({
      status: 200,
      usuarioTfg
    })
  },
  // A função indexAll é responsável por retornar os dados de todos os usuários tcc do sistema
  async indexAll (req, res) {
    const usuariosTfg = await UsuarioTfg.findAll();

    return res.json({
      status: 200,
      usuariosTfg
    })
  },
  // A função update é responsável por realizar o update de um usuário tcc do sistema
  async update (req, res) {
    let {
      id_usuario,
      id_tfg,
      id_funcao
    } = req.body;

    let { id_usuarioTfg } = req.params;

    const usuarioTfg = await UsuarioTfg.findByPk(id_usuarioTfg)

    if ( !usuarioTfg ) {
      return res.json({
        status: 400,
        error: "Usuário tfg não encontrado"
      })
    }

    if (
      id_usuario !== "" &&
      id_tfg !== "" &&
      id_funcao !== ""
    ) {
      usuarioTfg.id_usuario = id_usuario;
      usuarioTfg.id_tfg = id_tfg;
      usuarioTfg.id_funcao = id_funcao;

      await usuarioTfg.save();
    }

    return res.json({ status: 200, message: "Usuário TFG atualizado com sucesso", tfg });
  },
  // A função delete é responsável por realizar o delete de um usuário tcc do sistema
  async delete (req, res) {
    const resultsEntries = Test.usuarioControllerValidateDeleteEntries(req.params);
    if ( resultsEntries ) { 
      return res.json(resultsEntries);
    }
    const { id_usuarioTfg } = req.params;

    const usuarioTfg = await UsuarioTfg.findByPk(id_usuarioTfg);

    if ( !usuarioTfg ) {
      return res.json({
        status: 400,
        error: "Usuário tfg não encontrado"
      })
    }

    await usuarioTfg.destroy();

    return res.json({ status: 204, message: "Usuário TFG deletado com sucesso" });
  }
}

