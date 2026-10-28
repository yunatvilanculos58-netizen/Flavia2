
/* =====================================
   SUPORTETI
   Pesquisa e resolução de problemas
===================================== */

// 1. PESQUISA NA PÁGINA INICIAL

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const problemCards = document.querySelectorAll(".problem-card");
const noResults = document.getElementById("noResults");

function pesquisarProblema() {
    if (!searchInput) return;

    const pesquisa = searchInput.value.toLowerCase().trim();
    let encontrados = 0;

    problemCards.forEach(function(card) {
        const texto = card.textContent.toLowerCase();
        const palavras = card.dataset.search || "";

        if (texto.includes(pesquisa) || palavras.includes(pesquisa)) {
            card.style.display = "";
            encontrados++;
        } else {
            card.style.display = "none";
        }
    });

    if (noResults) {
        noResults.style.display = encontrados === 0 ? "block" : "none";
    }
}

if (searchButton && searchInput) {
    searchButton.addEventListener("click", pesquisarProblema);

    searchInput.addEventListener("input", pesquisarProblema);

    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            pesquisarProblema();
        }
    });
}


// 2. CONTEÚDO DOS PROBLEMAS E SOLUÇÕES

const problemas = {
    "lento": {
        titulo: "Computador lento",
        descricao: "O computador demora a abrir programas ou executar tarefas.",
        dificuldade: "Fácil",
        tempo: "5 a 10 minutos",
        icon: "fa-gauge-high",
        passos: [
            "Reinicie o computador.",
            "Feche os programas que não está a utilizar.",
            "Abra o Gestor de Tarefas e verifique os programas que consomem muitos recursos.",
            "Verifique se existe espaço livre no disco.",
            "Execute uma análise de segurança com o antivírus instalado."
        ],
        dica: "Evite abrir demasiados programas ao mesmo tempo."
    },

    "internet": {
        titulo: "Internet não funciona",
        descricao: "O computador está ligado, mas não consegue aceder à Internet.",
        dificuldade: "Fácil",
        tempo: "5 minutos",
        icon: "fa-globe",
        passos: [
            "Verifique se o router está ligado.",
            "Confirme se os cabos de rede estão bem conectados.",
            "Desligue o router da tomada, aguarde cerca de 30 segundos e volte a ligá-lo.",
            "Reinicie o computador.",
            "Se o problema continuar, contacte o seu fornecedor de Internet."
        ],
        dica: "Verifique se outros dispositivos também estão sem Internet."
    },

    "wifi": {
        titulo: "Wi-Fi não conecta",
        descricao: "O computador não consegue ligar-se à rede Wi-Fi.",
        dificuldade: "Fácil",
        tempo: "5 minutos",
        icon: "fa-wifi",
        passos: [
            "Confirme se o Wi-Fi está activado no computador.",
            "Verifique se seleccionou a rede correcta.",
            "Confirme se a palavra-passe está correcta.",
            "Desactive e volte a activar o Wi-Fi.",
            "Reinicie o computador e tente novamente."
        ],
        dica: "Certifique-se de que está dentro do alcance do router."
    },

    "som": {
        titulo: "Sem som no computador",
        descricao: "O computador não reproduz áudio nos altifalantes ou auscultadores.",
        dificuldade: "Fácil",
        tempo: "3 a 5 minutos",
        icon: "fa-volume-high",
        passos: [
            "Verifique se o volume não está no mínimo ou silenciado.",
            "Confirme se os altifalantes ou auscultadores estão ligados correctamente.",
            "Verifique se o dispositivo de saída de áudio seleccionado é o correcto.",
            "Desligue e volte a ligar os auscultadores, se estiver a utilizá-los.",
            "Reinicie o computador se o problema continuar."
        ],
        dica: "Teste o som com outro vídeo ou ficheiro de áudio."
    },

    "impressora": {
        titulo: "Impressora não imprime",
        descricao: "A impressora está ligada, mas não imprime os documentos.",
        dificuldade: "Fácil",
        tempo: "5 a 10 minutos",
        icon: "fa-print",
        passos: [
            "Confirme se a impressora está ligada.",
            "Verifique se existe papel e tinta ou toner.",
            "Confirme se o cabo USB ou a ligação Wi-Fi estão a funcionar.",
            "Verifique se seleccionou a impressora correcta.",
            "Cancele documentos bloqueados na fila de impressão e tente novamente."
        ],
        dica: "Consulte o ecrã da impressora para verificar se apresenta algum erro."
    },

    "teclado": {
        titulo: "Teclado não funciona",
        descricao: "O teclado não escreve ou algumas teclas não respondem.",
        dificuldade: "Fácil",
        tempo: "5 minutos",
        icon: "fa-keyboard",
        passos: [
            "Verifique se o teclado está bem ligado.",
            "Se for sem fios, confirme a bateria e a ligação.",
            "Experimente outra porta USB, se aplicável.",
            "Reinicie o computador.",
            "Se possível, teste outro teclado para identificar a origem do problema."
        ],
        dica: "Se apenas algumas teclas falharem, verifique se existe sujidade ou algum bloqueio."
    },

    "mouse": {
        titulo: "Rato não funciona",
        descricao: "O cursor não se move ou os botões do rato não respondem.",
        dificuldade: "Fácil",
        tempo: "3 a 5 minutos",
        icon: "fa-computer-mouse",
        passos: [
            "Confirme se o rato está ligado correctamente.",
            "Se for sem fios, verifique a bateria.",
            "Experimente outra porta USB, se aplicável.",
            "Limpe a superfície do sensor e teste o rato noutra superfície.",
            "Reinicie o computador e teste novamente."
        ],
        dica: "Se tiver outro rato disponível, experimente ligá-lo ao computador."
    },

    "nao-liga": {
        titulo: "Computador não liga",
        descricao: "O computador não inicia quando tenta ligá-lo.",
        dificuldade: "Média",
        tempo: "5 a 10 minutos",
        icon: "fa-power-off",
        passos: [
            "Verifique se o cabo de alimentação está bem ligado.",
            "Confirme se a tomada eléctrica está a funcionar.",
            "Num computador portátil, verifique se o carregador está ligado correctamente.",
            "Desligue os acessórios externos e tente ligar novamente.",
            "Se continuar sem funcionar, procure assistência técnica."
        ],
        dica: "Não abra a fonte de alimentação nem tente reparar componentes eléctricos internamente."
    }
};


// 3. MOSTRAR A SOLUÇÃO NA PÁGINA problema.html

const parametros = new URLSearchParams(window.location.search);
const tipoProblema = parametros.get("problema");

const problema = problemas[tipoProblema];

if (tipoProblema && problema) {
    const titulo = document.getElementById("problemTitle");
    const descricao = document.getElementById("problemDescription");
    const dificuldade = document.getElementById("problemDifficulty");
    const tempo = document.getElementById("problemTime");
    const icone = document.getElementById("problemIcon");
    const passos = document.getElementById("solutionSteps");
    const dica = document.getElementById("problemTip");

    if (titulo) titulo.textContent = problema.titulo;
    if (descricao) descricao.textContent = problema.descricao;
    if (dificuldade) dificuldade.textContent = problema.dificuldade;
    if (tempo) tempo.textContent = problema.tempo;

    if (icone) {
        icone.className = "fa-solid " + problema.icon;
    }

    if (passos) {
        passos.replaceChildren();

        problema.passos.forEach(function(passo) {
            const item = document.createElement("li");
            item.textContent = passo;
            passos.appendChild(item);
        });
    }

    if (dica) {
        dica.textContent = problema.dica;
    }

} else if (window.location.pathname.endsWith("problema.html")) {
    const titulo = document.getElementById("problemTitle");
    const descricao = document.getElementById("problemDescription");
    const passos = document.getElementById("solutionSteps");

    if (titulo) titulo.textContent = "Problema não encontrado";
    if (descricao) {
        descricao.textContent = "Não foi possível encontrar a solução solicitada. Volte à página inicial e seleccione um problema.";
    }
    if (passos) passos.replaceChildren();
}
