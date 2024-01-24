//gerar número de atendimento aleatório
function gerarNumeroAtendimento() {
    //requisição para o servidor
    fetch('/gerarNumeroAtendimento')
        .then(response => response.json())
        .then(data => {
            document.getElementById('numero-atendimento').value = data.numeroAtendimento;
        })
        .catch(error => console.error('Erro:', error));
}

//adicionar exame à lista
function adicionarExame() {
    const novoExame = document.getElementById('novo-exame').value;
    const examesList = document.getElementById('exames-list');
    
    //verificar se o exame já está na lista
    if (!Array.from(examesList.children).some(li => li.textContent === novoExame)) {
        const li = document.createElement('li');
        li.textContent = novoExame;
        examesList.appendChild(li);
    }
}

//salvar o atendimento
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
        //redirecionar para a página de listagem de atendimentos ou realizar outra ação
    })
    .catch(error => console.error('Erro:', error));
}

//gerar número de atendimento ao carregar a página
gerarNumeroAtendimento();

app.post('/salvarAtendimento', (req, res) => {
    const { numeroAtendimento, nomeCompleto, sexo, email, celular, exames } = req.body;

    //inserir dados do paciente na tabela 'pacientes'
    db.run(
        'INSERT INTO pacientes (numero_atendimento, nome_completo, sexo, email, celular) VALUES (?, ?, ?, ?, ?)',
        [numeroAtendimento, nomeCompleto, sexo, email, celular],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const pacienteId = this.lastID;

            //inserir exames na tabela 'exames'
            const stmt = db.prepare('INSERT INTO exames (paciente_id, nome) VALUES (?, ?)');
            exames.forEach(exame => stmt.run([pacienteId, exame]));
            stmt.finalize();

            res.json({ success: true, pacienteId });
        }
    );
});