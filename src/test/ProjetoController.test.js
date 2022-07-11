const ProjetoController = require("./FunctionsTest");

describe("Testando Perfil Professor", () => {
    describe("Testing ProjetoController.store", () => {
        test("titulo is missing", () => {
          let data = {
            descricao: "123",
            disponivel: "123",
            id_perfil_professor: "123",
          };
    
          let res = ProjetoController.projetoValidateStoreEntries(data);
          expect(res).toEqual({ status: 400, error: "O campo titulo é obrigatório" });
        });
        test("descricao is missing", () => {
          let data = {
            titulo: "123",
            disponivel: "123",
            pre_requisito: "123",
            id_perfil_professor: "123",
          };
    
          let res = ProjetoController.projetoValidateStoreEntries(data);
          expect(res).toEqual({ status: 400, error: "O campo descricao é obrigatório" });
        });
        test("disponivel is missing", () => {
          let data = {
            titulo: "123",
            descricao: "123",
            pre_requisito: "123",
            id_perfil_professor: "123",
          };
    
          let res = ProjetoController.projetoValidateStoreEntries(data);
          expect(res).toEqual({ status: 400, error: "O campo disponivel é obrigatório" });
        });
        test("pre_requisito is missing", () => {
          let data = {
            titulo: "123",
            descricao: "123",
            id_perfil_professor: "123",
            disponivel: "123"
          };
    
          let res = ProjetoController.projetoValidateStoreEntries(data);
          expect(res).toEqual({ status: 400, error: "O campo pre_requisito é obrigatório" });
        });
        test("id_perfil_professor is missing", () => {
          let data = {
            titulo: "123",
            descricao: "123",
            pre_requisito: "123",
            disponivel: "123"
          };
    
          let res = ProjetoController.projetoValidateStoreEntries(data);
          expect(res).toEqual({ status: 400, error: "O campo id_perfil_professor é obrigatório" });
        });
    })
    describe("Testing ProjetoController.index", () => {
      test("id_projeto is missing", () => {
        let data = {
        };
  
        let res =
        ProjetoController.projetoControllerValidateIndexEntries(
            data
          );
        expect(res).toEqual({
          status: 400,
          error: "O campo id_projeto é obrigatório",
        });
      });
    });
})