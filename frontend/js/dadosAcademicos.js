
// Formulário de dados acadêmicos
const formulario = document.getElementById("formDadosAcademicos");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!formulario.reportValidity()) {
        return;
    }

    // Captura os dados acadêmicos
    const dadosAcademicos = {
        instituicao: document.getElementById("instituicao").value.trim(),
        curso: document.getElementById("curso").value.trim(),
        semestre: document.getElementById("semestre").value.trim(),
        duracao: document.getElementById("duracao").value.trim(),

        comprovanteMatricula:
            document.getElementById("comprovanteMatricula").files[0]?.name || "",

        boletimEscolar:
            document.getElementById("boletimEscolar").files[0]?.name || "",

        atestadoFrequencia:
            document.getElementById("atestadoFrequencia").files[0]?.name || ""
    };

    // Armazena os dados acadêmicos
    sessionStorage.setItem(
        "dadosAcademicos",
        JSON.stringify(dadosAcademicos)
    );

    alert("Dados acadêmicos salvos com sucesso!");
});
