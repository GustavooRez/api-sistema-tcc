const AtividadeController = require('./FunctionsTest')

describe("Testando AtividadeController", () => {
  describe("Testing AtividadeController.store", () => {
    test("data is missing", () => {
      let data = {
        titulo: "Teste",
        descricao: "Teste",
        id_cronograma: 1
      };
      
      let res = AtividadeController.atividadeControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo data é obrigatório" });
    });
    test("descricao is missing", () => {
      let data = {
        data: "2020-01-01",
        titulo: "Teste",
        id_cronograma: 1
      };
      
      let res = AtividadeController.atividadeControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo descricao é obrigatório" });
    });
    test("titulo is missing", () => {
      let data = {
        data: "2020-01-01",
        descricao: "Teste",
        id_cronograma: 1
      };
      
      let res = AtividadeController.atividadeControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo titulo é obrigatório" });
    });
    test("id_cronograma is missing", () => {
      let data = {
        data: "2020-01-01",
        titulo: "Teste",
        descricao: "Teste"
      };
      
      let res = AtividadeController.atividadeControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_cronograma é obrigatório" });
    });
  })
  describe("Testing AtividadeController.index", () => {
    test("id_atividade is missing", () => {
      let data = {
      };
      
      let res = AtividadeController.atividadeControllerValidateIndexEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_atividade é obrigatório" });
    });
  })
  describe("Testing AtividadeController.delete", () => {
    test("id_atividade is missing", () => {
      let data = {
      };
      
      let res = AtividadeController.atividadeControllerValidateDeleteEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_atividade é obrigatório" });
    });
  })
})