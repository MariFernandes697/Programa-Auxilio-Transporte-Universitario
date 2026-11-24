
// Recupera os dados da primeira tela
const dadosCadastro = JSON.parse(
    sessionStorage.getItem("dadosCadastro") || "{}"
);

// Referências aos campos
const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");

// Formata o CPF para exibição
function formatarCPF(valor) {
    return valor
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// Preenche os campos com os dados cadastrados
nome.value = dadosCadastro.nome || "";

cpf.value = dadosCadastro.cpf
    ? formatarCPF(dadosCadastro.cpf)
    : "";

email.value = dadosCadastro.email || "";
telefone.value = dadosCadastro.telefone || "";

// Recupera dados pessoais já preenchidos, caso existam
const dadosSalvos = JSON.parse(
    sessionStorage.getItem("dadosPessoais") || "{}"
);

document.getElementById("nascimento").value =
    dadosSalvos.dataNascimento || "";

document.getElementById("endereco").value =
    dadosSalvos.enderecoCompleto || "";

// Formulário de dados pessoais
const formulario = document.getElementById("formDadosPessoais");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!formulario.reportValidity()) {
        return;
    }

    // Captura os dados pessoais
    const dadosPessoais = {
        nomeCompleto: nome.value.trim(),
        dataNascimento: document.getElementById("nascimento").value,
        cpf: cpf.value.replace(/\D/g, ""),
        telefone: telefone.value.replace(/\D/g, ""),
        email: email.value.trim(),
        enderecoCompleto: document.getElementById("endereco").value.trim()
    };

    // Salva os dados pessoais
    sessionStorage.setItem(
        "dadosPessoais",
        JSON.stringify(dadosPessoais)
    );

    // Atualiza os dados cadastrais
    const cadastroAtualizado = {
        ...dadosCadastro,
        nome: dadosPessoais.nomeCompleto,
        cpf: dadosPessoais.cpf,
        email: dadosPessoais.email,
        telefone: dadosPessoais.telefone
    };

    sessionStorage.setItem(
        "dadosCadastro",
        JSON.stringify(cadastroAtualizado)
    );

    alert("Dados pessoais salvos com sucesso!");
});
