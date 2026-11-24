
// Recupera os dados armazenados nas etapas anteriores
const dadosCadastro = JSON.parse(
    sessionStorage.getItem("dadosCadastro") || "{}"
);

const dadosPessoais = JSON.parse(
    sessionStorage.getItem("dadosPessoais") || "{}"
);

const dadosAcademicos = JSON.parse(
    sessionStorage.getItem("dadosAcademicos") || "{}"
);

const dadosTransporte = JSON.parse(
    sessionStorage.getItem("dadosTransporte") || "{}"
);

const dadosDocumentacao = JSON.parse(
    sessionStorage.getItem("dadosDocumentacao") || "{}"
);

// Preenche um elemento da tela
function preencher(id, valor) {
    document.getElementById(id).textContent =
        valor || "Não informado";
}

// Formata CPF
function formatarCPF(cpf) {
    const numeros = String(cpf || "").replace(/\D/g, "");

    if (numeros.length !== 11) {
        return cpf || "Não informado";
    }

    return numeros.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
    );
}

// Formata telefone
function formatarTelefone(telefone) {
    const numeros = String(telefone || "").replace(/\D/g, "");

    if (numeros.length === 11) {
        return numeros.replace(
            /(\d{2})(\d{5})(\d{4})/,
            "($1) $2-$3"
        );
    }

    if (numeros.length === 10) {
        return numeros.replace(
            /(\d{2})(\d{4})(\d{4})/,
            "($1) $2-$3"
        );
    }

    return telefone || "Não informado";
}

// ==============================
// DADOS PESSOAIS
// ==============================

preencher(
    "revisaoNome",
    dadosPessoais.nomeCompleto || dadosCadastro.nome
);

preencher(
    "revisaoCpf",
    formatarCPF(dadosPessoais.cpf || dadosCadastro.cpf)
);

preencher(
    "revisaoTelefone",
    formatarTelefone(dadosPessoais.telefone || dadosCadastro.telefone)
);

preencher(
    "revisaoEmail",
    dadosPessoais.email || dadosCadastro.email
);

// ==============================
// DADOS ACADÊMICOS
// ==============================

preencher("revisaoInstituicao", dadosAcademicos.instituicao);
preencher("revisaoCurso", dadosAcademicos.curso);
preencher("revisaoSemestre", dadosAcademicos.semestre);
preencher("revisaoDuracao", dadosAcademicos.duracao);

// ==============================
// DADOS DO TRANSPORTE
// ==============================

const tiposTransporte = {
    "Onibus": "Ônibus",
    "Van": "Van",
    "Micro-onibus": "Micro-ônibus",
    "Outro": "Outro"
};

const frequencias = {
    "TODOS": "Todos os dias",
    "ALGUNS": "Alguns dias da semana",
    "UMA_VEZ": "Uma vez por semana"
};

preencher(
    "revisaoTipoTransporte",
    tiposTransporte[dadosTransporte.tipoTransporte] ||
    dadosTransporte.tipoTransporte
);

preencher(
    "revisaoFrequencia",
    frequencias[dadosTransporte.frequencia]
);

preencher(
    "revisaoValor",
    dadosTransporte.valorMensal !== undefined &&
    dadosTransporte.valorMensal !== ""
        ? Number(dadosTransporte.valorMensal).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        : ""
);

// Por segurança, não exibimos a chave Pix completa na revisão.
const pix = dadosTransporte.chavePix || "";

preencher(
    "revisaoPix",
    pix.length > 4 ? "••••" + pix.slice(-4) : pix
);

// ==============================
// DOCUMENTAÇÃO
// ==============================

function statusDocumento(nomeArquivo) {
    return nomeArquivo ? "Enviado" : "Pendente";
}

const identificacao = [
    dadosDocumentacao.rg,
    dadosDocumentacao.cpf
];

preencher(
    "revisaoIdentificacao",
    identificacao.every(Boolean) ? "Enviados" : "Pendente"
);

preencher(
    "revisaoResidencia",
    statusDocumento(dadosDocumentacao.residencia)
);

preencher(
    "revisaoRenda",
    statusDocumento(dadosDocumentacao.renda)
);

preencher(
    "revisaoCertidao",
    statusDocumento(dadosDocumentacao.certidao)
);

// ==============================
// BOTÕES EDITAR
// ==============================

function editarEtapa(pagina) {
    window.location.href = pagina;
}

// ==============================
// CONFIRMAÇÃO DA SOLICITAÇÃO
// ==============================

const botaoEnviar = document.getElementById("enviarSolicitacao");
const confirmacao = document.getElementById("confirmacao");

botaoEnviar.addEventListener("click", function() {

    if (!confirmacao.checked) {
        alert("Você precisa confirmar a declaração antes de continuar.");
        return;
    }

    sessionStorage.setItem(
        "declaracaoConfirmada",
        "true"
    );

    alert(
        "Declaração confirmada! O envio definitivo da solicitação será integrado ao sistema posteriormente."
    );

});
