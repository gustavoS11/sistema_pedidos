const e = require("express");
const { addListener } = require("nodemon");

module.exports.cadastrar_usuario = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const dados = req.body;
  req.assert("nome", "Você deve preencher o campo Nome").notEmpty();
  req.assert("email", "Você deve preencher o campo E-mail").notEmpty();
  req.assert("senha", "Você deve preencher o campo Senha").notEmpty();
  req.assert("senha", "A senha deve conter no mínimo 6 caracteres").len(6);
  req
    .assert("id_tipo_usuario", "Você deve preencher o tipo de usuário")
    .notEmpty();
  function validarCampos() {
    const erros = req.validationErrors();
    return erros;
  }
  function renderizarCadastro(erros) {
    const conexao = app.config.conexao;
    const modelTipoUsuario = new app.app.models.modelTipoUsuario(conexao);
    modelTipoUsuario.getTipos(function (error, result) {
      res.render("admin/cadastro", {
        erros: erros,
        usuario: dados,
        tipos: result,
      })
    })
  }
  let erros = validarCampos();
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
        })
      }
    })
  }
}
module.exports.render_cadastro_produtos = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  else {
    res.render("admin/cadastro_produto");
    return
  }
}
module.exports.cadastrar_produto = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const dados = req.body;
  req.assert("descricao", "Você deve preencher o campo Nome").notEmpty();
  req.assert("preco", "Você deve preencher o campo E-mail").notEmpty();
  function validarCampos() {
    const erros = req.validationErrors();
    return erros;
  }
  function renderizarCadastro(erros) {
    res.render("admin/cadastro_produto", { erros: erros });
  }
  let erros = validarCampos();
  if (erros) {
    renderizarCadastro(erros);
  } else {
    const conexao = app.config.conexao;
    const modelProduto = new app.app.models.modelProduto(conexao);
    modelProduto.cadastroProduto(dados, function (error, result) {
      res.redirect("/indexAdmin");
    })
  }
}
module.exports.getTipos = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const conexao = app.config.conexao;
  const modelTipoUsuario = new app.app.models.modelTipoUsuario(conexao);
  modelTipoUsuario.getTipos(function (error, result) {
    res.render("admin/cadastro", { erros: {}, tipos: result });
  })
}
module.exports.listarUsuarios = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const conexao = app.config.conexao;
  const modelUsuario = new app.app.models.modelUsuario(conexao);
  modelUsuario.listarUsuario(function (error, result) {
    res.render("admin/lista_usuarios", { usuario: result });
  })
}
module.exports.listarProdutos = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const conexao = app.config.conexao;
  const modelProduto = new app.app.models.modelProduto(conexao);
  modelProduto.getProdutos(function (error, result) {
    res.render("admin/lista_produtos", { produtos: result });
  })
}
module.exports.salvar_usuario = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const conexao = app.config.conexao;
  const modelUsuario = new app.app.models.modelUsuario(conexao);
  const idUsuario = req.params.idUsuario;
  const dados = req.body;
  modelUsuario.editarUsuario(dados, idUsuario, function (error, result) {
    modelUsuario.listarUsuario(function (error, result) {
      res.render("admin/lista_usuarios", { usuario: result });
    })
  })
}
module.exports.editar_usuario = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const conexao = app.config.conexao;
  const modelUsuario = new app.app.models.modelUsuario(conexao);
  const idUsuario = req.params.idUsuario;
  const modelTipoUsuario = new app.app.models.modelTipoUsuario(conexao);
  modelUsuario.getUsuarioById(idUsuario, function (error, usuario) {
    modelTipoUsuario.getTipos(function (error, tipos) {
      res.render("admin/editar_usuario", { usuario: usuario, tipos: tipos, erros: {}})
    })
  })
}
module.exports.excluir_usuario = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const conexao = app.config.conexao;
  const modelUsuario = new app.app.models.modelUsuario(conexao);
  const idUsuario = req.params.idUsuario;
  modelUsuario.excluirUsuario(idUsuario, function (error, result) {
    modelUsuario.listarUsuario(function (error, result) {
      res.render("admin/lista_usuarios", { usuario: result });
    })
  })
}
module.exports.excluir_produto = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const conexao = app.config.conexao;
  const modelProduto = new app.app.models.modelProduto(conexao);
  const idProduto = req.params.idProduto;
  modelProduto.excluirProduto(idProduto, function (error, result) {
    modelProduto.getProdutos(function (error, result) {
      res.render("admin/lista_produtos", {produtos : result})
    })
  })
}
module.exports.editar_produto = function (app, req, res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const conexao = app.config.conexao;
  const modelProduto = new app.app.models.modelProduto(conexao);
  const idProduto = req.params.idProduto;
  modelProduto.getProdutoByID(idProduto, function (error, result) {
    res.render("admin/editar_produto", {produto : result})
  })
}
module.exports.salvar_produto = function (app,req,res) {
  if (req.session.id_tipo_usuario != 2) {
    res.render("usuario/login", {erros : {}});
    return
  }
  const conexao = app.config.conexao;
  const modelProduto = new app.app.models.modelProduto(conexao);
  const dados = req.body
  const idProduto = req.params.idProduto;
  modelProduto.editarProduto(dados, idProduto, function (error, result) {
    modelProduto.getProdutos(function (error, result) {
      res.render("admin/lista_produtos", {produtos : result})
    })
  })
}