function TipoUsuario(conexao) {
  this._conexao = conexao;
}
TipoUsuario.prototype.getTipos = function (callback) {
  this._conexao.query("select * FROM tipo_usuario", callback);
};
module.exports = function () {
  return TipoUsuario;
};