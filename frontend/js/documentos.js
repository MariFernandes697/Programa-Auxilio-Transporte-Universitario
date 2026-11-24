
// Seleciona todas as linhas de documentos
const documentos = document.querySelectorAll(".linha-documento[data-documento]");

// Armazena os arquivos selecionados nesta página
const arquivosSelecionados = {};

// Configura cada documento
documentos.forEach(function(linha) {

    const campoArquivo = linha.querySelector('input[type="file"]');
    const botao = linha.querySelector(".botao-documento");
    const status = linha.querySelector(".status");
    const iconeStatus = linha.querySelector(".icone-status");
    const textoStatus = linha.querySelector(".texto-status");

    // Abre a seleção de arquivo
    botao.addEventListener("click", function() {

        if (arquivosSelecionados[linha.dataset.documento]) {
            const arquivo = arquivosSelecionados[linha.dataset.documento];
            const url = URL.createObjectURL(arquivo);

            window.open(url, "_blank");
        } else {
            campoArquivo.click();
        }

    });

    // Quando um arquivo é selecionado
    campoArquivo.addEventListener("change", function() {

        const arquivo = campoArquivo.files[0];

        if (!arquivo) {
            return;
        }

        arquivosSelecionados[linha.dataset.documento] = arquivo;

        // Atualiza o status
        status.classList.remove("pendente");
        status.classList.add("enviado");

        iconeStatus.textContent = "✓";
        textoStatus.textContent = "Enviado";

        // Atualiza o botão
        botao.textContent = "Visualizar";

    });

});


// Botão Avançar
const botaoAvancar = document.getElementById("botaoAvancar");

botaoAvancar.addEventListener("click", function() {

    const dadosDocumentacao = {};

    documentos.forEach(function(linha) {
        const identificador = linha.dataset.documento;
        const arquivo = arquivosSelecionados[identificador];

        dadosDocumentacao[identificador] = arquivo
            ? arquivo.name
            : "";
    });

    sessionStorage.setItem(
        "dadosDocumentacao",
        JSON.stringify(dadosDocumentacao)
    );
    window.location.href = "revisao.html";
    alert("Documentação registrada na sessão!");

});

