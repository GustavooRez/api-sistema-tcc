const CursoController = require('./FunctionsTest')

describe("Testando CursoController", () => {
  describe("Testando CursoController.store", () => {
    test("nome is missing", () => {
      let data = {
        id_instituto: 1,
        codigo: "123"
      };

      let res = CursoController.cursoControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo nome é obrigatório" });
    });
    test("id_instituto is missing", () => {
      let data = {
        nome: "123",
        codigo: "123"
      };

      let res = CursoController.cursoControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_instituto é obrigatório" });
    });
    test("codigo is missing", () => {
      let data = {
        nome: "123",
        id_instituto: 1
      };

      let res = CursoController.cursoControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo codigo é obrigatório" });
    })
  });
  describe("Testando CursoController.index", () => {
    test("id_curso is missing", () => {
      let data = {
      };

      let res = CursoController.cursoControllerValidateIndexEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_curso é obrigatório" });
    })
  });
  describe("Testando CursoController.delete", () => {
    test("id_curso is missing", () => {
      let data = {
      };

      let res = CursoController.cursoControllerValidateDeleteEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_curso é obrigatório" });
    })
  })
  describe("Testando CursoController.indexTimelines", () => {
    test("id_curso is missing", () => {
      let data = {
      };

      let res = CursoController.cursoControllerValidateIndexTimelinesEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_curso é obrigatório" });
    })
  })
})