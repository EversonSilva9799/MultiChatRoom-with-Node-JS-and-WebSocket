module.exports.iniciaChat = function(app, req, res) {

    var dadosForm = req.body;
    req.assert('apelido', 'Este Campo é obrigatório').notEmpty();
    req.assert('apelido', 'O campo deve ter entre 3 e 15 caracteres').len(3, 15);

    var errors = req.validationErrors()

    if(errors) {
        res.render('index', {formValid : errors});
        return;
    }

    app.get('io').emit('msgParaCliente', {apelido: dadosForm.apelido, mensagem: 'Conectou-se'});

    res.render('chat', {dadosForm: dadosForm});
}