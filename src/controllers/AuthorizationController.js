// Este controlador é responsável por fazer a verificação da autenticação
const jwt = require("jsonwebtoken");
const secretToken = "sdaFsadasdaGasdCMySecretKey";

// A função verify é responsável por verificar o token, verificando se ele é existe/não existe e se ele é válido
// A biblioteca utilizada é a "jsonwebtoken" para realizar a verificação do token, utilizando sua própria função
var verify = function (req, res, next) {
  const auth = req.headers.authorization;

  if (auth) {
    jwt.verify(auth, secretToken, (err, verifiedJwt) => {
      if (err) {
        return res.json({ code:400, error: "Token não é válido" , err});
      } else {
        next()
      }
    });
  } else {
    return res.json({ code:400, error: "Você não está autenticado" });
  }
};

module.exports = verify;
