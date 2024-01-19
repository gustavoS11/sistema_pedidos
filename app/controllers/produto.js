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