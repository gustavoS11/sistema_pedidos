function Produto(conexao) {
  this._conexao = conexao;
}
Produto.prototype.getProdutos = function (callback) {
  this._conexao.query("select * from produto", callback);
};
Produto.prototype.getProdutoByID = function(id_produto, callback) {
  this._conexao.query(`select * from produto WHERE id = ${id_produto}`, callback)
}
Produto.prototype.getProduto = function (idProduto) {
  return new Promise((resolve, reject) => {
      this._conexao.query(`SELECT * FROM produto WHERE id = '${idProduto}';`, function(errors, result) {
          resolve(result[0]);
      })
  })
}
Produto.prototype.insertCarrinho = function (idProduto, idPedido, callback) {
  this._conexao.query(`insert into carrinho set id_pedido = ${idPedido}, id_produto = ${idProduto}, quantidade = 1`);
};
Produto.prototype.insertPedido = function (idUsuario, status, callback) {
  this._conexao.query(`insert into pedido set id_usuario = ${idUsuario}, id_status = ${status}`, callback);
}
Produto.prototype.updatePedido = function (status, callback) {
  this._conexao.query(`update pedido set id_status = ${status}`, callback);
}
Produto.prototype.cadastroProduto = function (dados, callback) {
  this._conexao.query("insert into produto set ?", dados, callback);
};
Produto.prototype.editarProduto = function (dados, id_produto, callback) {
  this._conexao.query(`update produto set ? WHERE id = ${id_produto}`, dados, callback);
};
Produto.prototype.excluirProduto = function (id, callback) {
  this._conexao.query(`delete from produto where id = ${id}`, callback);
};
module.exports = function () {
  return Produto;
};