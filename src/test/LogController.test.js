// @ts-nocheck
const LogsController = require("./FunctionsTest");

describe("Testando Log", () => {
    describe("Testing LogController.index", () => {
      test("id_usuario is missing", () => {
        let data = {
        };
  
        let res =
            LogsController.logControllerValidateIndexEntries(
            data
          );
        expect(res).toEqual({
          status: 400,
          error: "O campo id_usuario é obrigatório",
        });
      });
    });
    describe("Testing LogController.store", () => {
      test("id_usuario is missing", () => {
        let data = {
            acao: "123"
        };
  
        let res =
            LogsController.logControllerValidateIndexEntries(
            data
          );
        expect(res).toEqual({
          status: 400,
          error: "O campo id_usuario é obrigatório",
        });
      });
      test("acao is missing", () => {
        let data = {
            id_usuario: "123",
        };
  
        let res =
            LogsController.logControllerValidateStoreEntries(
            data
          );
        expect(res).toEqual({
          status: 400,
          error: "O campo acao é obrigatório",
        });
      });
    });
});