var app = require('./config/server');

var server = app.listen(80, function() {
    console.log('Server ON')
});

var io = require('socket.io').listen(server);

app.set('io', io);

// Criar a conexão por web socket
io.on('connection', function(socket) {
    console.log("Usuário conectou");

    socket.on('disconnect', function() {
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function(data) {
        /**Atualiza mensagens */
        socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
        socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});

        /**Atualiza participantes */
        if(parseInt(data.apelido_atualizado_cliente) == 0) {
            socket.emit('participantesParaCliente', {apelido: data.apelido});
            socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
        }
    });

    
});
