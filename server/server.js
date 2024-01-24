// server.mjs (tanto o lado do cliente quanto do servidor)

// Função para gerar número de atendimento (lado do cliente)
function gerarNumeroAtendimento() {
    fetch('/gerarNumeroAtendimento')
        .then(response => response.json())
        .then(data => {
            document.getElementById('numero-atendimento').value = data.numeroAtendimento;
        })
        .catch(error => console.error('Erro:', error));
}

//função para adicionar exame à lista (lado do cliente)
if (typeof window !== 'undefined') {
    
    function adicionarExame() {

    }

    function salvarAtendimento() {

    }

    document.addEventListener('DOMContentLoaded', gerarNumeroAtendimento);
}

//salvar o atendimento (lado do cliente)
function salvarAtendimento() {
    const numeroAtendimento = document.getElementById('numero-atendimento').value;
    const nomeCompleto = document.getElementById('nome-completo').value;
    const sexo = document.getElementById('sexo').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;

    //obter a lista de exames
    const examesList = document.getElementById('exames-list');
    const exames = Array.from(examesList.children).map(li => li.textContent);

    //simular uma requisição para o servidor
    fetch('/salvarAtendimento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numeroAtendimento,
            nomeCompleto,
            sexo,
            email,
            celular,
            exames,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Atendimento salvo com sucesso! ID do Paciente:', data.pacienteId);
            //fedirecionar para a página de listagem de atendimentos ou realizar outra ação necessária
        })
        .catch(error => console.error('Erro:', error));
}

//função de gerarNumeroAtendimento ao carregar a página
document.addEventListener('DOMContentLoaded', gerarNumeroAtendimento);

//lado do servidor
import express from 'express';
import fetch from 'node-fetch';

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
    const { numeroAtendimento, nomeCompleto, sexo, email, celular, exames } = req.body;

    // salvar atendimento no banco de dados
    const pacienteId = 123;

    res.json({ success: true, pacienteId });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});