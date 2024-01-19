module.exports.index = function (app, req, res) {
  if (req.session.id_tipo_usuario != 1) {
    res.redirect("/usuario/login");
    return;
  }
  res.render("home/index");
};
module.exports.indexAdmin = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.redirect("/usuario/login");
    return;
  }
  res.render("home/indexAdmin");
};
module.exports.sair = function (app, req, res) {
  const conexao = app.config.conexao;
  const modelPedido = new app.app.models.modelPedido(conexao);
  const idUsuario = req.session.id_usuario;
  req.session.destroy(function (error) {
    modelPedido.cancelarPedidoAberto(idUsuario, function (error, result) {
      res.redirect('/usuario/login');
    });
  });
};