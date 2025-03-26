const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iconePausarBT = document.querySelector('.app__card-primary-butto-icon')
const temporizadorNaTela = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaComecar = new Audio('/sons/play.wav')
const musicaPausar = new Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('/sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco') /*altera o atributo do data-contexto no HTML para "foco" que faz variar a cor da Pg */
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTemporizador(contexto)
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    imagem.setAttribute('src', `/imagens/${contexto}.png`)
    switch(contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
                break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superficie.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        zerar()
        alert('Timer finalizado')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTemporizador()
}

startPauseBt.addEventListener('click', iniciar)

function iniciar() {
    if(intervaloId){
        musicaPausar.play()
        zerar()
        return
    }
    musicaComecar.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent ="Pausar" //textContent insere apenas o texto, sem tags ou etc
    iconePausarBT.setAttribute('src', `/imagens/pause.png`)
}

function zerar(){
    clearInterval(intervaloId) //finaliza a contagem regressiva que continuaria para números negativos
    iniciarOuPausarBt.textContent ="Começar"
    iconePausarBT.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTemporizador() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    temporizadorNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTemporizador()



