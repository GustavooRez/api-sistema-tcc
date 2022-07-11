const PerfilProfessorController = require("./FunctionsTest");

describe("Testando Perfil Professor", () => {
    describe("Testing PerfilProfessorController.store", () => {
        test("descricao is missing", () => {
          let data = {
            areas_atuacao: "123",
            link: "123",
            id_usuario: "123",
          };
    
          let res = PerfilProfessorController.perfilProfessorValidateStoreEntries(data);
          expect(res).toEqual({ status: 400, error: "O campo descricao é obrigatório" });
        });
        test("areas_atuacao is missing", () => {
          let data = {
            descricao: "123",
            link: "123",
            id_usuario: "123",
          };
    
          let res = PerfilProfessorController.perfilProfessorValidateStoreEntries(data);
          expect(res).toEqual({ status: 400, error: "O campo areas_atuacao é obrigatório" });
        });
        test("link is missing", () => {
          let data = {
            descricao: "123",
            areas_atuacao: "123",
            id_usuario: "123",
          };
    
          let res = PerfilProfessorController.perfilProfessorValidateStoreEntries(data);
          expect(res).toEqual({ status: 400, error: "O campo link é obrigatório" });
        });
        test("id_usuario is missing", () => {
          let data = {
            descricao: "123",
            areas_atuacao: "123",
            link: "123"
          };
    
          let res = PerfilProfessorController.perfilProfessorValidateStoreEntries(data);
          expect(res).toEqual({ status: 400, error: "O campo id_usuario é obrigatório" });
        });
    })
    describe("Testing PerfilProfessorController.index", () => {
      test("id_perfil_professor is missing", () => {
        let data = {
        };
  
        let res =
        PerfilProfessorController.perfilProfessorControllerValidateIndexEntries(
            data
          );
        expect(res).toEqual({
          status: 400,
          error: "O campo id_perfil_professor é obrigatório",
        });
      });
    });
})