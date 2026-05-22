/**
 * @file script.js
 * @description Ponto de entrada principal (main) da aplicação.
 * Este arquivo é responsável por inicializar o sistema,
 * definir variáveis globais, buscar dados iniciais e conectar eventos
 * de UI (como cliques de botão) às funções correspondentes nos outros módulos.
 */

/**
 * @typedef {object} OptionItem - Estrutura padrão para itens de dropdown/combo.
 * @property {string|number} id - O valor da opção.
 * @property {string} text - O texto de exibição da opção.
 * @property {string} [status] - Status da opção (ex: 'active').
 */

/**
 * Contêiner para os campos de telefone dinâmicos.
 * @type {HTMLDivElement}
 */
const containerTelefone = document.getElementById('telefones-container');
/**
 * Contêiner para os campos de email dinâmicos.
 */
const containerEmail = document.getElementById('emails-container');

// --- Constantes Globais de Dados ---
const siglaProduto = [
    { sigla: 'gv', nome: 'Voluntário Global', idprograma: 7 },
    { sigla: 'gtast', nome: 'Talento Global Short Term', idprograma: 8 },
    { sigla: 'gtalt', nome: 'Talento Global Mid e Long Term', idprograma: 8 },
    { sigla: 'gte', nome: 'Professor Global', idprograma: 9 }
];
const escritorios = [
    { sigla: "AB", nome: "ABC" },
    { sigla: "AJ", nome: "ARACAJU" },
    { sigla: "BA", nome: "BAURU" },
    { sigla: "BH", nome: "BELO HORIZONTE" },
    { sigla: "BS", nome: "BRASÍLIA" },
    { sigla: "CT", nome: "CURITIBA" },
    { sigla: "FL", nome: "FLORIANÓPOLIS" },
    { sigla: "FR", nome: "FRANCA" },
    { sigla: "FO", nome: "FORTALEZA" },
    { sigla: "JP", nome: "JOÃO PESSOA" },
    { sigla: "LM", nome: "LIMEIRA" },
    { sigla: "MZ", nome: "MACEIÓ" },
    { sigla: "MN", nome: "MANAUS" },
    { sigla: "MA", nome: "MARINGÁ" },
    { sigla: "PA", nome: "PORTO ALEGRE" },
    { sigla: "RC", nome: "RECIFE" },
    { sigla: "RJ", nome: "RIO DE JANEIRO" },
    { sigla: "SS", nome: "SALVADOR" },
    { sigla: "SM", nome: "SANTA MARIA" },
    { sigla: "GV", nome: "SÃO PAULO UNIDADE GETÚLIO VARGAS" },
    { sigla: "MK", nome: "SÃO PAULO UNIDADE MACKENZIE" },
    { sigla: "US", nome: "SÃO PAULO UNIDADE USP" },
    { sigla: "SO", nome: "SOROCABA" },
    { sigla: "UB", nome: "UBERLÂNDIA" },
    { sigla: "VT", nome: "VITÓRIA" },
    { sigla: "MC", nome: "BRASIL (NACIONAL)" }
];
const divisaoMercadoGT = {
    "abc": "AIESEC no Brasil",
    "aracaju": "AIESEC em Aracaju",
    "bauru": "AIESEC em Limeira",
    "belo horizonte": "AIESEC em Belo Horizonte",
    "brasília": "AIESEC no Brasil",
    "curitiba": "AIESEC no Brasil",
    "florianópolis": "AIESEC em Florianópolis",
    "franca": "AIESEC no Brasil",
    "fortaleza": "AIESEC em Fortaleza",
    "joão pessoa": "AIESEC no Brasil",
    "limeira": "AIESEC em Limeira",
    "maceio": "AIESEC no Brasil",
    "manaus": "AIESEC no Brasil",
    "maringá": "AIESEC em Maringá",
    "porto alegre": "AIESEC em Porto Alegre",
    "recife": "AIESEC no Brasil",
    "rio de janeiro": "AIESEC no Rio de Janeiro",
    "salvador": "AIESEC no Brasil",
    "santa maria": "AIESEC no Brasil",
    "getúlio vargas": "AIESEC em São Paulo Unidade Getúlio Vargas",
    "mackenzie": "AIESEC em São Paulo Unidade Mackenzie",
    "usp": "AIESEC no Brasil",
    "sorocaba": "AIESEC no Brasil",
    "uberlândia": "AIESEC em Uberlândia",
    "vitória": "AIESEC no Brasil",
    "brasil": "AIESEC no Brasil"
};

const divisaoMercadoGV = {
    "abc": "AIESEC no Brasil",
    "aracaju": "AIESEC em Aracaju",
    "bauru": "AIESEC em Limeira",
    "belo horizonte": "AIESEC em Belo Horizonte",
    "brasília": "AIESEC no Brasil",
    "curitiba": "AIESEC no Brasil",
    "florianópolis": "AIESEC em Florianópolis",
    "franca": "AIESEC no Brasil",
    "fortaleza": "AIESEC em Fortaleza",
    "joão pessoa": "AIESEC em João Pessoa",
    "limeira": "AIESEC em Limeira",
    "maceio": "AIESEC no Brasil",
    "manaus": "AIESEC no Brasil",
    "maringá": "AIESEC no Brasil",
    "porto alegre": "AIESEC no Brasil",
    "recife": "AIESEC em Recife",
    "rio de janeiro": "AIESEC no Rio de Janeiro",
    "salvador": "AIESEC em Salvador",
    "santa maria": "AIESEC em Santa Maria",
    "getúlio vargas": "AIESEC em São Paulo Unidade Getúlio Vargas",
    "mackenzie": "AIESEC em São Paulo Unidade Mackenzie",
    "usp": "AIESEC no Brasil",
    "sorocaba": "AIESEC no Brasil",
    "uberlândia": "AIESEC em Uberlândia",
    "vitória": "AIESEC em Vitória",
    "brasil": "AIESEC no Brasil"
};

// --- Seletores de DOM Globais ---
const btnNext = document.getElementById("btn-next");
const idiomasDiv = document.getElementById("idiomas");

// --- Variáveis de Estado Globais ---
const idiomaSelecionados = [];
// IDs selecionados no formulário individual, podem ser pré-populados por UTMs.
let selectedProductId = null;
let selectedCommitteeId = null;
let selectedCommitteeText = null;
let selectedAdSourceId = null;
// Contador para garantir IDs únicos para as linhas de cadastro em massa.
let bulkRowCounter = 0;

// Variáveis para armazenar dados da API
let todasOpcoes_idioma;
let campos;
let universidades;
let listaAnuncio;
let indiceComoConheceuAiesec;
let indiceSiglaComite;
let indiceSigla;
let indiceIdioma = -1;
let parametros;
let produtoSolicitado;
let aiesecProxima;
let meioDivulgacao;
let todosProdutos;
let todasAiesecs;
let todasOpcoes_Como_Conheceu;
let currentStage = 0; // começa no primeiro stage

// Inicializa o fluxo principal: busca metadados e monta campos dinâmicos.
/**
 * Ponto de entrada principal executado quando o DOM está totalmente carregado.
 * Orquestra a inicialização da aplicação, seguindo os seguintes passos:
 * 1. Limpa contêineres dinâmicos.
 * 2. Restaura a aba ativa da sessão anterior.
 * 3. Busca metadados da API.
 * 4. Popula variáveis globais com os dados da API.
 * 5. Inicializa o conteúdo da aba ativa (lazy loading).
 * 6. Anexa listeners de validação.
 */
document.addEventListener("DOMContentLoaded", async () => {
    // 1. Limpa os contêineres de campos dinâmicos para garantir um estado inicial limpo a cada recarregamento.
    containerEmail.innerHTML = '';
    containerTelefone.innerHTML = '';

    // 2. Restaura a aba ativa da última sessão do usuário para melhorar a experiência.
    //    Isso é feito antes de qualquer chamada de API para que a transição seja instantânea.
    initializeTabPersistence();

    try {
        // 3. Busca os metadados essenciais da API (produtos, comitês, etc.).
        const data = await fetchMetadata();

        // 2. Atribui dados às variáveis globais
        campos = data?.data?.fields;
        universidades = data?.universidades;

        // 3.1. Valida se os dados essenciais (a estrutura de 'campos') foram carregados corretamente.
        //      Se não, exibe um erro bloqueante, pois a aplicação não pode funcionar.
        const camposValidos = Array.isArray(campos) && campos.length > 0;
        if (!camposValidos) {
            showModal({
                title: "Erro de conexão",
                message: "Não foi possível carregar os dados necessários do servidor.\nPor favor, recarregue a página e tente novamente.",
                type: "error",
                showConfirm: false,
                showCancel: true,
                cancelText: "Recarregar",
                onCancel: () => {
                    document.getElementById("meuForm").reset();
                    location.reload();
                }
            });
            console.error("Estrutura de 'campos' inválida ou ausente na resposta da API.");
            return;
        }

        // 3.2. Popula os arrays globais de opções (todosProdutos, todasAiesecs, etc.) a partir dos metadados.
        const produtoField = campos.find(field => field.label === "Produto");
        const aiesecField = campos.find(field => field.label === "Qual é a AIESEC mais próxima de você?");
        const comoConheceuField = campos.find(field => field.label === "Como você conheceu a AIESEC?");

        todosProdutos = (produtoField?.config?.settings?.options || [])
            .filter(opcoes => opcoes.status == "active")
            .map(curr => ({ id: curr.id, text: curr.text }));

        todasAiesecs = (aiesecField?.config?.settings?.options || [])
            .filter(opcoes => opcoes.status == "active")
            .map(curr => ({ id: curr.id, text: curr.text.replace(/\s*-\s*/g, " ") }));

        todasOpcoes_Como_Conheceu = (comoConheceuField?.config?.settings?.options || [])
            .filter(opcoes => opcoes.status == "active")
            .map(curr => ({ id: curr.id, text: curr.text }));

        // 4. Configura o carregamento "preguiçoso" (lazy loading) para as abas.
        //    Apenas o conteúdo da aba ativa é inicializado no carregamento.
        //    O restante é inicializado sob demanda, quando o usuário clica na aba.
        initializeLazyTabLoading();

        // 5. Anexa listeners de validação aos campos estáticos (Nome, Sobrenome).
        validarNome('nome', 'erro-nome');
        validarNome('sobrenome', 'erro-sobrenome');

    } catch (error) {
        console.error("Erro fatal na inicialização:", error);
        showModal({
            title: "Erro de conexão",
            message: "Não foi possível carregar os dados necessários para o formulário. Por favor, recarregue a página.",
            backendError: error.message,
            type: "error",
            showConfirm: false,
            showCancel: true,
            cancelText: "Recarregar",
            onCancel: () => {
                document.getElementById("meuForm").reset();
                location.reload();
            }
        });
    }
});

// Exemplo de uso no envio do formulário
// Previne o comportamento padrão de submit do formulário, pois o envio é controlado via JS.
document.getElementById('meuForm').addEventListener('submit', function (e) {
    e.preventDefault();
});

// --- Event Listeners Principais ---
/**
 * Listener para o botão de envio principal do formulário individual.
 * Primeiro valida os dados e, se estiverem corretos, inicia o processo de envio.
 */
btnNext.addEventListener("click", async () => {
    const isFormValid = validarDadosObrigatorios();
    if (isFormValid !== true) {
        return;
    }
    await enviarFormularioObrigatorio();
});

/**
 * Configura a persistência das abas de modo de cadastro.
 * - **Restauração:** Ao carregar a página, lê o `localStorage` para ativar a última aba visitada pelo usuário.
 * - **Salvamento:** Sempre que o usuário troca de aba, salva o ID da nova aba no `localStorage`.
 */
function initializeTabPersistence() {
    const storageKey = 'activeFormModeTab';

    // 1. RESTAURAÇÃO:
    // Manipula as classes CSS diretamente para uma troca instantânea,
    // evitando o "piscar" da aba padrão antes de exibir a aba correta.
    let savedTabTarget = localStorage.getItem(storageKey);
    if (savedTabTarget) {
        const tabToActivate = document.querySelector(`button[data-bs-target="${savedTabTarget}"]`);
        const paneToActivate = document.querySelector(savedTabTarget);

        if (tabToActivate && paneToActivate) {
            // Remove a seleção padrão definida no HTML
            const defaultActiveTab = document.querySelector('#form-modes .nav-link.active');
            const defaultActivePane = document.querySelector('.tab-content .tab-pane.active');
            if (defaultActiveTab) defaultActiveTab.classList.remove('active');
            if (defaultActivePane) defaultActivePane.classList.remove('show', 'active');

            // Aplica a seleção salva
            tabToActivate.classList.add('active');
            paneToActivate.classList.add('show', 'active');
        }
    }

    // 2. SALVAMENTO:
    // Anexa um listener ao evento 'shown.bs.tab' do Bootstrap para salvar o ID da aba no localStorage.
    const tabTriggers = document.querySelectorAll('#form-modes button[data-bs-toggle="tab"]');
    tabTriggers.forEach(triggerEl => {
        triggerEl.addEventListener('shown.bs.tab', event => {
            const activeTabTarget = event.target.getAttribute('data-bs-target');
            if (activeTabTarget) {
                localStorage.setItem(storageKey, activeTabTarget);
            }
        });
    });
}

/**
 * Inicializa os componentes de cada aba de forma "preguiçosa" (lazy-loading).
 * - Apenas o conteúdo da aba ativa é inicializado no carregamento da página para otimizar a performance.
 * - As outras abas são inicializadas somente quando o usuário clica nelas pela primeira vez.
 */
function initializeLazyTabLoading() {
    const tabs = {
        '#individual-panel': () => {
            criarCampos();
            addEmail();
            addTelefone();
            initPikaday();
        },
        '#bulk-panel': initBulkMode,
        '#upload-panel': initUploadMode
    };

    // Um Set para rastrear quais abas já foram inicializadas.
    const initializedTabs = new Set();

    // Função para inicializar uma aba específica se ela ainda não foi inicializada.
    const initTab = (target) => {
        if (!initializedTabs.has(target) && tabs[target]) {
            tabs[target]();
            initializedTabs.add(target);
        }
    };

    // 1. Inicializa a aba que foi restaurada pela função `initializeTabPersistence`.
    const storageKey = 'activeFormModeTab';
    const activeTabTarget = localStorage.getItem(storageKey) || '#individual-panel';
    initTab(activeTabTarget);

    // 2. Adiciona listeners para inicializar as outras abas sob demanda (no clique).
    document.querySelectorAll('#form-modes button[data-bs-toggle="tab"]').forEach(tabEl => {
        tabEl.addEventListener('show.bs.tab', (event) => {
            const target = event.target.getAttribute('data-bs-target');
            initTab(target);
        });
    });
}