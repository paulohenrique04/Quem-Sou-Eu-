const listPersonagens = [
    { nome: "TARTARUGA", imagem: "../img/1.png" },
    { nome: "PANDA", imagem: "../img/2.png" },
    { nome: "DESMATAMENTO", imagem: "../img/3.png" },
    { nome: "QUEIMADAS", imagem: "../img/4.png" },
    { nome: "LOBO-GUARÁ", imagem: "../img/5.png" },
    { nome: "PROJETO AGRINHO", imagem: "../img/6.png" },
    { nome: "FLORESTA AMAZÔNICA", imagem: "../img/7.png" },
    { nome: "ENERGIA EÓLICA", imagem: "../img/8.png" },
    { nome: "ARARA-AZUL", imagem: "../img/9.png" },
    { nome: "PREÁ", imagem: "../img/10.png" },
    { nome: "VITÓRIA RÉGIA", imagem: "../img/11.png" }
];

let nomePersonagem;
let imagemPersonagem;
let tentativas = 5;
console.log("tentativas =" + tentativas);
let resposta;
let erros = 0;
let acertos = 0;
let finalizouPartida = false;

SorteiaImagem();
function SorteiaImagem() {
  const index = parseInt(Math.random() * listPersonagens.length);

  nomePersonagem = listPersonagens[index].nome;
  imagemPersonagem = listPersonagens[index].imagem;

  console.log(nomePersonagem);
  console.log(imagemPersonagem);

  document.getElementById("imagem").style.backgroundImage =
    "url(" + imagemPersonagem + ")";

  desfocarImagem(tentativas);
}

function desfocarImagem(valoDesfoque) {
    const imagem = document.getElementById("imagem");
  
    switch (valoDesfoque) {
      case 5:
        imagem.style.filter = "blur(40px)";
        break;
      case 4:
        imagem.style.filter = "blur(30px)";
        break;
      case 3:
        imagem.style.filter = "blur(20px)";
        break;
      case 2:
        imagem.style.filter = "blur(17px)";
        break;
      case 1:
        imagem.style.filter = "blur(14px)";
        break;
      case 0:
        imagem.style.filter = "blur(0)";
        break;
      default:
        break;
    }
}

document.addEventListener("keydown", (e) => {
    if (finalizouPartida == false) {
        if (e.key === "Enter") {
            e.preventDefault();
            resposta = document.querySelector("#resposta").value.toUpperCase();
            if (resposta.length < 3 || !resposta.trim() || resposta == undefined) {
                personalizaModal("nomeInvalido");
                document.getElementById("resposta").value = "";
            } else {
                if (tentativas > 0) {
                    if (resposta == nomePersonagem) {
                        acertos++;
                        desfocarImagem(0);
                        document.querySelector(".borda-imagem").style.border = "none";
                        mudaStatusInput(true);
                        finalizouPartida = true;
                        personalizaModal("vitoria");
                        habilitaBotaoJogarNovamente();
                    } else { 
                        tentativas--;
                        desfocarImagem(tentativas);
                        barraDeProgresso(tentativas)
                        document.getElementById("resposta").value = "";
                        console.log("tentativas =" + tentativas);
                    }
                }

                if (tentativas == 0) { 
                    erros++;
                    document.querySelector(".borda-imagem").style.border = "none";
                    document.getElementById("resposta").value = nomePersonagem;
                    mudaStatusInput(true);
                    finalizouPartida = true;
                    personalizaModal("derrota");
                    habilitaBotaoJogarNovamente();
                }
            }
            console.log("tentativas =" + tentativas);
            document.querySelector("#derrotas").innerText = erros;
            document.querySelector("#vitorias").innerText = acertos;
        }
    } else{
        return;
    }
});

const modal = document.getElementById("modal-alerta");
const span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function personalizaModal(alerta) {
  const modalMensagem = document.getElementById("modal-mensagem");

  switch (alerta) {
    case "nomeInvalido":
      modalMensagem.innerHTML = "<p> Está querendo me enganar ? </p><p>Digite um nome Válido.</p>";
      break;
    case "vitoria":
      modalMensagem.innerHTML = "<p> Você é bom nisso mesmo hein!</p><p>Nunca duvidei de você.</p>";
      break;
    case "derrota":
      modalMensagem.innerHTML = "<p> Não foi dessa vez</p><p>Aposto que voce consegue na próxima.</p>";
      break;
    default:
      break;
  }
  modal.style.display = "block";
}

function barraDeProgresso(carregaBarra) {
    if (carregaBarra == 5) {
        document.getElementById("progresso-01").style.backgroundColor = "#ffffff";
        document.getElementById("progresso-02").style.backgroundColor = "#ffffff";
        document.getElementById("progresso-03").style.backgroundColor = "#ffffff";
        document.getElementById("progresso-04").style.backgroundColor = "#ffffff";
        document.getElementById("progresso-05").style.backgroundColor = "#ffffff";
    } else {
        switch (carregaBarra) {
            case 4:
                document.getElementById("progresso-01").style.backgroundColor = "#ffd700";
                break;
            case 3:
                document.getElementById("progresso-02").style.backgroundColor = "#ffd700";
                break;
            case 2:
                document.getElementById("progresso-03").style.backgroundColor = "#ffd700";
                break;
            case 1:
                document.getElementById("progresso-04").style.backgroundColor = "#ffd700";
                break;
            case 0:
                document.getElementById("progresso-05").style.backgroundColor = "#ffd700";
                break;
            default:
                break;
            }
    }
}

function habilitaBotaoJogarNovamente(){
    document.getElementById("btnJogarNovamente").style.display = "inline";
}

document.querySelector("#btnJogarNovamente").addEventListener("click", function(){

    finalizouPartida = false;
    tentativas = 5;
    SorteiaImagem();
    desfocarImagem(tentativas);
    mudaStatusInput(false);
    document.getElementById("resposta").value = "";
    document.getElementById("resposta").focus();
    barraDeProgresso(5)
    document.querySelector("#btnJogarNovamente").style.display = "none";
    document.querySelector(".borda-imagem").style.border = "10px solid #ffd700"
});

function mudaStatusInput(condicao){
    document.getElementById("resposta").disabled = condicao;
}