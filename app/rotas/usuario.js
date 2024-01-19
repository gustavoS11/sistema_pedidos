module.exports = function (app) {
  app.get("/cadastro_usuario", function (req, res) {
    app.app.controllers.usuario.cadastro_usuario(app, req, res);
  });
  app.post("/usuario/cadastrar", function (req, res) {
    app.app.controllers.usuario.cadastrar(app, req, res);
  });
  app.get("/usuario/login", function (req, res) {
    app.app.controllers.usuario.login(app, req, res);
  });
  app.post("/usuario/validar", function (req, res) {
    app.app.controllers.usuario.validar(app, req, res);
  });
  app.get("/usuario/render_alterar_dados", function (req, res) {
    app.app.controllers.usuario.render_alterar_dados(app, req, res);
  });
  app.post("/usuario/alterar_dados", function (req, res) {
    app.app.controllers.usuario.alterar_dados(app, req, res);
  });
  app.get("/usuario/render_alterar_senha", function (req, res) {
    app.app.controllers.usuario.render_alterar_senha(app, req, res);
  });
  app.post("/usuario/alterar_senha", function (req, res) {
    app.app.controllers.usuario.alterar_senha(app, req, res);
  });
  app.post("/");
};