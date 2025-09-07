// Pegando os botões do HTML pelos IDs
const AdicionandoInformacaoTabela = document.getElementById("AdicionandoInformacaoTabela");
const Remover_Aluno = document.getElementById("Remover_Aluno");

// Lista onde serão armazenados todos os alunos
var Lista_alunos = [];

// ================== Função para adicionar aluno ==================
function btnAddInAdicionandoInformacaoTabela() { 
    // Pega o nome do aluno, remove espaços e ajusta
    let nome = document.getElementById('nome_aluno').value.replace(' ','').trim();
    // Pega as notas, separa por vírgula, converte para número
    let notas = document.getElementById('aluno_notas').value.replace(' ','').split(',').map(Number);

    // Validação: nome não pode ser vazio e não pode ser número
    if (nome.toLowerCase() === '' || !isNaN(Number(nome))) {
        alert('Preencha o campos corretamente!');
        return;
    }

    // Validação: todas as notas precisam ser números válidos
    for (let i = 0; i < notas.length; i++) {
        if (isNaN(notas[i])) {
            alert('As notas devem ser números válidos!');
            return;
        }
    }

    // Verifica se o aluno já existe na lista (mesmo nome)
    for (let i = 0; i < Lista_alunos.length; i++) {
        if (nome.toLowerCase() === Lista_alunos[i].Nome.toLowerCase()) {
            alert('Esse aluno ja existe');
            return;
        }
    }

    // Calcula a média das notas
    let soma = 0;
    for (let i = 0; i < notas.length; i++) {
        soma += Number(notas[i]);
    }
    let media = soma / notas.length;

    // Define a situação do aluno com base na média
    let situacao = "";
    if (media >= 7) {
        situacao = "Aprovado";
    } else if (media >= 5) {
        situacao = "Recuperação";
    } else {
        situacao = "Reprovado";
    }

    // Cria o objeto aluno
    let aluno = {
        Nome: nome,
        Notas: notas,
        Media: media,
        Situacao: situacao
    };

    // Adiciona o aluno na lista
    Lista_alunos.push(aluno);

    // Ordena a lista em ordem decrescente de média
    Lista_alunos.sort((a, b) => b.Media - a.Media);

    // Atualiza a tabela no HTML
    let tabela = document.getElementById('TabelaAlunos');

    // Limpa a tabela mas mantém o cabeçalho
    tabela.innerHTML = `<tr><th>Alunos</th></tr>`;

    // Recria todas as linhas da tabela com os dados dos alunos
    Lista_alunos.forEach(aluno => {
        let linha = document.createElement('tr');
        let celula = document.createElement('td');
        celula.textContent = `Nome: ${aluno.Nome}, Notas: ${aluno.Notas.join(", ")}, Média: ${aluno.Media.toFixed(2)}, Situação: ${aluno.Situacao}`;
        linha.appendChild(celula);
        tabela.appendChild(linha);
    });

    // Atualiza estatísticas
    btnMediaGeral()
    btnMaiorMedia()
    btnMenorMedia()

    // Limpa os campos do formulário
    document.getElementById('nome_aluno').value = '';
    document.getElementById('aluno_notas').value = '';
}

// ================== Função para remover aluno ==================
function btnRemoverAluno() {
    // Pede o nome do aluno para remover
    let Remover_Aluno = prompt('Digite o nome do aluno pra remove-lo da lista').trim().replace(' ','');
    if (Remover_Aluno === '') {
        alert('Você não digitou');
    }

    let encontrado = false;
    // Procura aluno na lista
    for (let i = 0; i < Lista_alunos.length; i++) {
        if (Remover_Aluno.toLowerCase() === Lista_alunos[i].Nome.toLowerCase()) {
            Lista_alunos.splice(i, 1); // Remove aluno
            encontrado = true;
            alert("Aluno removido com sucesso!");
            break;
        }
    }

    // Caso não encontre
    if (!encontrado) {
        alert("Aluno não encontrado");
    }

    // Atualiza a tabela após remoção
    let tabela = document.getElementById("TabelaAlunos");
    tabela.innerHTML = `<tr><th>Alunos</th></tr>`;
    Lista_alunos.forEach(aluno => {
        let linha = document.createElement('tr');
        let celula = document.createElement('td');
        celula.textContent = `Nome: ${aluno.Nome}, Notas: ${aluno.Notas}, Média: ${aluno.Media.toFixed(2)}, Situação: ${aluno.Situacao}`;
        linha.appendChild(celula);
        tabela.appendChild(linha);
    });

    // Atualiza estatísticas
    btnMediaGeral()
    btnMaiorMedia()
    btnMenorMedia()

    // Limpa os campos do formulário
    document.getElementById('nome_aluno').value = '';
    document.getElementById('aluno_notas').value = '';
}

// ================== Função para calcular a média geral da turma ==================
function btnMediaGeral() {
    if (Lista_alunos.length === 0) {
        alert("Não há alunos cadastrados!");
        return;
    }

    let somaMedias = 0;

    // Soma todas as médias individuais
    for (let i = 0; i < Lista_alunos.length; i++) {
        somaMedias += Lista_alunos[i].Media; 
    }

    // Calcula média da turma
    let Media_da_turma = (somaMedias / Lista_alunos.length).toFixed(2);

    // Mostra no HTML
    let p_media_geral = document.getElementById('p_media_geral');
    p_media_geral.innerText = Media_da_turma;
}

// ================== Função para mostrar o aluno com maior média ==================
function btnMaiorMedia() {
    if (Lista_alunos.length === 0) {
        alert("Não há alunos cadastrados!");
        return;
    }

    // Começa assumindo o primeiro aluno
    let maiorMedia = Lista_alunos[0].Media;
    let alunoMaiorMedia = Lista_alunos[0].Nome;
    let AlunoMaiorMediaNotas = Lista_alunos[0].Notas;
    let AlunoSituacao = Lista_alunos[0].Situacao;

    // Percorre a lista para encontrar a maior média
    for (let i = 1; i < Lista_alunos.length; i++) {
        if (Lista_alunos[i].Media > maiorMedia) {
            maiorMedia = Lista_alunos[i].Media;
            alunoMaiorMedia = Lista_alunos[i].Nome;
            AlunoMaiorMediaNotas = Lista_alunos[i].Notas;
            AlunoSituacao = Lista_alunos[i].Situacao;
        }
    }

    // Mostra no HTML
    let p_maior_media = document.getElementById("p_maior_media");
    p_maior_media.innerText = `Nome: ${alunoMaiorMedia}, Notas: ${AlunoMaiorMediaNotas.join(", ")}, Média: ${maiorMedia.toFixed(2)}, Situação: ${AlunoSituacao}`;
}

// ================== Função para mostrar o aluno com menor média ==================
function btnMenorMedia() {
    if (Lista_alunos.length === 0) {
        alert("Não há alunos cadastrados!");
        return;
    }

    // Começa assumindo o primeiro aluno
    let menorMedia = Lista_alunos[0].Media;
    let alunoMenorMedia = Lista_alunos[0].Nome;
    let alunoMenorNotas = Lista_alunos[0].Notas;
    let alunoMenorSituacao = Lista_alunos[0].Situacao;

    // Percorre a lista para encontrar a menor média
    for (let i = 1; i < Lista_alunos.length; i++) {
        if (Lista_alunos[i].Media < menorMedia) {
            menorMedia = Lista_alunos[i].Media;
            alunoMenorMedia = Lista_alunos[i].Nome;
            alunoMenorNotas = Lista_alunos[i].Notas;
            alunoMenorSituacao = Lista_alunos[i].Situacao;
        }
    }

    // Mostra no HTML
    let p_menor_media = document.getElementById("p_menor_media");
    p_menor_media.innerText = `Nome: ${alunoMenorMedia}, Notas: ${alunoMenorNotas.join(", ")}, Média: ${menorMedia.toFixed(2)}, Situação: ${alunoMenorSituacao}`;
}

// ================== Eventos ==================
// Quando clicar no botão "Adicionar aluno"
AdicionandoInformacaoTabela.addEventListener('click', btnAddInAdicionandoInformacaoTabela);
// Quando clicar no botão "Remover aluno"
Remover_Aluno.addEventListener('click', btnRemoverAluno);


  