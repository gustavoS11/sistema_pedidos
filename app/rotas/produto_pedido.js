module.exports = function (app) {
    app.get('/produto/adicionar/:idProduto', function (req, res) {
        app.app.controllers.produto_pedido.insertCarrinho(app, req, res);
    });
    app.get('/carrinho', function (req, res) {
        app.app.controllers.produto_pedido.listarCarrinho(app, req, res);
    });    
    app.get('/excluir/:id_produto_pedido' , function (req, res) {
        app.app.controllers.produto_pedido.excluirCarrinho(app, req, res);
    });
    app.post('/finalizar-pedido/:id_pedido', function (req, res) {
        app.app.controllers.produto_pedido.finalizarPedido(app, req, res);
    });
    app.get('/render-alterar-quantidade/:id_produto' , function (req, res) {
        app.app.controllers.produto_pedido.renderAlterarQuantidade(app, req, res);
    });
    app.post('/alterarQuantidade/:id_produto', function (req, res) {
        app.app.controllers.produto_pedido.alterarQuantidade(app, req, res);
    });
}