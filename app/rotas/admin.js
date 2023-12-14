module.exports = function (app) {
  app.get("/admin/cadastro_usuarios", function (req, res) {
    app.app.controllers.admin.getTipos(app, req, res);
  });
  app.post("/admin/cadastrar_usuario", function (req, res) {
    app.app.controllers.admin.cadastrar_usuario(app, req, res);
  });
  app.get("/admin/cadastro_produtos", function (req, res) {
    app.app.controllers.admin.render_cadastro_produtos(app, req, res);
  });
  app.post("/admin/cadastrar_produto", function (req, res) {
    app.app.controllers.admin.cadastrar_produto(app, req, res);
  });
  app.get("/admin/lista_usuarios", function (req, res) {
    app.app.controllers.admin.listarUsuarios(app, req, res);
  });
  app.get("/admin/lista_produtos", function (req, res) {
    app.app.controllers.admin.listarProdutos(app, req, res);
  });
  app.post("/admin/lista_usuarios/salvar/:idUsuario", function (req, res) {
    app.app.controllers.admin.salvar_usuario(app, req, res);
  });
  app.get("/admin/lista_usuarios/editar/:idUsuario", function (req, res) {
    app.app.controllers.admin.editar_usuario(app, req, res);
  });
  app.get("/admin/lista_usuarios/excluir/:idUsuario", function (req, res) {
    app.app.controllers.admin.excluir_usuario(app, req, res);
  });
  app.get("/admin/produtos/editar/:idProduto", function (req, res) {
    app.app.controllers.admin.editar_produto(app, req, res);
  });
  app.post("/admin/produtos/salvar/:idProduto", function (req, res) {
    app.app.controllers.admin.salvar_produto(app, req, res);
  });
  app.get("/admin/produtos/excluir/:idProduto", function (req, res) {
    app.app.controllers.admin.excluir_produto(app, req, res);
  });
};
