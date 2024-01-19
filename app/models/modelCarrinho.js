function Carrinho (conexao) {
    this._conexao = conexao;
    this._crypto = require('crypto');
}
Carrinho.prototype.existeProduto = function (idProduto, idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`SELECT * FROM carrinho WHERE id_pedido =  ${idPedido} AND id_produto = ${idProduto};`, function(errors, result) {
            if (result.length == 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        })
    })
}
Carrinho.prototype.getProdutoPedido = function (idProduto, idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`SELECT * FROM carrinho WHERE id_pedido =  ${idPedido} AND id_produto = ${idProduto};`, function(errors, result) {
            resolve(result);
        })
    })
}
Carrinho.prototype.inserirProduto = function (idProduto, idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`INSERT INTO carrinho VALUES (NULL, ${idPedido}, ${idProduto}, 1);`, function(errors, result) {
            resolve(result);
        })
    })
}
Carrinho.prototype.getProdutosPedido = function (idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`SELECT * FROM carrinho WHERE id_pedido =  ${idPedido};`, function(errors, result) {
            resolve(result);
        })
    })
}
Carrinho.prototype.aumentarQuantidade = function (idProduto, idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`UPDATE carrinho set quantidade = quantidade + 1 WHERE id_produto = ${idProduto} AND id_pedido = ${idPedido}`, function(errors, result) {
            resolve(result);
        })
    })
}
Carrinho.prototype.alterarQuantidade = function (idProduto, dados, callback) {
        this._conexao.query(`UPDATE carrinho set quantidade = ${dados.quantidade} WHERE id_produto = ${idProduto}`, callback)
}
Carrinho.prototype.excluirItem = function (id, callback) {
    this._conexao.query(`delete from carrinho where id = ${id}`, callback);
  };
module.exports = function () {
    return Carrinho;
}