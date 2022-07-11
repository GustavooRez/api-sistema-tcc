// Todas as funções de testes unitários do sistema
class Test{
    static usuarioControllerValidateStoreEntries(data) {
        if (!('nome' in data)) return {status: 400,error: "O campo nome é obrigatório"};
        if (!('telefone' in data)) return {status: 400,error: "O campo telefone é obrigatório"};
        if (!('email' in data)) return {status: 400,error: "O campo email é obrigatório"};
        if (!('senha' in data)) return {status: 400,error: "O campo senha é obrigatório"};
        if (!('perfil_usuario' in data)) return {status: 400,error: "O campo perfil_usuario é obrigatório"};
        if (!('curso' in data)) return {status: 400,error: "O campo curso é obrigatório"};
        if (data.nome.length < 10) return {status: 400,error: "O campo nome precisa ter no mínimo 10 caracteres"};
        if (data.telefone.length < 11) return {status: 400,error: "O campo telefone precisa ter no mínimo 11 caracteres"};
        if (!data.email.includes("@")) return {status: 400,error: "O campo email precisa ser válido"};
        if (data.perfil_usuario == 1 && !data.email.includes("@unifei.edu.br")) return {status: 400,error: "O campo email precisa ser institucional (unifei.edu.br)"};
        if (data.senha.length < 10) return {status: 400,error: "O campo senha precisa ter no mínimo 10 caracteres"};
        if (!(/[a-z]/.test(data.senha))) return {status: 400,error: "O campo senha precisa ter um caractere minusculo"};
        if (!(/[A-Z]/.test(data.senha))) return {status: 400,error: "O campo senha precisa ter um caractere maiusculo"};
        if (!(/[0-9]/.test(data.senha))) return {status: 400,error: "O campo senha precisa ter um caractere numerico"};
        return;
    }
    static usuarioControllerValidateStoreCodeProfessorEntries(data) {
        if (!('perfil_usuario' in data)) return {status: 400,error: "O campo perfil_usuario é obrigatório"};
        if (!('email' in data)) return {status: 400,error: "O campo email é obrigatório"};
        return;
    }
    static usuarioControllerValidateIndexEntries(data) {
        if (!('id_usuario' in data)) return {status: 400,error: "O campo id_usuario é obrigatório"};
        return;
    }
    static usuarioControllerValidateindexAllTypeEntries(data) {
        if (!('perfil_usuario' in data)) return {status: 400,error: "O campo perfil_usuario é obrigatório"};
        return;
    }
    static usuarioControllerValidateDeleteEntries(data) {
        if (!('id_usuario' in data)) return {status: 400,error: "O campo id_usuario é obrigatório"};
        return;
    }
    static logControllerValidateIndexEntries(data) {
        if (!('id_usuario' in data)) return {status: 400,error: "O campo id_usuario é obrigatório"};
        return;
    }
    static logControllerValidateStoreEntries(data) {
        if (!('id_usuario' in data)) return {status: 400,error: "O campo id_usuario é obrigatório"};
        if (!('acao' in data)) return {status: 400,error: "O campo acao é obrigatório"};
        return;
    }
    static tfgControllerValidateStoreEntries(data) {
        if (!('titulo' in data)) return {status: 400,error: "O campo titulo é obrigatório"};
        if (!('palavras_chave' in data)) return {status: 400,error: "O campo palavras_chave é obrigatório"};
        if (!('introducao' in data)) return {status: 400,error: "O campo introducao é obrigatório"};
        if (!('objetivos' in data)) return {status: 400,error: "O campo objetivos é obrigatório"};
        if (!('bibliografia' in data)) return {status: 400,error: "O campo bibliografia é obrigatório"};
    }
    static tfgControllerValidateIndexEntries(data) {
        if (!('id_tfg' in data)) return {status: 400,error: "O campo id_tfg é obrigatório"};
        return;
    }
    static tfgControllerValidateDeleteEntries(data) {
        if (!('id_tfg' in data)) return {status: 400,error: "O campo id_tfg é obrigatório"};
        return;
    }
    static tfgControllerValidateUpdateStatusEntries(data1, data2) {
        if (!('id_tfg' in data1)) return {status: 400,error: "O campo id_tfg é obrigatório"};
        if (!('status_tfg' in data2)) return {status: 400,error: "O campo status_tfg é obrigatório"};
        return;
    }
    static usuarioTfgControllerValidateStoreEntries(data) {
        if (!('id_tfg' in data)) return {status: 400,error: "O campo id_tfg é obrigatório"};
        if (!('id_usuario' in data)) return {status: 400,error: "O campo id_usuario é obrigatório"};
        if (!('id_funcao' in data)) return {status: 400,error: "O campo id_funcao é obrigatório"};
        return;
    }
    static usuarioTfgControllerValidateIndexEntries(data) {
        if (!('id_usuarioTfg' in data)) return {status: 400,error: "O campo id_usuarioTfg é obrigatório"};
        return;
    }
    static usuarioTfgControllerValidateDeleteEntries(data) {
        if (!('id_usuarioTfg' in data)) return {status: 400,error: "O campo id_usuarioTfg é obrigatório"};
        return;
    }
    static perfilProfessorValidateStoreEntries(data) {
        if (!('descricao' in data)) return {status: 400,error: "O campo descricao é obrigatório"};
        if (!('areas_atuacao' in data)) return {status: 400,error: "O campo areas_atuacao é obrigatório"};
        if (!('link' in data)) return {status: 400,error: "O campo link é obrigatório"};
        if (!('id_usuario' in data)) return {status: 400,error: "O campo id_usuario é obrigatório"};
        return;
    }
    static perfilProfessorControllerValidateIndexEntries(data) {
        if (!('id_perfil_professor' in data)) return {status: 400,error: "O campo id_perfil_professor é obrigatório"};
        return;
    }
    static perfilProfessorControllerValidateIndexUserEntries(data) {
        if (!('id_usuario' in data)) return {status: 400,error: "O campo id_usuario é obrigatório"};
        return;
    }
    static projetoValidateStoreEntries(data) {
        if (!('titulo' in data)) return {status: 400,error: "O campo titulo é obrigatório"};
        if (!('descricao' in data)) return {status: 400,error: "O campo descricao é obrigatório"};
        if (!('disponivel' in data)) return {status: 400,error: "O campo disponivel é obrigatório"};
        if (!('pre_requisito' in data)) return {status: 400,error: "O campo pre_requisito é obrigatório"};
        if (!('id_perfil_professor' in data)) return {status: 400,error: "O campo id_perfil_professor é obrigatório"};
        return;
    }
    static projetoControllerValidateIndexEntries(data) {
        if (!('id_projeto' in data)) return {status: 400,error: "O campo id_projeto é obrigatório"};
        return;
    }
    static tfgControllerValidateStatusOrientationEntries(data) {
        if (!('id_usuario' in data)) return {status: 400,error: "O campo id_usuario é obrigatório"};
        return;
    }
    static tfgControllerValidateStatusPartialOrientationEntries(data) {
        if (!('id_usuario' in data)) return {status: 400,error: "O campo id_usuario é obrigatório"};
        return;
    }
    static tfgControllerValidateStorePartialTccEntries(data,data1) {
        if (!('id_tcc' in data)) return {status: 400,error: "O campo id_tcc é obrigatório"};
        if (!('nota' in data1)) return {status: 400,error: "O campo nota é obrigatório"};
        if (data1.nota == "") return {status: 400,error: "Preencha os campos obrigatórios"};
        if (data1.nota > 10 || data1.nota < 0) return {status: 400,error: "A nota deve ter valor entre 0 e 10"};
        return;
    }
}
module.exports = Test;