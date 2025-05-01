let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Evitar usar muita linhas de códigos
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // Falar
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

exebirMensagemInicial();

exibirTextoNaTela('h1', 'Escolha um número entre 1 e 10');
exibirTextoNaTela('p', 'O Jogo do Número Secreto');

// Criar uma função que vai verificar o chute que a pessoa deu
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        // Mudar a palavra tentativa ou tentativas
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        // Adicionar tentativas
        tentativas++;
        // Limpar o campo de texto
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Limpar a lista se a quantidade de itens na lista for igual a 10
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // o includes vai verificar se o elemento está na lista
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        // O push adiciona um item ao final da lista
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// Limpar o campo de texto
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function exebirMensagemInicial(){
    exibirTextoNaTela('h1', 'Escolha um número entre 1 e 10');
    exibirTextoNaTela('p', 'Jogo do Número Secreto');
}

// Função reiniciar jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio;
    limparCampo();
    tentativas = 1;
    exebirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
