module.exports.insertCarrinho = async function (app, req, response) {
    const idProduto = req.params.idProduto;
    const idUsuario = req.session.id_usuario;
    const conexao = app.config.conexao;
    const modelPedido = new app.app.models.modelPedido(conexao);
    const modelCarrinho = new app.app.models.modelCarrinho(conexao);
    //verifica se existe um pedido aberto
    const existePedidoAberto = await modelPedido.existePedidoAberto(idUsuario)
    if (!existePedidoAberto) {
        //cria um pedido
        await modelPedido.criarPedido(idUsuario);
    }
    //pega o id do pedido aberto
    const idPedido = await modelPedido.getIdPedidoAberto(idUsuario);
    //salva o id do pedido aberto em sessão
    req.session.id_pedido = idPedido;

    //verifica se o produto já foi adicionado no pedido aberto
    const existeProduto = await modelCarrinho.existeProduto(idProduto, idPedido)
    if (existeProduto) {
        await modelCarrinho.aumentarQuantidade(idProduto, idPedido)
    }
    else {
        await modelCarrinho.inserirProduto(idProduto, idPedido)
    }
    response.redirect('/produto/produtos');
}
module.exports.listarCarrinho = async function (app, req, res) {
    const conexao = app.config.conexao;
    const modelCarrinho = new app.app.models.modelCarrinho(conexao);
    const modelProduto = new app.app.models.modelProduto(conexao);
    const idUsuario = req.session.id_usuario;
    const modelPedido = new app.app.models.modelPedido(conexao);
    const existePedidoAberto = await modelPedido.existePedidoAberto(idUsuario)
    if (!existePedidoAberto) {
        const erros = [{msg: 'Seu carrinho está vazio!'}];
        res.render('produto/carrinho', {erros: erros, produtos_pedido: [], valorTotal: 0});
        return;
    }
    const idPedido = await modelPedido.getIdPedidoAberto(idUsuario)
    req.session.id_pedido = idPedido;
    let produtos_pedido = await modelCarrinho.getProdutosPedido(idPedido);
    let valorTotal = 0;
    for (let i = 0; i < produtos_pedido.length; i++) {
        const produto = await modelProduto.getProduto(produtos_pedido[i].id_produto);
        produtos_pedido[i].descricao = produto.descricao;
        produtos_pedido[i].preco = produto.preco;
        valorTotal += produtos_pedido[i].quantidade * produto.preco;
    }

    res.render('produto/carrinho', {erros: {}, produtos_pedido: produtos_pedido, valorTotal: valorTotal, idPedido: idPedido})
}
module.exports.renderAlterarQuantidade = async function (app, req, res) {
    const conexao = app.config.conexao;
    const idProduto = req.params.id_produto;
    const idPedido = req.session.id_pedido;
    const modelProduto = new app.app.models.modelProduto(conexao);
    const modelCarrinho = new app.app.models.modelCarrinho(conexao);
    const produto = await modelProduto.getProduto(idProduto);
    const produto_pedido = await modelCarrinho.getProdutoPedido(idProduto, idPedido);
    res.render('produto/quantidade_produto.ejs', {produto : produto, produto_pedido : produto_pedido});
}
module.exports.alterarQuantidade = function (app, req, res) {
    const conexao = app.config.conexao;
    const modelCarrinho = new app.app.models.modelCarrinho(conexao);
    const dados = req.body;
    const idProduto = req.params.id_produto;
    modelCarrinho.alterarQuantidade(idProduto, dados, function (error, result) {
        res.redirect('/carrinho')
    });
}
module.exports.excluirCarrinho = function (app, req, res) {
    const conexao = app.config.conexao;
    const modelCarrinho = new app.app.models.modelCarrinho(conexao);
    const id = req.params.id_produto_pedido;

    modelCarrinho.excluirItem(id, function (error, result) {
        res.redirect('/carrinho')
    })
}
module.exports.finalizarPedido = async function (app, req, res) {
    if (req.session.id_usuario == undefined) {
        res.redirect('/')
        return
    }
    const conexao = app.config.conexao;
    const modelCarrinho = new app.app.models.modelCarrinho(conexao);
    const modelProduto = new app.app.models.modelProduto(conexao);
    const idUsuario = req.session.id_usuario;
    const modelPedido = new app.app.models.modelPedido(conexao);
    const existePedidoAberto = await modelPedido.existePedidoAberto(idUsuario)
    if (!existePedidoAberto) {
        const erros = [{msg: 'Seu carrinho está vazio!'}];
        res.render('produto/carrinho', {erros: erros, produtos_pedido: [], valorTotal: 0});
        return;
    }
    const idPedido = await modelPedido.getIdPedidoAberto(idUsuario)
    req.session.id_pedido = idPedido;
    let produtos_pedido = await modelCarrinho.getProdutosPedido(idPedido);
    let valorTotal = 0;
    let subtotal = 0;
    for (let i = 0; i < produtos_pedido.length; i++) {
        const produto = await modelProduto.getProduto(produtos_pedido[i].id_produto);
        produtos_pedido[i].descricao = produto.descricao;
        produtos_pedido[i].preco = produto.preco;
        valorTotal += produtos_pedido[i].quantidade * produto.preco;
    }
    modelPedido.concluirPedidoAberto(idUsuario, function (error, result) {
        res.render('produto/resumo_pedido', {erros: {}, produtos_pedido: produtos_pedido, valorTotal: valorTotal})
    });
}