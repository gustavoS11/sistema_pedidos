module.exports = function (app) {
    app.get('/produto/produtos', function (req, res) {
        app.app.controllers.produto.listaProdutos(app, req, res)
    });
    app.get("/produto/carrinho/render_editar_produto/:idProduto", function (req, res) {
        app.app.controllers.produto.render_editarProduto(app, req, res)
    });
    app.get("/produto/carrinho/editar_produto/:idProduto", function (req, res) {
        app.app.controllers.produto.editarProduto(app, req, res)
    });
    app.get("/produto/carrinho/excluir_produto/:idProduto", function (req,res) {
        app.app.controllers.produto.excluirProduto(app, req, res)
    })
}