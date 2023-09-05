const html = document.querySelector('html');

const botoes = document.querySelectorAll('.app__card-button');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const btnComecar = document.querySelector('#start-pause')

const banner = document.querySelector('.app__image');

const titulo = document.querySelector('.app__title');

const tempoTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./assets/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./assets/sons/play.wav');
const audioPausa = new Audio('./assets/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./assets/sons/beep.mp3')

let tempoDecorridoSegundos = 1500;
let intervaloId = null

musica.loop = true;


musicaFocoInput.addEventListener('change', () =>{
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

btnFoco.addEventListener('click', () => {
    tempoDecorridoSegundos = 1500;
    alterarContexto('foco')
    btnFoco.classList.add('active')
})

btnCurto.addEventListener('click', () => {
    tempoDecorridoSegundos = 300;
    alterarContexto('descanso-curto')
    btnCurto.classList.add('active')
})

btnLongo.addEventListener('click', () => {
    tempoDecorridoSegundos = 900;
    alterarContexto('descanso-longo')
    btnLongo.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()

    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./assets/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":

            titulo.innerHTML = `
             Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":

            titulo.innerHTML = `
             Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case "descanso-longo":

            titulo.innerHTML = `
             Hora de voltar à superfíce<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>
            `
            break;

        default:
            "Ocorreu um erro inesperado"
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoSegundos -= 1
    mostrarTempo()
}

btnComecar.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBtn.textContent = "Pausar"
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBtn.textContent = "Começar"
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()