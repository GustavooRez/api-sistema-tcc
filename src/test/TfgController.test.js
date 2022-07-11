const TfgController = require('./FunctionsTest');

describe('Testando TFG', () => {
  describe('Testing TfgController.sotre', () => {
    test("titulo is missing", () => {
      let data = {
        palavras_chave: "123",
        introducao: "123",
        objetivos: "123",
        bibliografia: "123",
      };

      let res = TfgController.tfgControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo titulo é obrigatório" });
    });
    test("palavras_chave is missing", () => {
      let data = {
        titulo: "123",
        introducao: "123",
        objetivos: "123",
        bibliografia: "123",
      };

      let res = TfgController.tfgControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo palavras_chave é obrigatório" });
    });
    test("introducao is missing", () => {
        let data = {
          titulo: "123",
          palavras_chave: "123",
          objetivos: "123",
          bibliografia: "123",
        };

        let res = TfgController.tfgControllerValidateStoreEntries(data);
        expect(res).toEqual({ status: 400, error: "O campo introducao é obrigatório" });
    });
    test("objetivos is missing", () => {
        let data = {
          titulo: "123",
          palavras_chave: "123",
          introducao: "123",
          bibliografia: "123",
        };

        let res = TfgController.tfgControllerValidateStoreEntries(data);
        expect(res).toEqual({ status: 400, error: "O campo objetivos é obrigatório" });
    });
    test("bibliografia is missing", () => {
        let data = {
          titulo: "123",
          palavras_chave: "123",
          introducao: "123",
          objetivos: "123",
        };
        
        let res = TfgController.tfgControllerValidateStoreEntries(data);
        expect(res).toEqual({ status: 400, error: "O campo bibliografia é obrigatório" });
    });
  });
});
  describe("Testing TfgController.index", () => {
    test("id_tfg is missing", () => {
      let data = {};

      let res = TfgController.tfgControllerValidateIndexEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_tfg é obrigatório" });
    });
  });
  describe("Testing TfgController.delete", () => {
    test("id_tfg is missing", () => {
      let data = {};

      let res = TfgController.tfgControllerValidateDeleteEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_tfg é obrigatório" });
    });
  });
  describe("Testing TfgController.updateStatus", () => {
    test("id_tfg is missing", () => {
      let data2 = {
        status_tfg: "matricula_realizada"
      };

      let data1 = {};

      let res = TfgController.tfgControllerValidateUpdateStatusEntries(data1, data2);
      expect(res).toEqual({ status: 400, error: "O campo id_tfg é obrigatório" });
    });
    test("status is missing", () => {
      let data1 = {
        id_tfg: 12
      };

      let data2 = {};

      let res = TfgController.tfgControllerValidateUpdateStatusEntries(data1, data2);
      expect(res).toEqual({ status: 400, error: "O campo status_tfg é obrigatório" });
    });
    describe("Testing TfgController.statusOrientation", () => {
      test("id_usuario is missing", () => {
        let data = {};
  
        let res = TfgController.tfgControllerValidateStatusOrientationEntries(data);
        expect(res).toEqual({ status: 400, error: "O campo id_usuario é obrigatório" });
      });
    });
  });
