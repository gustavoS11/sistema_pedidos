module.exports.cadastro_usuario = function (app, req, res) {
  res.render("usuario/cadastro_usuario", { erros: {}, usuario: {} });
};
module.exports.cadastrar = function (app, req, res) {
  const dados = req.body;
  req.assert("nome", "Você deve preencher o campo Nome").notEmpty();
  req.assert("email", "Você deve preencher o campo E-mail").notEmpty();
  req.assert("senha", "Você deve preencher o campo Senha").notEmpty();
  req.assert("senha", "A senha deve conter no mínimo 6 caracteres").len(6);
  req.assert("confirmar_senha", "Você deve preencher o campo Confirmar Senha").notEmpty();
  function validarCampos() {
    const erros = req.validationErrors();
    return erros;
  }
  function senhasCoincidem() {
    return dados.senha === dados.confirmar_senha;
  }
  function renderizarCadastro(erros) {
    res.render("usuario/cadastro_usuario", { erros: erros, usuario: dados });
  }
  let erros = validarCampos();
  if (!senhasCoincidem()) {
    erros.push({ msg: "As senhas não coincidem" });
    renderizarCadastro(erros);
  } else {
    if (erros) {
      renderizarCadastro(erros);
    } else {
      const conexao = app.config.conexao;
      const modelUsuario = new app.app.models.modelUsuario(conexao);

      modelUsuario.getUsuarioByEmail(dados.email, function (error, result) {
        if (result.length > 0) {
          const erros = [{ msg: "Este e-mail já está sendo utilizado" }];
          renderizarCadastro(erros);
        } else {
          modelUsuario.cadastrar(dados, function (error, result) {
            res.redirect("/usuario/login");
          });
        }
      });
    }
  }
};
module.exports.validar = function (app, req, res) {
  const dados = req.body;
  req.assert("email", "Você deve preencher o campo E-mail").notEmpty();
  req.assert("senha", "Você deve preencher o campo Senha").notEmpty();
  const erros = req.validationErrors();
  if (erros) {
    res.render("usuario/login", { erros: erros, usuario: dados });
    return;
  }
  const conexao = app.config.conexao;
  const modelUsuario = new app.app.models.modelUsuario(conexao);
  modelUsuario.getUsuario(dados, function (error, result) {
    if (result.length <= 0) {
      let erros = [{ msg: "Usuário não encontrado" }];
      res.render("usuario/login", { erros: erros, usuario: dados });
    } else {
      req.session.id_tipo_usuario = result[0].id_tipo_usuario;
      req.session.id_usuario = result[0].id;
      req.session.nome_usuario = result[0].nome;
      req.session.email_usuario = result[0].email;
      if (req.session.id_tipo_usuario == 2) {
        res.redirect("/indexAdmin");
      } else {
          res.redirect("/");
      }
    }
  });
};
module.exports.login = function (app, req, res) {
  const dados = req.body;
  req.assert("email", "você deve preencher o campo E-mail").notEmpty();
  req.assert("senha", "você deve preencher o campo Senha").notEmpty();
  const erros = req.validationErrors();
  if (erros) {
    res.render("usuario/login", { erros: erros, usuario: dados });
    return;
  }
  const conexao = app.config.conexao;
  const modelUsuario = new app.app.models.modelUsuario(conexao);
  modelUsuario.logar(dados, function (error, result) {});
};
module.exports.render_alterar_dados = function (app, req, res) {
  if (req.session.id_tipo_usuario != 1) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const id = req.session.id_usuario;
  const conexao = app.config.conexao;
  const modelUsuario = new app.app.models.modelUsuario(conexao);
  modelUsuario.getUsuarioById(id, function (error, result) {
    res.render("usuario/alterar_dados", { usuario: result, erros: {} });
    return;
  });
};
module.exports.alterar_dados = function (app, req, res) {
  if (req.session.id_tipo_usuario != 1) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const id = req.session.id_usuario;
  const dados = req.body;
  const conexao = app.config.conexao;
  const modelUsuario = new app.app.models.modelUsuario(conexao);
  modelUsuario.alterarDados(id, dados, function (error, result) {
    res.redirect("/");
  });
};
module.exports.render_alterar_senha = function (app, req, res) {
  if (req.session.id_tipo_usuario != 1) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const id = req.session.id_usuario;
  const conexao = app.config.conexao;
  const modelUsuario = new app.app.models.modelUsuario(conexao);
  modelUsuario.getUsuarioById(id, function (error, result) {
    res.render("usuario/alterar_senha", { usuario: result, erros: {} });
    return;
  });
};
module.exports.alterar_senha = function (app, req, res) {
  if (req.session.id_tipo_usuario != 1) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const id = req.session.id_usuario;
  const dados = req.body;
  const conexao = app.config.conexao;
  const modelUsuario = new app.app.models.modelUsuario(conexao);
  modelUsuario.alterarSenha(id, dados, function (error, result) {
    res.redirect("/");
  });
};
module.exports.sair = function (app, req, res) {
  req.session.destroy(function (error) {
    res.redirect("/usuario/login");
  });
};
