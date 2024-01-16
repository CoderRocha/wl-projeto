//um script simples porém funcional para o back end do login

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // aqui verifica se o nome de usuário e senha são não vazios ou não existem

    if (username && password) {

        // uma autenticação simples
        if (username === "usuario" && password === "senha") {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } else {
        res.json({ success: false });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando corretamente em http://localhost:${3000}`);
});