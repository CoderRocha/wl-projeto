//lado do cliente

function gerarNumeroAtendimento() {
    fetch('/gerarNumeroAtendimento')
        .then(response => response.json())
        .then(data => {
            document.getElementById('numero-atendimento').value = data.numeroAtendimento;
        })
        .catch(error => console.error('Erro:', error));
}

//adicionar exame
function adicionarExame() {
    
}

//salvar o atendimento
function salvarAtendimento() {
    
}

//salvar exame
function salvarExame() {

}

//atualizar a tabela de exames cadastrados
function atualizarTabelaExames() {

}

//gerar relatório
function gerarRelatorio() {

}

//funções e lógicas no geral

//chamar a função de gerarNumeroAtendimento ao carregar a página
document.addEventListener('DOMContentLoaded', gerarNumeroAtendimento);