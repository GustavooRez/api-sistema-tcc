// @ts-nocheck
const UsuarioController = require("./FunctionsTest");

describe("Testando usuário", () => {
  describe("Testing UsuarioController.store", () => {
    test("store é vazio", () => {
      let data = {
        telefone: "123",
        email: "123",
        senha: "123",
        perfil_usuario: "123",
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo nome é obrigatório" });
    });
    test("telefone é vazio", () => {
      let data = {
        nome: "123",
        email: "123",
        senha: "123",
        perfil_usuario: "123",
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo telefone é obrigatório",
      });
    });
    test("email é vazio", () => {
      let data = {
        nome: "123",
        telefone: "123",
        senha: "123",
        perfil_usuario: "123",
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo email é obrigatório",
      });
    });
    test("senha é vazio", () => {
      let data = {
        nome: "123",
        telefone: "123",
        email: "123",
        perfil_usuario: "123",
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo senha é obrigatório",
      });
    });
    test("perfil_usuario é vazio", () => {
      let data = {
        nome: "123",
        telefone: "123",
        email: "123",
        senha: "123",
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo perfil_usuario é obrigatório",
      });
    });
    test("curso é vazio", () => {
      let data = {
        nome: "123",
        telefone: "123",
        email: "123",
        senha: "123",
        perfil_usuario: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo curso é obrigatório",
      });
    });
    test("nome tem menos de 10 caracteres", () => {
      let data = {
        nome: "123",
        telefone: "123",
        email: "123",
        senha: "123",
        perfil_usuario: "123",
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo nome precisa ter no mínimo 10 caracteres",
      });
    });
    test("telefone tem menos de 11 caracteres", () => {
      let data = {
        nome: "Teste nome usuario",
        telefone: "123",
        email: "123",
        senha: "123",
        perfil_usuario: "123",
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo telefone precisa ter no mínimo 11 caracteres",
      });
    });
    test("email precisa ser válido", () => {
      let data = {
        nome: "Teste nome usuario",
        telefone: "35123456789",
        email: "123",
        senha: "123",
        perfil_usuario: "123",
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo email precisa ser válido",
      });
    });
    test("email precisa ser institucional", () => {
      let data = {
        nome: "Teste nome usuario",
        telefone: "35123456789",
        email: "email@email.com",
        senha: "123",
        perfil_usuario: 1,
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo email precisa ser institucional (unifei.edu.br)",
      });
    });
    test("senha precisa ter no mínimo 10 caracteres", () => {
      let data = {
        nome: "Teste nome usuario",
        telefone: "35123456789",
        email: "email@unifei.edu.br",
        senha: "123",
        perfil_usuario: 1,
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo senha precisa ter no mínimo 10 caracteres",
      });
    });
    test("senha precisa ter um caractere minusculo", () => {
      let data = {
        nome: "Teste nome usuario",
        telefone: "35123456789",
        email: "email@unifei.edu.br",
        senha: "1234567890",
        perfil_usuario: 1,
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo senha precisa ter um caractere minusculo",
      });
    });
    test("senha precisa ter um caractere maiusculo", () => {
      let data = {
        nome: "Teste nome usuario",
        telefone: "35123456789",
        email: "email@unifei.edu.br",
        senha: "a1234567890",
        perfil_usuario: 1,
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo senha precisa ter um caractere maiusculo",
      });
    });
    test("senha precisa ter um caractere numerico", () => {
      let data = {
        nome: "Teste nome usuario",
        telefone: "35123456789",
        email: "email@unifei.edu.br",
        senha: "senhaSENHA",
        perfil_usuario: 1,
        curso: "123"
      };

      let res = UsuarioController.usuarioControllerValidateStoreEntries(data);
      expect(res).toEqual({
        status: 400,
        error: "O campo senha precisa ter um caractere numerico",
      });
    });
  });
  describe("Testing UsuarioController.storeCodeProfessor", () => {
    test("perfil_usuario is missing", () => {
      let data = {
        email: "123",
      };

      let res =
        UsuarioController.usuarioControllerValidateStoreCodeProfessorEntries(
          data
        );
      expect(res).toEqual({
        status: 400,
        error: "O campo perfil_usuario é obrigatório",
      });
    });
    test("email is missing", () => {
      let data = {
        perfil_usuario: "123",
      };

      let res =
        UsuarioController.usuarioControllerValidateStoreCodeProfessorEntries(
          data
        );
      expect(res).toEqual({
        status: 400,
        error: "O campo email é obrigatório",
      });
    });
  });
  describe("Testing UsuarioController.index", () => {
    test("id_usuario is missing", () => {
      let data = {
      };

      let res =
        UsuarioController.usuarioControllerValidateIndexEntries(
          data
        );
      expect(res).toEqual({
        status: 400,
        error: "O campo id_usuario é obrigatório",
      });
    });
  });
  describe("Testing UsuarioController.indexAllType", () => {
    test("perfil_usuario is missing", () => {
      let data = {
      };

      let res =
        UsuarioController.usuarioControllerValidateindexAllTypeEntries(
          data
        );
      expect(res).toEqual({
        status: 400,
        error: "O campo perfil_usuario é obrigatório",
      });
    });
  });
  describe("Testing UsuarioController.delete", () => {
    test("id_usuario is missing", () => {
      let data = {
      };

      let res =
        UsuarioController.usuarioControllerValidateDeleteEntries(
          data
        );
      expect(res).toEqual({
        status: 400,
        error: "O campo id_usuario é obrigatório",
      });
    });
  });
});
