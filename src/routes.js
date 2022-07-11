// Neste arquivo é realizado todo o roteamento do sistema e suas determinadas funções
const express = require('express');
const UsuarioController = require('./controllers/UsuarioController')
const TfgController = require('./controllers/TfgController')
const LogController = require('./controllers/LogController')
const PerfilProfessorController = require('./controllers/PerfilProfessorController')
const ProjetoController = require('./controllers/ProjetoController')
const UniversidadeController = require('./controllers/UniversidadeController')
const InstitutoController = require('./controllers/InstitutoController')
const CronogramaController = require('./controllers/CronogramaController')
const verify = require('./controllers/AuthorizationController');
const UsuarioTfgController = require('./controllers/UsuarioTfgController');
const CursoController = require('./controllers/CursoController');
const routes = express.Router();

// Posts
routes.post('/users', UsuarioController.store)
routes.post('/users/create-professor', UsuarioController.storeCodeProfessor)
routes.post('/users/:id_usuario/log', verify, LogController.store)
routes.post('/professor', verify, PerfilProfessorController.store)
routes.post('/project', verify, ProjetoController.store)
routes.post('/login', UsuarioController.login)
routes.post('/logout', verify, UsuarioController.logout)
routes.post('/tfg', TfgController.store)
routes.post('/user_tfg', UsuarioTfgController.store)
routes.post('/users/type', verify, UsuarioController.indexAllType)
routes.post('/tfg/:id_tcc/partial-tcc', TfgController.storePartialTcc)
routes.post('/university', UniversidadeController.store)
routes.post('/institute', InstitutoController.store)
routes.post('/course', CursoController.store)
routes.post('/timeline', CronogramaController.store)

//Gets
routes.get('/users', verify, UsuarioController.indexAll)
routes.get('/users/:id_usuario/:id_perfil/without', verify, UsuarioController.indexAllTypeWithoutId)
routes.get('/users/:id_usuario', verify, UsuarioController.index)
routes.get('/users/:id_usuario/log', verify, LogController.store)
routes.get('/professor/:id_usuario/user', verify, PerfilProfessorController.indexUser)
routes.get('/professor/:id_perfil_professor', verify, PerfilProfessorController.index)
routes.get('/professors', verify, PerfilProfessorController.indexAll)
routes.get('/tfg', TfgController.indexAll)
routes.get('/tfg/:id_tfg', TfgController.index)
routes.get('/projects/:id_projeto', ProjetoController.index)
routes.get('/projects', ProjetoController.indexAll)
routes.get('/user_tfg/:id_usuarioTfg', UsuarioTfgController.index)
routes.get('/user_tfg', UsuarioTfgController.indexAll)
routes.get('/users/check/:id_usuario', UsuarioController.checkStatusTcc); 
routes.get('/tfg/search-status-orientation/:id_usuario', TfgController.statusOrientation)
routes.get('/tfg/search-partial-orientation/:id_usuario', TfgController.statusParcialOrientation)
routes.get('/tfg/search-users-registration/:id_usuario', TfgController.searchUserRegistration)
routes.get('/tfg/search-users-record/:id_usuario', TfgController.searchUserRecord)
routes.get('/universitys', UniversidadeController.indexAll)
routes.get('/universities', UniversidadeController.indexAll)
routes.get('/universitys/:id_universidade', UniversidadeController.index)
routes.get('/universities/:id_universidade/institutes', UniversidadeController.indexInstitutes)
routes.get('/institute/:id_instituto', InstitutoController.index)
routes.get('/institute/:id_instituto/courses', InstitutoController.indexCourses)
routes.get('/institutes', InstitutoController.indexAll)
routes.get('/courses', CursoController.indexAll)
routes.get('/course/:id_curso', CursoController.index)
routes.get('/timelines/:id_timeline', CronogramaController.index)
routes.get('/timelines', CronogramaController.indexAll)

// Update
routes.put('/users/:id_usuario', verify, UsuarioController.update);
routes.put('/tfg/:id_tfg/status', TfgController.updateStatus);
routes.put('/user_tfg', UsuarioTfgController.update);
routes.put('/tfg/:id_tfg', verify, TfgController.update)
routes.put('/universities/:id_universidade', UniversidadeController.update)
routes.put('/institutes/:id_instituto', InstitutoController.update)
routes.put('/courses/:id_curso', CursoController.update)
routes.put('/timelines/:id_timeline', CronogramaController.update)

// Deletes
routes.delete('/users/:id_usuario', verify, UsuarioController.delete);
routes.delete('/tfg/:id_tfg', TfgController.delete);
routes.delete('/user_tfg/:id_usuarioTfg', UsuarioTfgController.delete);
routes.delete('/universities/:id_universidade', UniversidadeController.delete);
routes.delete('/institutes/:id_instituto', InstitutoController.delete);
routes.delete('/courses/:id_curso', CursoController.delete);
routes.delete('/timelines/:id_timeline', CronogramaController.delete)


module.exports = routes;