const CronogramaController = require('./FunctionsTest');

describe("Testando CronogramaController", () => {
  describe("Testando CronogramaController.store", () => {
    test("id_curso is missing", () => {
      let data = {
        ano: "123",
        semestre: "123"
      };

      let res = CronogramaController.cronogramaControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_curso é obrigatório" });
    });
    test("ano is missing", () => {
      let data = {
        id_curso: 1,
        semestre: "123"
      };

      let res = CronogramaController.cronogramaControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo ano é obrigatório" });
    });
    test("semestre is missing", () => {
      let data = {
        id_curso: 1,
        ano: "123"
      };

      let res = CronogramaController.cronogramaControllerValidateStoreEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo semestre é obrigatório" });
    });
  })
  describe("Testando CronogramaController.index", () => {
    test("id_cronograma is missing", () => {
      let data = {
      };

      let res = CronogramaController.cronogramaControllerValidateIndexEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_cronograma é obrigatório" });
    })
  })
  describe("Testando CronogramaController.indexActivities", () => {
    test("id_cronograma is missing", () => {
      let data = {
      };

      let res = CronogramaController.cronogramaControllerValidateIndexActivitiesEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_cronograma é obrigatório" });
    })
  });
  describe("Testando CronogramaController.dekete", () => {
    test("id_cronograma is missing", () => {
      let data = {
      };

      let res = CronogramaController.cronogramaControllerValidateDeleteEntries(data);
      expect(res).toEqual({ status: 400, error: "O campo id_cronograma é obrigatório" });
    })
  })
});