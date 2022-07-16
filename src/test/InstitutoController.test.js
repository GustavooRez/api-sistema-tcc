const InstitutoController = require('./FunctionsTest');

describe("Testando InstitutoController", () => {
  describe("Testing InstitutoController.store", () => {
    test("nome is missing", () => {
      let data = {
        id_universidade: 1,
      };

      let res = InstitutoController.institutoControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo nome é obrigatório" });
    });
    test("id_universidade is missing", () => {
      let data = {
        nome: "123",
      };

      let res = InstitutoController.institutoControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_universidade é obrigatório" });
    })
  })
  describe("Testing InstitutoController.index", () => {
    test("id_instituto is missing", () => {
      let data = {
      };

      let res = InstitutoController.institutoControllerValidateIndexEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_instituto é obrigatório" });
    })
  });
  describe("Testing InstitutoController.delete", () => {
    test("id_instituto is missing", () => {
      let data = {
      };

      let res = InstitutoController.institutoControllerValidateDeleteEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_instituto é obrigatório" });
    })
  });
  describe("Testing InstitutoController.indexInstitutes", () => {
    test("id_instituto is missing", () => {
      let data = {
      };

      let res = InstitutoController.institutoControllerValidateIndexCoursesEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_instituto é obrigatório" });
    })
  })
})