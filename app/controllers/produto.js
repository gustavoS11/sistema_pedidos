module.exports.listaProdutos = function (app, req, res) {
  if (req.session.id_tipo_usuario != 1) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const conexao = app.config.conexao;
  const modelProduto = new app.app.models.modelProduto(conexao);

  modelProduto.getProdutos(function (error, result) {
    res.render("produto/produtos", { produtos: result });
  });
};
module.exports.insertCarrinho = function (app, req, res) {
  if (req.session.id_tipo_usuario != 1) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const conexao = app.config.conexao;
  const modelProduto = new app.app.models.modelProduto(conexao);
  const idProduto = req.idProduto;
  const idUsuario = req.session.id_usuario;
  const status = 1;
  modelProduto.insertPedido(idUsuario, status, function (app, req, res) {
    
    modelProduto.insertCarrinho(idProduto, function (app, req, res) {
      res.render("produto/produtos");
    });
  })
};