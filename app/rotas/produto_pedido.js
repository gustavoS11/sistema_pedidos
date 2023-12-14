module.exports = function (app) {
    app.get('/produto/adicionar/:idProduto', function (req, res) {
        app.app.controllers.produto_pedido.insertCarrinho(app, req, res);
    });

    app.get('/carrinho', function (req, res) {
        app.app.controllers.produto_pedido.listarCarrinho(app, req, res);
    });
    app.get('/renderAlterar-quantidade/:idProduto' , function (req, res) {
        app.app.controllers.produto_pedido.renderAlterarQuantidade(app, req, res);
    });
    app.get('/alterarQuantidade', function (req, res) {
        app.app.controllers.produto_pedido.alterarQuantidade(app, req, res);
    });
    app.get('/excluir/:idProduto' , function (req, res) {
        app.app.controllers.produto_pedido.excluirCarrinho(app, req, res);
    });
}