const UniversidadeController = require('./FunctionsTest');

describe("Testando UniversidadeController", () => {
  describe("Testing UniversidadeController.store", () => {
    test("nome is missing", () => {
      let data = {
      };

      let res = UniversidadeController.universidadeControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo nome é obrigatório" });
    })
  });
  describe("Testing UniversidadeController.index", () => {
    test("id_universidade is missing", () => {
      let data = {
      };

      let res = UniversidadeController.universidadeControllerValidateIndexEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_universidade é obrigatório" });
    })
  })
  describe("Testing UniversidadeController.delete", () => {
    test("id_universidade is missing", () => {
      let data = {
      };

      let res = UniversidadeController.universidadeControllerValidateDeleteEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_universidade é obrigatório" });
    })
  })
  describe("Testing UniversidadeController.indexInstitutes", () => {
    test("id_universidade is missing", () => {
      let data = {
      };

      let res = UniversidadeController.universidadeControllerValidateIndexInstitutesEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_universidade é obrigatório" });
    })
  })
})