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