// Neste controlador é realizado todas as funções relacionadas ao Tcc
const Tfg = require("../models/Tfg");
const UsuarioTfg = require("../models/UsuarioTfg");
const Test = require("../test/FunctionsTest");
const { QueryTypes } = require("sequelize");
const Sequelize = require("sequelize");
var crypto = require("crypto");
var cypherKey = "asdjah12312fsahuida";
const dbConfig = require("../config/database");
const Usuario = require("../models/Usuario");
const sequelize = new Sequelize(dbConfig);
module.exports = {
  // A Função store é responsável por fazer o armazenamento do Tcc
  async store(req, res) {
    const resultsEntries = Test.tfgControllerValidateStoreEntries(req.body);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    let {
      titulo,
      palavras_chave,
      introducao,
      objetivos,
      bibliografia,
      metodologia,
      resultados,
    } = req.body;

    if (
      titulo !== "" &&
      palavras_chave !== "" &&
      introducao !== "" &&
      objetivos !== "" &&
      bibliografia !== "" &&
      metodologia !== "" &&
      resultados !== ""
    ) {
      let tfg;

      tfg = await Tfg.create({
        titulo,
        palavras_chave,
        introducao,
        objetivos,
        bibliografia,
        metodologia,
        resultados,
        status: "matricula_realizada",
      });

      return res.json({
        status: 200,
        tfg,
      });
    } else {
      return res.json({
        status: 400,
        error: "Preencha os campos obrigatórios",
      });
    }
  },
  // A Função index é responsável por retornar todos os dados referentes à um TCC
  async index(req, res) {
    const resultsEntries = Test.tfgControllerValidateIndexEntries(req.params);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_tfg } = req.params;

    const tfg = await Tfg.findByPk(id_tfg, {
      attributes: [
        "titulo",
        "palavras_chave",
        "introducao",
        "objetivos",
        "bibliografia",
        "metodologia",
        "resultados",
        "status",
      ],
    });

    if (!tfg) {
      return res.json({
        status: 400,
        error: "Tfg não encontrado",
      });
    } else {
      return res.json({
        status: 200,
        tfg,
      });
    }
  },
  // A Função indexAll é responsável por retornar todos os Tccs do sistema
  async indexAll(req, res) {
    const tfgs = await Tfg.findAll();

    return res.json(tfgs);
  },
  // A Função update é responsável por realizar o update de um Tcc
  async update(req, res) {
    let {
      titulo,
      palavras_chave,
      introducao,
      objetivos,
      bibliografia,
      metodologia,
      resultados,
    } = req.body;

    const { id_tfg } = req.params;

    const tfg = await Tfg.findByPk(id_tfg);

    if (!tfg) {
      return res.json({
        status: 400,
        error: "Tfg não encontrado",
      });
    } else {
      if (
        titulo !== "" &&
        palavras_chave !== "" &&
        introducao !== "" &&
        objetivos !== "" &&
        bibliografia !== "" &&
        metodologia !== "" &&
        resultados !== ""
      ) {
        tfg.titulo = titulo;
        tfg.palavras_chave = palavras_chave;
        tfg.introducao = introducao;
        tfg.objetivos = objetivos;
        tfg.bibliografia = bibliografia;
        tfg.metodologia = metodologia;
        tfg.resultados = resultados;

        await tfg.save();

        return res.json({
          status: 200,
          message: "TFG atualizado com sucesso",
          tfg,
        });
      } else {
        return res.json({
          status: 400,
          error: "Preencha os campos necessários",
          tfg,
        });
      }
    }
  },
  // A Função updateStatus é responsável por realizar o update do status de um Tcc
  async updateStatus(req, res) {
    const resultsEntries = Test.tfgControllerValidateUpdateStatusEntries(
      (data1 = req.params),
      (data2 = req.body)
    );
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { status_tfg } = req.body;
    const { id_tfg } = req.params;

    const tfg = await Tfg.findByPk(id_tfg);

    if (!tfg) {
      return res.json({
        status: 400,
        error: "Tfg não encontrado",
      });
    }

    tfg.status = status_tfg;

    await tfg.save();

    return res.json({
      status: 200,
      message: "TFG atualizado com sucesso",
      tfg,
    });
  },
  // A Função delete é responsável por realizar o delete de um Tcc
  async delete(req, res) {
    const resultsEntries = Test.tfgControllerValidateDeleteEntries(req.params);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_tfg } = req.params;

    const tfg = await Tfg.findByPk(id_tfg);

    if (!tfg) {
      return res.json({
        status: 400,
        error: "Tfg não encontrado",
      });
    }

    await tfg.destroy();

    return res.json({ status: 204, message: "TFG deletado com sucesso" });
  },
  // A função statusOrientation é responsável por trazer os dados dos TCC de um orientador que estejam no status de aprovar/rejeitar orientação
  async statusOrientation(req, res) {
    const resultsEntries = Test.tfgControllerValidateStatusOrientationEntries(
      req.params
    );
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_usuario } = req.params;

    const usuariosTfg = await UsuarioTfg.findAll({
      where: {
        id_usuario,
        id_funcao: 2,
      },
    });

    let idstfgs = [];
    usuariosTfg.forEach((usuariotfg) => {
      idstfgs.push(usuariotfg.id_tfg);
    });
    if (idstfgs.length !== 0) {
      var resultsTfg = await sequelize.query(
        'SELECT Usuario.nome, Tfg.id FROM tfg as Tfg INNER JOIN usuario_tfg as UsuarioTfg ON Tfg.id = UsuarioTfg.id_tfg INNER JOIN usuario as Usuario ON UsuarioTfg.id_usuario = Usuario.id WHERE Tfg.id IN (:ids) AND UsuarioTfg.id_funcao = 1 AND Tfg.status = "matricula_realizada"',
        {
          replacements: { ids: idstfgs },
          type: QueryTypes.SELECT,
        }
      );
      if (resultsTfg.length !== 0) {
        return res.json({ status: 200, resultsTfg });
      } else {
        return res.json({
          status: 201,
          message: "Não foram encontrados orientações",
        });
      }
    } else {
      return res.json({
        status: 201,
        message: "Não foram encontrados orientações",
      });
    }
  },
  // A função statusParcialOrientation é responsável por trazer os dados dos TCC de um orientador que estejam no status para ser realizada a avalição parcial
  async statusParcialOrientation(req, res) {
    const resultsEntries =
      Test.tfgControllerValidateStatusPartialOrientationEntries(req.params);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_usuario } = req.params;

    const usuariosTfg = await UsuarioTfg.findAll({
      where: {
        id_usuario,
        id_funcao: 2,
      },
    });

    let idstfgs = [];
    usuariosTfg.forEach((usuariotfg) => {
      idstfgs.push(usuariotfg.id_tfg);
    });
    if (idstfgs.length !== 0) {
      var resultsTfg = await sequelize.query(
        'SELECT Usuario.nome, Tfg.id FROM tfg as Tfg INNER JOIN usuario_tfg as UsuarioTfg ON Tfg.id = UsuarioTfg.id_tfg INNER JOIN usuario as Usuario ON UsuarioTfg.id_usuario = Usuario.id WHERE Tfg.id IN (:ids) AND UsuarioTfg.id_funcao = 1 AND Tfg.status = "tfg_parcial_enviado"',
        {
          replacements: { ids: idstfgs },
          type: QueryTypes.SELECT,
        }
      );
      if (resultsTfg.length !== 0) {
        return res.json({ status: 200, resultsTfg });
      } else {
        return res.json({
          status: 201,
          message: "Não foram encontrados orientações neste status",
        });
      }
    } else {
      return res.json({
        status: 201,
        message: "Não foram encontrados orientações neste status",
      });
    }
  },
  // A Função storePartialTcc é responsável por armazenar a nota parcial de um Tcc
  async storePartialTcc(req, res) {
    const resultsEntries = Test.tfgControllerValidateStorePartialTccEntries(
      req.params,
      req.body
    );
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    var { nota } = req.body;
    const { id_tcc } = req.params;

    const tcc = await Tfg.findByPk(id_tcc);

    if (!tcc) {
      return res.json({
        status: 400,
        error: "Tcc não encontrado",
      });
    }
    var status_tfg;
    if (parseFloat(nota) >= 6) {
      status_tfg = "tfg_parcial_aprovado";
    } else {
      status_tfg = "tfg_parcial_reprovado";
    }

    tcc.status = status_tfg;

    // Encriptando a nota
    var cipher = crypto.createCipher("aes-256-cbc", cypherKey);
    var nota_crypted = cipher.update(nota, "utf8", "hex");
    nota_crypted += cipher.final("hex");
    tcc.nota_parcial = nota_crypted;

    await tcc.save();

    // Desencriptando a nota pra quando precisar
    var decipher = crypto.createDecipher("aes-256-cbc", cypherKey);
    var dec = decipher.update(tcc.nota_parcial, "hex", "utf8");
    dec += decipher.final("utf8");

    return res.json({
      status: 200,
      message: "TCC atualizado com sucesso",
      tcc,
    });
  },
  // A função searchUserRegistration é responsável por trazer os dados dos TCC que estejam aguardando matrícula
  async searchUserRegistration(req, res) {
    const resultsEntries =
      Test.tfgControllerValidateStatusPartialOrientationEntries(req.params);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_usuario } = req.params;

    const usuarioCoordenador = await Usuario.findByPk(id_usuario);

    var resultsTfg = await sequelize.query(
      `SELECT Usuario.nome, Tfg.id FROM tfg as Tfg 
        INNER JOIN usuario_tfg as UsuarioTfg ON Tfg.id = UsuarioTfg.id_tfg 
        INNER JOIN usuario as Usuario ON UsuarioTfg.id_usuario = Usuario.id 
        WHERE UsuarioTfg.id_funcao = 1 AND Tfg.status = "matricula_realizada" AND Usuario.id_curso =:id_curso`,
      {
        replacements: { id_curso: usuarioCoordenador.id_curso },
        type: QueryTypes.SELECT,
      }
    );
    if (resultsTfg.length !== 0) {
      return res.json({ status: 200, resultsTfg });
    } else {
      return res.json({
        status: 201,
        message: "Não foram encontrados matriculas",
      });
    }
  },
  // A função searchUserRegistration é responsável por trazer os dados dos TCC que estejam aguardando registro
  async searchUserRecord(req, res) {
    const resultsEntries =
      Test.tfgControllerValidateStatusPartialOrientationEntries(req.params);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_usuario } = req.params;

    const usuarioCoordenador = await Usuario.findByPk(id_usuario);

    var resultsTfg = await sequelize.query(
      `SELECT Usuario.nome, Tfg.id FROM tfg as Tfg 
        INNER JOIN usuario_tfg as UsuarioTfg ON Tfg.id = UsuarioTfg.id_tfg 
        INNER JOIN usuario as Usuario ON UsuarioTfg.id_usuario = Usuario.id 
        WHERE UsuarioTfg.id_funcao = 1 AND Tfg.status = "registro_de_projeto_realizado" AND Usuario.id_curso =:id_curso`,
      {
        replacements: { id_curso: usuarioCoordenador.id_curso },
        type: QueryTypes.SELECT,
      }
    );
    if (resultsTfg.length !== 0) {
      return res.json({ status: 200, resultsTfg });
    } else {
      return res.json({
        status: 201,
        message: "Não foram encontrados registros",
      });
    }
  },
  async searchOrientadorId(req, res) {
    const { id_tfg } = req.params;

    const tfg = await Tfg.findByPk(id_tfg);

    var resultsTfg = await sequelize.query(
      `SELECT Usuario.id FROM tfg as Tfg 
        INNER JOIN usuario_tfg as UsuarioTfg ON Tfg.id = UsuarioTfg.id_tfg 
        INNER JOIN usuario as Usuario ON UsuarioTfg.id_usuario = Usuario.id 
        WHERE UsuarioTfg.id_funcao = 2 AND Tfg.id =:id_tfg`,
      {
        replacements: { id_tfg },
        type: QueryTypes.SELECT,
      }
    );
    if (resultsTfg.length !== 0) {
      return res.json({ status: 200, resultsTfg });
    } else {
      return res.json({
        status: 201,
        message: "Não foram encontrados registros",
      });
    }
  }
};
