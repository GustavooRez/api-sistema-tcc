const UsuarioTfgController = require('./FunctionsTest');

describe('Testando UsuarioTfg', () => {
  describe('Testing UsuarioTfgController.store', () => {
    test("id_usuario is missing", () => {
      let data = {
        id_tfg: 123,
        id_funcao: 123
      };

      let res = UsuarioTfgController.usuarioTfgControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_usuario é obrigatório" });
    });
    test("id_tfg is missing", () => {
      let data = {
        id_usuario: 123,
        id_funcao: 123
      }

      let res = UsuarioTfgController.usuarioTfgControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_tfg é obrigatório" });
  })
    test("id_funcao is missing", () => {
      let data = {
        id_usuario: 123,
        id_tfg: 123
      }

      let res = UsuarioTfgController.usuarioTfgControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_funcao é obrigatório" });
    });
  });
  describe("Testing UsuarioTfgController.index", () => {
    test("id_usuarioTfg is missing", () => {
      let data = {};

      let res = UsuarioTfgController.usuarioTfgControllerValidateIndexEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_usuarioTfg é obrigatório" });
    });
  });
  describe("Testing UsuarioTfgController.delete", () => {
    test("id_usuarioTfg is missing", () => {
      let data = {};

      let res = UsuarioTfgController.usuarioTfgControllerValidateDeleteEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_usuarioTfg é obrigatório" });
    })
  });
});
