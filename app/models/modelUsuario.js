const usuario = require("../rotas/usuario");
function Usuario(conexao) {
  this._conexao = conexao;
  this._crypto = require("crypto");
}
Usuario.prototype.cadastrar = function (dados, callback) {
  dados.senha = this._crypto
    .createHash("md5")
    .update(dados.senha)
    .digest("hex");
  delete dados.confirmar_senha;
  this._conexao.query("insert into usuario set ?", dados, callback);
};
Usuario.prototype.logar = function (dados, callback) {
  this._conexao.query("select * from usuario WHERE ?", dados, callback);
};
Usuario.prototype.getUsuario = function (dados, callback) {
  const senha = this._crypto
    .createHash("md5")
    .update(dados.senha)
    .digest("hex");
  this._conexao.query(`select * from usuario WHERE email = '${dados.email}' AND senha = '${senha}'`, callback);
};
Usuario.prototype.getUsuarioByEmail = function (email, callback) {
  this._conexao.query(`select * from usuario WHERE email = '${email}'`, callback);
};
Usuario.prototype.getUsuarioById = function (id, callback) {
  this._conexao.query(`select * from usuario WHERE id = '${id}'`, callback);
};
Usuario.prototype.listarUsuario = function (callback) {
  this._conexao.query("select * from usuario", callback);
};
Usuario.prototype.editarUsuario = function (dados, id_usuario, callback) {
  this._conexao.query(`update usuario SET nome = '${dados.nome}', email = '${dados.email}', id_tipo_usuario = ${dados.id_tipo_usuario} WHERE id = ${id_usuario}`, callback);
};
Usuario.prototype.excluirUsuario = function (id, callback) {
  this._conexao.query(`delete from usuario where id = ${id}`, callback);
};
Usuario.prototype.alterarDados = function (id, dados, callback) {
  this._conexao.query(`update usuario set ? where id = ${id}`, dados, callback);
};
Usuario.prototype.alterarSenha = function (id, dados, callback) {
  this._conexao.query(`update usuario set ? where id = ${id}`, dados, callback);
};
module.exports = function () {
  return Usuario;
};
