let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = true;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numerosHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numerosHtml += '<div class="number pisca"></div>'
        } else {
            numerosHtml += '<div class="number"></div>'
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numerosHtml;
}

function atualizarInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome:${candidato.nome}<br/>Partido:${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"><img src="./images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            } else {

                fotosHtml += `<div class="d-1-image"><img src="./images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }


        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="voto__grande pisca">VOTO NULO</div>';
    }

}

function clicou(value) {
    let elNumero = document.querySelector('.number.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = value;
        numero = `${numero}${value}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizarInterface();
        }
    }
}

function white() {
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numero.innerHTML = '';
        descricao.innerHTML = '<div class="voto__branco pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
    }
}

function correct() {
    comecarEtapa();
}

function confirms() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
    } else if (numero.length === etapa.numeros){
        votoConfirmado = true;
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="voto__fim pisca">FIM</div>';
        }
    }
}

comecarEtapa();
