import express from 'express';
import fetch from 'node-fetch';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
const app = express();
const port = 3000;

//config do express e outras dependências

app.use(express.json());

//rotas

app.get('/gerarNumeroAtendimento', (req, res) => {
    //gerar número de atendimento
    const numeroAtendimento = Math.floor(Math.random() * 1000) + 1;
    res.json({ numeroAtendimento });
});

app.post('/salvarAtendimento', (req, res) => {
    //salvar atendimento no banco de dados

    res.json({ success: true, pacienteId });
});

//outras rotas e lógicas

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});