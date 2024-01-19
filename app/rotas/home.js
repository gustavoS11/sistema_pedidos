module.exports = function (app) {
  app.get("/", function (req, res) {
    app.app.controllers.home.index(app, req, res);
  });
  app.get("/indexAdmin", function (req, res) {
    app.app.controllers.home.indexAdmin(app, req, res);
  });
  app.get("/sair", function (req, res) {
    app.app.controllers.home.sair(app, req, res);
  });
};