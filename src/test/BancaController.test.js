const BancaController = require('./FunctionsTest')

describe("Testando BancaController", () => {
  describe("Testing BancaController.store", () => {
    test("id_tfg is missing", () => {
      let data = {
        id_usuario: 1,
        dia_horario: "123"
      };

      let res = BancaController.bancaControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_tfg é obrigatório" });
    });
    test("id_usuario is missing", () => {
      let data = {
        id_tfg: 1,
        dia_horario: "123"
      };

      let res = BancaController.bancaControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_usuario é obrigatório" });
    });
    test("dia_horario is missing", () => {
      let data = {
        id_tfg: 1,
        id_usuario: 1
      };

      let res = BancaController.bancaControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo dia_horario é obrigatório" });
    })
  });
  describe("Testing BancaController.index", () => {
    test("id_banca is missing", () => {
      let data = {
      };

      let res = BancaController.bancaControllerValidateIndexEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_banca é obrigatório" });
    })
  });
  describe("Testing BancaController.delete", () => {
    test("id_banca is missing", () => {
      let data = {
      };

      let res = BancaController.bancaControllerValidateDeleteEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_banca é obrigatório" });
    })
  })
})