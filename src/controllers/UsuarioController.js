// Neste controlador é realizado todas as funções relacionadas ao usuário
const Usuario = require("../models/Usuario");
const CodigoProfessor = require("../models/CodigoProfessor");
const Tfg = require("../models/Tfg");
const StatusTfg = require("../models/StatusTfg");
const UsuarioTfg = require("../models/UsuarioTfg");
const Test = require("../test/FunctionsTest");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const secretToken = "sdaFsadasdaGasdCMySecretKey";
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const nodemailer = require("nodemailer");
const { Op } = require("@sequelize/core");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sistematrilhasdeaprendizagem@gmail.com",
    pass: "sistematrilhasdeaprendizagem27",
  },
});

module.exports = {
  // A Função store é responsável por fazer o armazenamento dos dados do usuário
  async store(req, res) {
    const resultsEntries = Test.usuarioControllerValidateStoreEntries(req.body);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    let { nome, telefone, numero, email, senha, codigo, perfil_usuario, curso } =
      req.body;

    let usuario;

    if (
      nome !== "" &&
      telefone !== "" &&
      email !== "" &&
      (numero !== "" || perfil_usuario === 3) &&
      senha !== "" &&
      perfil_usuario !== "" &&
      curso !== ""
    ) {
      if (
        (email.includes("@unifei.edu.br") && perfil_usuario === 1) ||
        (email.includes("@") && (perfil_usuario === 2 || perfil_usuario === 3))
      ) {
        if (senha.length >= 10) {
          const verifyemail = await Usuario.findOne({
            where: { email },
          });

          if (!verifyemail) {
            senha = bcrypt.hashSync(senha, salt);

            if (perfil_usuario == 1) {
              usuario = await Usuario.create({
                nome,
                telefone,
                numero,
                email,
                senha,
                id_curso: curso,
                id_perfil_usuario: 1,
              });
            } else if (perfil_usuario == 2) {
              const verifyCodigo = await CodigoProfessor.findOne({
                where: { codigo, disponivel: 1 },
              });
              if (verifyCodigo) {
                usuario = await Usuario.create({
                  nome,
                  telefone,
                  numero,
                  email,
                  senha,
                  id_curso: curso,
                  id_perfil_usuario: 2,
                });

                verifyCodigo.disponivel = 0;
                await verifyCodigo.save();
              } else {
                return res.json({
                  status: 400,
                  error: "Código não encontrado ou já utilizado",
                });
              }
            } else if (perfil_usuario == 3) {
              usuario = await Usuario.create({
                nome,
                telefone,
                email,
                senha,
                id_curso: curso,
                id_perfil_usuario: 3,
              });
            }

            const accesstoken = jwt.sign({ id: usuario.id }, secretToken, {
              expiresIn: "365d",
            });

            return res.json({ status: 200, usuario, accesstoken });
          } else {
            return res.json({
              status: 400,
              error: "Email já cadastrado no sistema",
            });
          }
        } else {
          return res.json({
            status: 400,
            error: "Senha precisa ter no mínimo 10 caracteres",
          });
        }
      } else {
        if (perfil_usuario == 1) {
          return res.json({
            status: 400,
            error: "Email precisa ser institucional",
          });
        } else if (perfil_usuario == 2) {
          return res.json({ status: 400, error: "Email precisa ser válido" });
        }
      }
    } else {
      return res.json({
        status: 400,
        error: "Preencha os campos obrigatórios",
      });
    }
  },
  // A Função storeCodeProfessor é responsável por fazer o armazenamento e o envio do e-mail ao professor a ser cadastrado
  async storeCodeProfessor(req, res) {
    const resultsEntries =
      Test.usuarioControllerValidateStoreCodeProfessorEntries(req.body);
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    let { perfil_usuario, email } = req.body;

    if (perfil_usuario == 2) {
      const codigo_usuario = Math.floor(Math.random() * 99999) - 0;

      var codigo = await CodigoProfessor.create({
        disponivel: 1,
        codigo: codigo_usuario,
      });

      const mailOptions = {
        from: "Sistema de TFG <sistemadetfg@gmail.com>",
        to: email,
        subject: "Código de acesso ao Sistema Gerenciador de TFG",
        html: `<h3>Olá, professor!</h3>
        <br><p>Este é seu código de acesso para acessar o Sistema Gerenciador de TFG:</p> <h2>${codigo_usuario}</h2>
        <p>Ele pode ser utilizado apenas uma vez, então cuidado!<br><br> <p>Muito obrigado por utilizar o nosso sistema!</p>`,
      };

      // transporter.sendMail(mailOptions);
      return res.json({ status: 200, codigo: codigo_usuario });
    } else {
      return res.json({
        status: 400,
        error: "Tipo de usuário inválido",
      });
    }
  },
  // A função index é responsável por retornar os dados de um usuário
  async index(req, res) {
    const resultsEntries = Test.usuarioControllerValidateIndexEntries(
      req.params
    );
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_usuario } = req.params;

    const usuario = await Usuario.findByPk(id_usuario, {
      attributes: [
        "id",
        "nome",
        "numero",
        "telefone",
        "email",
        "id_perfil_usuario",
        "id_curso"
      ],
    });
    return res.json({ usuario });
  },
  // A função indexAll é responsável por retornar os dados de todos os usuários do sistema
  async indexAll(req, res) {
    const usuarios = await Usuario.findAll({
      attributes: [
        "id",
        "nome",
        "numero",
        "telefone",
        "email",
        "id_perfil_usuario",
        "id_curso"
      ],
    });

    return res.json(usuarios);
  },
  // A função indexAllType é responsável por retornar os dados de todos os usuários do sistema por tipo de usuário
  async indexAllType(req, res) {
    const resultsEntries = Test.usuarioControllerValidateindexAllTypeEntries(
      req.body
    );
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    let { perfil_usuario } = req.body;
    const usuarios = await Usuario.findAll({
      where: { id_perfil_usuario: perfil_usuario },
    });

    return res.json(usuarios);
  },
  // A função indexAllType é responsável por checkar o status do tcc de um aluno
  async checkStatusTcc(req, res) {
    let { id_usuario } = req.params;

    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
      return res.json({ error: "Usuário não foi encontrado" });
    } else {
      const usuarioTfg = await UsuarioTfg.findOne({
        where: { id_usuario, id_funcao: 1 },
      });

      if (!usuarioTfg) {
        return res.json({ error: "O usuário não possui nenhum TCC ativo." });
      } else {
        const tfg = await Tfg.findByPk(usuarioTfg.id_tfg);

        let status = tfg.status;
        const status_tfg = await StatusTfg.findOne({where:{codigo:status}});
        let id = tfg.id;
        
        return res.json({ code: 200, status, id, status_tfg_nome: status_tfg.nome })
      }
    }
  },

  async indexAllTypeWithoutId (req, res) {
    let { perfil_usuario, id_usuario } = req.body;
    const usuarios = await Usuario.findAll({
      where: { id_perfil_usuario: perfil_usuario, id: { [Op.not]: id_usuario } },
    });

    return res.json(usuarios);
  },
  // A função login é responsável por realizar o login e juntamente gerar o token de um usuário
  async login(req, res) {
    let { email, senha } = req.body;

    if (!email || !senha) {
      return res.json({ error: "Email e senha são requeridos" });
    }

    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      return res.json({ error: "Usuário não foi encontrado" });
    } else {
      const accesstoken = jwt.sign({ id: usuario.id }, secretToken, {
        expiresIn: "365d",
      });
      return res.status(200).json({ usuario, accesstoken });
    }
  },
  // A função logout é responsável por realizar o logout de um usuário do sistema
  async logout(req, res) {
    return res.json({ auth: false, token: null });
  },
  // A função update é responsável por realizar o update de um usuário do sistema
  async update(req, res) {
    let { nome, telefone, numero, email, perfil_usuario } = req.body;

    const { id_usuario } = req.params;
    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
      return res.json({ error: "Usuário não foi encontrado" });
    } else {
      if (nome !== "" && telefone !== "" && email !== "") {
        usuario.nome = nome;
        if (perfil_usuario !== 3) {
          usuario.numero = numero;
        }
        usuario.telefone = telefone;
        usuario.email = email;

        await usuario.save();
      } else {
        return res.json({
          status: 400,
          error: "Preencha os campos obrigatórios",
        });
      }
    }

    return res.json({ status: 200, message: "Usuário atualizado com sucesso" });
  },
  // A função delete é responsável por realizar o delete de um usuário do sistema
  async delete(req, res) {
    const resultsEntries = Test.usuarioControllerValidateDeleteEntries(
      req.params
    );
    if (resultsEntries) {
      return res.json(resultsEntries);
    }
    const { id_usuario } = req.params;

    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
      return res.json({ error: "Usuário não foi encontrado" });
    }

    await usuario.destroy();

    return res.json({ message: "Usuário deletado com sucesso" });
  },
};
