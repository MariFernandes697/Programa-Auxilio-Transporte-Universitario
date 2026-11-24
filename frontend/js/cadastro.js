
const formulario = document.querySelector("form");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = formulario.elements["nome"].value.trim();
    const cpf = formulario.elements["cpf"].value.replace(/\D/g, "");
    const email = formulario.elements["email"].value.trim();
    const telefone = formulario.elements["telefone"].value.replace(/\D/g, "");
    const senha = formulario.elements["senha"].value;
    const confirmarSenha = formulario.elements["confirmar_senha"].value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const dadosCadastro = {
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone
    };

    sessionStorage.setItem(
        "dadosCadastro",
        JSON.stringify(dadosCadastro)
    );

    window.location.href = "dadosPessoais.html";

});
