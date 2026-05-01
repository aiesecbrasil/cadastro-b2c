/**
 * Tipos utilitários JSDoc para melhor legibilidade/intellisense.
 * Estes comentários não alteram a execução, apenas documentam.
 *
 * @typedef {{ id: string|number, text: string, status?: string }} OptionItem
 * @typedef {{ label: string, config: { settings: { options?: OptionItem[], possible_types?: string[] } } }} Campo
 * @typedef {{
 *   comite: string,
 *   produto: string,
 *   campanha: string,
 *   anuncio: string,
 *   formaAnuncio: string,
 *   rota: string
 * }} ParametrosURL
 */

/** @type {HTMLDivElement} */
const containerTelefone = document.getElementById('telefones-container');
/** @type {HTMLDivElement} */
const containerEmail = document.getElementById('emails-container');

// Estruturas de produto com sigla e nome por extenso para facilitar matching.
//Formato dos itens: { sigla: 'gv', nome: 'Voluntário Globa' }
const siglaProduto = [
    { sigla: 'gv', nome: 'Voluntário Global', idprograma: 7 },
    { sigla: 'gtast', nome: 'Talento Global Short Term', idprograma: 8 },
    { sigla: 'gtalt', nome: 'Talento Global Mid e Long Term', idprograma: 8 },
    { sigla: 'gte', nome: 'Professor Global', idprograma: 9 }
];
// Estruturas de escritórios (CLs) com sigla e nome por extenso para facilitar matching.
//Formato dos itens: { sigla: 'AB', nome: 'ABC' } 
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
const stages = document.querySelectorAll(".stage");
const btnNext = document.getElementById("btn-next");
//const btnPrev = document.getElementById("btn-prev");
const idiomasDiv = document.getElementById("idiomas");
const cursosDiv = document.getElementById("cursos"); // Renamed from 'cursos'
const atuacaoDiv = document.getElementById("areas-atuacao"); // Renamed from 'atuacao'
const mercadoDiv = document.getElementById("niveis-mercado"); // Renamed from 'mercado'
const TOTAL_STAGES = stages.length;
const idiomaSelecionados = [];

// Global variables for selected IDs (single values, not arrays)
let selectedProductId = null;
let selectedCommitteeId = null;
let selectedCommitteeText = null;
let selectedAdSourceId = null;
let selectedAdFormId = null;

let itemID = 0;
let passou = 0;
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
containerEmail.innerHTML = '';
containerTelefone.innerHTML = '';

/**
 * Mapeia produto (texto) para slug usado no set de universidades (gv/gt).
 * @param {string} textoProduto
 * @returns {'gv'|'gt'|'unknown'}
 */
function getProdutoSlug(textoProduto) {
    const slug = String(textoProduto || '').toLowerCase();
    if (slug.includes('gv') || slug.includes('volunt')) return 'gv';
    if (slug.includes('gt') || slug.includes('talento')) return 'gt';
    return 'unknown';
}

/**
 * Retorna array de opções de universidade no formato esperado por buildCombo.
 * @param {'gv'|'gt'|'unknown'} produtoSlug
 * @returns {{id:string|number,text:string}[]}
 */
function getUniversidadesPorProduto(produtoSlug) {
    const optionKey = produtoSlug === 'gv' ? 'ogv' : 'ogt';

    let source = universidades;
    if (universidades?.universidades) {
        source = universidades.universidades;
    }

    if (!source || (typeof source !== 'object' && !Array.isArray(source))) {
        return [];
    }

    const normalizeId = (item, name) => {
        if (!item && !name) return null;

        if (typeof item === 'string') {
            return item;
        }

        const possibleId = item[optionKey] || item[optionKey?.toLowerCase?.()] || item['ogv'] || item['ogt'] || item.id || name;
        if (possibleId == null) return null;
        return String(possibleId).trim();
    };

    const normalizeText = (item, name) => {
        const rawText = item?.nome || item?.text || item?.label || name || '';
        const lower = String(rawText).toLowerCase();

        if (lower.includes('mc bazi')) {
            return 'Aiesec no Brasil';
        }

        return String(rawText).trim();
    };

    let lista = [];

    if (Array.isArray(source)) {
        lista = source
            .filter(u => u && (u.nome || u.text || u.label))
            .map(u => {
                const text = normalizeText(u);
                let id = normalizeId(u, text);

                if (text.toLowerCase().includes('aiesec no brasil')) {
                    id = 'Aiesec no Brasil';
                }

                return {
                    id: id || text,
                    text
                };
            });
    } else {
        lista = Object.entries(source || {})
            .filter(([nome, data]) => nome && data)
            .map(([nome, data]) => {
                const text = normalizeText(data, nome);
                let id = normalizeId(data, nome);

                if (text.toLowerCase().includes('aiesec no brasil')) {
                    id = 'Aiesec no Brasil';
                }

                return {
                    id: id || text,
                    text
                };
            });
    }

    if (!lista.length) {
        lista = [
            { id: 'FIAP', text: 'FIAP' },
            { id: 'USP', text: 'USP' },
            { id: 'Mackenzie', text: 'Mackenzie' },
            { id: 'PUC', text: 'PUC' },
            { id: 'UNESP', text: 'UNESP' },
            { id: 'UNICAMP', text: 'UNICAMP' }
        ];
    }

    if (!lista.some(item => String(item.text).toLowerCase() === 'outra')) {
        lista.push({ id: 'Outra', text: 'Outra' });
    }

    return lista;
}

function getSelectedProductSlug() {
    // Primeiro tenta via selectedProductId e estruturada todosProdutos
    if (selectedProductId && Array.isArray(todosProdutos)) {
        const produto = todosProdutos.find(p => String(p.id) === String(selectedProductId));
        if (produto && produto.text) return getProdutoSlug(produto.text);
    }

    // Fallback: procura no select HTML
    const produtoSelect = document.getElementById('produto');
    if (produtoSelect && produtoSelect.options.length > 0) {
        const selectedOpt = produtoSelect.options[produtoSelect.selectedIndex];
        if (selectedOpt && selectedOpt.text) {
            return getProdutoSlug(selectedOpt.text);
        }
    }

    return 'unknown';
}

function getNomeCLFromUniversidade(universidadeText, produtoSlug) {
    if (!universidadeText || !produtoSlug) return null;

    // Usar a estrutura enviada pelo backend: universidades[universidade]
    const source = universidades?.universidades || universidades;
    if (!source || typeof source !== 'object') return null;

    const normalized = universidadeText.trim().toLowerCase();
    const key = Object.keys(source).find(k => String(k).trim().toLowerCase() === normalized);
    const entry = key ? source[key] : source[universidadeText];
    if (!entry || typeof entry !== 'object') return null;

    const optKey = produtoSlug === 'gv' ? 'ogv' : 'ogt';
    let value = entry[optKey] || entry[optKey.toLowerCase?.()] || entry['ogv'] || entry['ogt'];
    if (value) return String(value).trim();

    // fallback, se for fornecido um objeto com nome-text
    if (entry.nome || entry.text || entry.label) {
        return String(entry.nome || entry.text || entry.label).trim();
    }

    return null;
}

function getAiesecIdFromNome(nomeCL) {
    if (!nomeCL || !Array.isArray(todasAiesecs)) return null;

    const normalized = slugify(String(nomeCL).trim().replace(/\s+/g, ' '));
    const match = todasAiesecs.find(o => {
        const text = String(o.text || o.id || '').trim();
        const slug = slugify(text);
        return slug === normalized || slug.includes(normalized) || normalized.includes(slug);
    });
    return match ? match.id : null;
}

// Helper para construir um combo com filtro (autocomplete)
/**
 * Constrói um componente simples de combo com filtro (autocomplete).
 *
 * Estrutura gerada:
 * <div class="combo">
 *   <input id="{inputId}">
 *   <ul id="{listId}"></ul>
 * </div>
 * <input type="hidden" id="{hiddenId}">
 *
 * @param {{
 *   container: HTMLElement,
 *   inputId: string,
 *   listId: string,
 *   hiddenId: string,
 *   placeholder: string,
 *   options: OptionItem[],
 *   preselectIndex?: number
 * }} params
 * @returns {void}
 */
function buildCombo({
    container,
    inputId,
    listId,
    hiddenId,
    placeholder,
    options,
    preselectIndex = null,
    hasTags = false,
    selecionados = null,
    filterOption = null
}) {

    const html = `
        <div class="combo">
            <input type="text" id="${inputId}" placeholder="${placeholder}" autocomplete="off">
            <ul id="${listId}" style="display:none"></ul>
        </div>
        ${hasTags ? `<div class="tags" id="tags-${hiddenId}"></div>` : ``}
        <input type="hidden" id="${hiddenId}" value="">
    `;
    container.insertAdjacentHTML('beforeend', html);

    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    const hidden = document.getElementById(hiddenId);
    const tags = hasTags ? document.getElementById(`tags-${hiddenId}`) : null;

    function hideList() {
        list.style.display = 'none';
    }

    function showList() {
        list.style.display = 'block';
    }

    function closeAllCombos() {
        document.querySelectorAll('.combo ul').forEach(ul => ul.style.display = 'none');
    }

    function atualizarHidden() {
        if (hasTags) {
            hidden.value = selecionados.map(o => o.id).join(',');
        }
    }

    function adicionarTag(opt) {
        if (!hasTags) return;
        if (selecionados.some(o => o.id === opt.id)) return;

        selecionados.push(opt);
        atualizarHidden();

        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = opt.text;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = '×';
        btn.onclick = () => {
            const idx = selecionados.findIndex(o => o.id === opt.id);
            if (idx > -1) selecionados.splice(idx, 1);
            tag.remove();
            atualizarHidden();
        };

        tag.appendChild(btn);
        tags.appendChild(tag);
    }

    function render(term = '') {
        const t = term.trim().toLowerCase();
        list.innerHTML = '';

        // Adicionamos (options || []) para garantir que, se options for null/undefined, 
        // ele use um array vazio e não quebre o código.
        const filtradas = (options || []).filter(o => {
            // 1. Filtro por texto (busca)
            if (!o.text.toLowerCase().includes(t)) return false;

            // 2. Se usar tags, remove da lista o que já foi selecionado
            if (hasTags && selecionados.some(s => s.id === o.id)) return false;

            // 3. Aplica um filtro customizado se existir
            if (hasTags && typeof filterOption === 'function') {
                return filterOption(o, selecionados);
            }

            return true;
        });

        if (!filtradas.length) {
            hideList();
            return;
        }

        filtradas.forEach(o => {
            const li = document.createElement('li');
            li.textContent = o.text;

            li.addEventListener('mouseover', () => {
                list.querySelectorAll('li').forEach(e => e.classList.remove('active'));
                li.classList.add('active');
            });

            li.addEventListener('click', () => {
                if (hasTags) {
                    adicionarTag(o);
                    input.value = '';
                } else {
                    input.value = o.text;
                    hidden.value = o.id;

                    // --- ADICIONE ESTAS LINHAS AQUI ---
                    const event = new Event('change', { bubbles: true });
                    hidden.dispatchEvent(event);
                }
                hideList();
            });
            list.appendChild(li);
        });

        showList();
    }

    input.addEventListener('input', () => {
        if (!hasTags) hidden.value = '';
        render(input.value);
    });

    input.addEventListener('focus', () => {
        closeAllCombos();
        render(input.value);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.combo')) hideList();
    });

    if (typeof preselectIndex === 'number' && preselectIndex >= 0 && preselectIndex < options.length) {
        const opt = options[preselectIndex];
        if (hasTags) {
            adicionarTag(opt);
        } else {
            input.value = opt.text;
            hidden.value = opt.id;
        }
    }
}



/**
 * Exibe um modal padronizado de acordo com elementos Bootstrap existentes no DOM.
 * Efeitos colaterais: altera conteúdo/estado de #exampleModalLong e exibe o modal, substitui listeners dos botões.
 * Dependências: window.bootstrap.Modal, elementos com ids exampleModalLong, exampleModalLongTitle, botaoConfirmar, botaoCancelar, DadosAqui.
 */
function showModal(options) {
    /**
     * @typedef {{
     *  title?: string,
     *  message?: string|string[],
     *  type?: 'info'|'error'|'success',
     *  showConfirm?: boolean,
     *  confirmText?: string,
     *  onConfirm?: (ev: MouseEvent) => void,
     *  showCancel?: boolean,
     *  cancelText?: string,
     *  onCancel?: (ev: MouseEvent) => void,
 *  htmlMessage?: string,
     *  backendError?: unknown
     * }} ModalOptions
     * @type {ModalOptions}
     */
    const {
        title,
        message,
        type = 'info',
        showConfirm = true,
        confirmText = 'Confirmar',
        onConfirm,
        showCancel = true,
        cancelText = 'Cancelar',
        onCancel,
        htmlMessage,
        backendError
    } = options || {};

    // Elementos do modal (estrutura já existente no HTML)
    const modalEl = document.getElementById('exampleModalLong');
    const myModal = new bootstrap.Modal(modalEl);
    const tituloModal = document.getElementById('exampleModalLongTitle');
    const botaoConfirmar = document.getElementById('botaoConfirmar');
    const botaoCancelar = document.getElementById('botaoCancelar');
    const corpo = document.getElementById('DadosAqui');

    // Converte lista de mensagens para texto
    const normalizedMessage = Array.isArray(message) ? message.join('\n') : (message || '');

    // Se veio erro do backend, prioriza sua renderização no corpo
    let backendMsg = '';
    if (backendError) {
        try {
            if (typeof backendError === 'string') {
                backendMsg = backendError;
            } else if (backendError.error) {
                backendMsg = backendError.error;
            } else if (backendError.message) {
                backendMsg = backendError.message;
            } else {
                backendMsg = JSON.stringify(backendError);
            }
        } catch (_) {
            backendMsg = '';
        }
    }

    // Título
    tituloModal.textContent = title || '';

    // Corpo do modal: mensagem principal ou possível mensagem do backend
    if (htmlMessage) {
        corpo.innerHTML = htmlMessage;
    } else {
        corpo.textContent = backendMsg || normalizedMessage;
    }

    // Estado e rótulos dos botões
    botaoConfirmar.style.display = showConfirm ? 'inline-block' : 'none';
    botaoConfirmar.disabled = !showConfirm;
    botaoConfirmar.textContent = confirmText;

    botaoCancelar.style.display = showCancel ? 'inline-block' : 'none';
    botaoCancelar.disabled = !showCancel;
    botaoCancelar.textContent = cancelText;

    // Remove listeners anteriores para evitar múltiplos disparos
    botaoConfirmar.replaceWith(botaoConfirmar.cloneNode(true));
    botaoCancelar.replaceWith(botaoCancelar.cloneNode(true));
    const novoConfirmar = document.getElementById('botaoConfirmar');
    const novoCancelar = document.getElementById('botaoCancelar');

    if (showConfirm && typeof onConfirm === 'function') {
        novoConfirmar.addEventListener('click', ev => {
            onConfirm(ev);
            myModal.hide(); // ✅ fecha só aqui
            novoConfirmar.onclick = null; // ✅ remove listener para evitar múltiplos disparos
        }, { once: true });
    }

    if (showCancel && typeof onCancel === 'function') {
        novoCancelar.addEventListener('click', ev => {
            onCancel(ev);
            myModal.hide(); // opcional
        }, { once: true });
    }

    // Exibe o modal
    myModal.show();
}

/**
 * Atualiza o conteúdo de um modal já aberto, sem reabri-lo.
 * Usado para transformar o modal de "processamento" em "resultado".
 */
function updateOpenModal(options) {
    const {
        title,
        message,
        type = 'info', // Adicionado para consistência, embora não usado diretamente aqui
        htmlMessage,
        showConfirm = true,
        confirmText = 'Confirmar',
        onConfirm,
        showCancel = true,
        cancelText = 'Cancelar',
        onCancel
    } = options || {};

    const modalEl = document.getElementById('exampleModalLong');
    // Se o modal não estiver aberto por algum motivo, usa o showModal como fallback.
    if (!modalEl || !modalEl.classList.contains('show')) {
        showModal(options);
        return;
    }

    const tituloModal = document.getElementById('exampleModalLongTitle');
    const corpo = document.getElementById('DadosAqui');
    const botaoConfirmar = document.getElementById('botaoConfirmar');
    const botaoCancelar = document.getElementById('botaoCancelar');
    const myModal = bootstrap.Modal.getInstance(modalEl);

    // Título
    tituloModal.textContent = title || '';

    // Corpo
    if (htmlMessage) {
        corpo.innerHTML = htmlMessage;
    } else {
        const normalizedMessage = Array.isArray(message) ? message.join('\n') : (message || '');
        corpo.textContent = normalizedMessage;
    }

    // Botões
    botaoConfirmar.style.display = showConfirm ? 'inline-block' : 'none';
    botaoConfirmar.disabled = !showConfirm; // Adicionado para consistência
    botaoConfirmar.textContent = confirmText;

    botaoCancelar.style.display = showCancel ? 'inline-block' : 'none';
    botaoCancelar.disabled = !showCancel; // Adicionado para consistência
    botaoCancelar.textContent = cancelText;

    // Remove listeners antigos e adiciona novos para evitar múltiplos disparos
    const novoConfirmar = botaoConfirmar.cloneNode(true);
    botaoConfirmar.parentNode.replaceChild(novoConfirmar, botaoConfirmar);
    const novoCancelar = botaoCancelar.cloneNode(true);
    botaoCancelar.parentNode.replaceChild(novoCancelar, botaoCancelar);

    if (showConfirm && typeof onConfirm === 'function') {
        novoConfirmar.addEventListener('click', (ev) => { onConfirm(ev); if (myModal) myModal.hide(); }, { once: true });
    }
    if (showCancel && typeof onCancel === 'function') {
        novoCancelar.addEventListener('click', (ev) => { onCancel(ev); if (myModal) myModal.hide(); }, { once: true });
    }
}
// Inicializa o fluxo principal: busca metadados e monta campos dinâmicos.
// Em caso de erro de rede/parse, exibe modal amigável e permite recarregar.
document.addEventListener("DOMContentLoaded", async () => {
    const url = 'https://baziaiesec.pythonanywhere.com/metadados-card';

    try {
        // Busca metadados para construção dinâmica de campos
        const response = await fetch(url);
        const data = await response.json();

        // Verificação de segurança mais completa
        // Campos dinamicamente configuráveis vindos do backend (formio like)
        campos = data?.data?.fields;
        universidades = data?.universidades;

        // Verfica se o dado campos é não nulo e com estrutura esperada
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

            console.error("A comunicação não foi corretamente estabelecida. Recarregue a página");
            return; // interrompe o fluxo para evitar erro de find em undefined
        }
        // aqui você já pode chamar funções que dependem dos parâmetros

        // Populate global option arrays once, com tolerância a dados faltantes
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

        todasAiesecs = campos.find(field => field.label === "Qual é a AIESEC mais próxima de você?")
            .config.settings.options.filter(opcoes => opcoes.status == "active")
            .map(curr => ({ id: curr.id, text: curr.text.replace(/\s*-\s*/g, " ") }));

        todasOpcoes_Como_Conheceu = campos.find(field => field.label === "Como você conheceu a AIESEC?")
            .config.settings.options.filter(opcoes => opcoes.status == "active")
            .map(curr => ({ id: curr.id, text: curr.text }));

        // Now create dynamic fields and pre-select them using the selectedId variables
        criarCampos();

        // Add initial email and phone fields (moved from preencherDropdown)
        addEmail();
        addTelefone();

        // Inicializa os painéis de abas para cadastro em massa e upload
        initBulkMode();
        initUploadMode();

    } catch (error) {
        showModal({
            title: "Erro de conexão",
            message: "Por favor, Recarregue a Pagina e tente novamente.\nCaso o erro persista contate o email: contato@aiesec.org.br",
            type: "error",
            showConfirm: false,
            showCancel: true,
            cancelText: "Recarregar",
            onCancel: () => {
                document.getElementById("meuForm").reset();
                location.reload();
            }
        });
        console.error("A comunicação não foi corretamente estabelecida. Recarregue a página");
        console.error('Erro ao buscar dados:', error);
    }
});
//---------------------Criar campo se não vinher parâmtro------------------
/**
 * Cria dinamicamente campos de Produto, AIESEC e Como conheceu quando faltarem
 * parâmetros UTM correspondentes.
 *
 * @param {string|undefined} programa Sigla do produto (ex: 'gv')
 * @param {string|undefined} comite Sigla do comitê local (ex: 'RJ')
 * @param {string|undefined} anuncio Slug de "Como conheceu"
 * @param {string|undefined} rota Slug da rota (pode pré-selecionar produto)
 */
function criarCampos(programa, comite, anuncio) {
    const programasDiv = document.getElementById("produtos");
    const aiesecDiv = document.getElementById("aiesecs");
    const conheceAiesecDiv = document.getElementById("conheceAiesec");

    if (!programa) {
        programasDiv.innerHTML = `
        <label for="produto">Produto *</label>
                <select id="produto" name="produto" required>
                    <option value>Carregando...</option>
                </select>
                <div class="error-msg" id="erro-produto"></div>
        `
        //__________________________________________BOTÃO PRODUTO____________________________________________________
        // Cria o menu suspenso
        const dropdown = document.getElementById('produto');
        dropdown.innerHTML = '';
        dropdown.setAttribute("disabled", "")

        // Cria um botão com a frase "Carregando" enquanto o Menu Suspenso está desativado
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Carregando';
        dropdown.appendChild(defaultOption);

        defaultOption.setAttribute('disabled', '');
        defaultOption.setAttribute('selected', '');

        //____________________________________________________________________________________________________
        //____________________________Lógica Produtos_____________________________________________________
        // Use the globally populated todosProdutos
        todosProdutos.forEach((produto, index) => {
            const newOption = document.createElement("option");
            newOption.value = produto.id;
            newOption.textContent = produto.text;

            // Pre-select if selectedProductId was set by UTM/rota
            if (selectedProductId !== null && String(produto.id) === String(selectedProductId)) {
                newOption.selected = true;
            }
            dropdown.appendChild(newOption);
        });

        // Quando todas as opções estiverem prontas o botão se tranforma em "Selecione" e 
        // ativa o Menu Suspenso novamente
        defaultOption.textContent = "Selecione";
        dropdown.removeAttribute("disabled");

        //________________________________________________________________________________________________
        // Add event listener to update selectedProductId when user changes selection
        dropdown.addEventListener('change', (event) => {
            selectedProductId = event.target.value;
        });
    }
    if (!comite) {
        aiesecDiv.innerHTML = `
        <div id="container-aiesec-proxima" style="margin-top: 15px;">
            <label for="combo-input-aiesec">Qual Cl está cadastrando?*</label>
        </div>
        <div class="error-msg" id="erro-aiesec"></div>
        `;

        const containerAiesecProxima = document.getElementById("container-aiesec-proxima")

        buildCombo({
            container: containerAiesecProxima,
            inputId: 'combo-input-aiesec',
            listId: 'combo-list-aiesec',
            hiddenId: 'aiesecs',
            placeholder: 'Digite ou selecione',
            options: todasAiesecs
        });

        const inputAiesec = document.getElementById("combo-input-aiesec");
        const hiddenAiesec = document.getElementById("aiesecs");

        if (inputAiesec) inputAiesec.value = "";
        if (hiddenAiesec) hiddenAiesec.value = "";

        const erroAiesec = document.getElementById("erro-aiesec");
        if (erroAiesec) erroAiesec.textContent = "";
    }
    if (!anuncio) {
        conheceAiesecDiv.innerHTML = `
        <label for="combo-input-conheceu">Como você conheceu a AIESEC? *</label>
        `;

        // Use the globally populated todasOpcoes_Como_Conheceu
        let preselectIndex = -1;
        if (selectedAdSourceId !== null) {
            preselectIndex = todasOpcoes_Como_Conheceu.findIndex(o => o.id === selectedAdSourceId);
        }

        buildCombo({
            container: conheceAiesecDiv,
            inputId: 'combo-input-conheceu',
            listId: 'combo-list-conheceu',
            hiddenId: 'conheceu',
            placeholder: 'Digite ou selecione', // Placeholder for the combo box
            options: todasOpcoes_Como_Conheceu,
            preselectIndex: preselectIndex >= 0 ? preselectIndex : undefined // Use the preselectIndex calculated above
        });
        // Update selectedAdSourceId when combo value changes
        const hiddenConheceu = document.getElementById('conheceu');
        if (hiddenConheceu) {
            hiddenConheceu.addEventListener('change', (event) => {
                selectedAdSourceId = event.target.value;
            });
        }

        conheceAiesecDiv.insertAdjacentHTML('beforeend', '<div class="error-msg" id="erro-conheceu"></div>');
    }
};

function criarCamposOpicionais(idproduto) {
    idiomasDiv.innerHTML = `
        <label for="combo-input-idioma">Selecione ou digite os idiomas que você sabe falar</label>
        `;
    todasOpcoes_idioma = campos.find(field => field.label === "Quais idiomas você fala?").config.settings.options.filter(opcoes => opcoes.status == "active").map(curr => ({ id: curr.id, text: curr.text }));
    buildCombo({
        container: idiomasDiv,
        inputId: 'combo-input-idioma',
        listId: 'combo-list-idioma',
        hiddenId: 'idiomas',
        placeholder: 'Digite ou selecione',
        options: todasOpcoes_idioma,
        hasTags: true,
        selecionados: idiomaSelecionados,
        filterOption: filtroIdiomas
    });


    idiomasDiv.insertAdjacentHTML('beforeend', '<div class="error-msg" id="erro-idioma">');
    if (idproduto == 1) {
        cursosDiv.innerHTML = `<label for="curso">Curso</label>
        <input type="text" id="curso" placeholder="Informe Seu curso"
                                aria-required="true"
                                aria-describedby="erro-curso" />
                            <span class="error-msg" id="erro-curso" role="alert"
                                aria-live="polite"></span>`
    } else {
        atuacaoDiv.innerHTML = `
    <label for="area-atuacao">Sua Área de Atuação</label>
    <select id="area-atuacao" name="area-atuacao" aria-required="true" aria-describedby="erro-area-atuacao">
        <option value="" disabled selected>Selecione sua área</option>
        <option value="1">Administração</option>
        <option value="2">Direito</option>
        <option value="3">Tecnologia</option>
        <option value="4">Engenharia</option>
        <option value="5">Saúde</option>
        <option value="6">Comunicação</option>
        <option value="7">Ciências Humanas</option>
        <option value="8">Ciências Naturais</option>
    </select>
    <span class="error-msg" id="erro-area-atuacao" role="alert" aria-live="polite"></span>
    `;
        mercadoDiv.innerHTML = `<div class="input-extra">
            <label for="nivel">Nível profissional</label>
            <select id="nivel" name="nivel">
                <option value disabled selected>Selecione o nível</option>
                <option value="1">Estagiário</option>
                <option value="2">Assistente/Auxiliar</option>
                <option value="3">Júnior (JR)</option>
                <option value="4">Pleno (PL)</option>
                <option value="5">Sênior (SR)</option>
                <option value="6">Especialista/Master</option>
                <option value="7">Liderança (Coordenador, Gerente, Diretor)</option>
            </select>
            <span class="error-msg" id="erro-nivel" role="alert" aria-live="polite"></span>
        </div>`
    }
}

function filtroIdiomas(option, selecionados) {
    // option.text = "Português - Básico"
    // selecionados = [{ id, text: "Português - Fluente" }]

    const idiomaBase = option.text.split(' - ')[0];

    return !selecionados.some(sel =>
        sel.text.startsWith(idiomaBase + ' -')
    );
}


function adicionar(item) {
    selecionados.push(item);
    input.value = "";
    lista.innerHTML = "";

    const tag = document.createElement("span");
    tag.textContent = item;

    const btn = document.createElement("button");
    btn.textContent = "×";
    btn.onclick = () => remover(item, tag);

    tag.appendChild(btn);
    tags.appendChild(tag);
}

function remover(item, tag) {
    selecionados = selecionados.filter(i => i !== item);
    tag.remove();
}

// -------------------- Máscara e validação de telefone --------------------
/**
 * Aplica máscara de telefone brasileiro durante a digitação.
 * Formato alvo: (DD) 9 XXXX-XXXX.
 * @param {HTMLInputElement} input
 */
function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function (e) {
        let valor = e.target.value.replace(/\D/g, ''); // remove tudo que não for número
        if (valor.length > 11) valor = valor.substring(0, 11); // limita a 11 dígitos (DDD + 9 + 8 números)

        // Coloca o DDD entre parênteses
        if (valor.length > 2) {
            valor = '(' + valor.substring(0, 2) + ') ' + valor.substring(2);
        }

        // Adiciona o espaço após o 9
        if (valor.length > 6) {
            valor = valor.substring(0, 6) + ' ' + valor.substring(6);
        }

        // Adiciona o traço antes dos últimos 4 números
        if (valor.length > 11) {
            valor = valor.substring(0, 11) + '-' + valor.substring(11);
        }

        e.target.value = valor;
    });
}

// Função para remover a máscara e deixar só números
/**
 * Remove todos os caracteres não numéricos de um telefone formatado.
 * @param {string} valorFormatado
 * @returns {string}
 */
function limparTelefoneFormatado(valorFormatado) {
    return valorFormatado.replace(/\D/g, ''); // remove tudo que não for número
}

// Exemplo de uso no envio do formulário
document.getElementById('meuForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Antes de enviar, pegar todos os campos de telefone e limpar a formatação
    const telefones = document.querySelectorAll('input[name="telefone[]"]');
    telefones.forEach(input => {
        input.value = input.value;
    });

    // Se fosse enviar de verdade:
    // this.submit();
});



/**
 * Valida telefone no blur usando regex do formato (DD) 9 XXXX-XXXX.
 * @param {HTMLInputElement} input
 */
function aplicarValidacaoTelefone(input) {
    input.addEventListener('blur', function (e) {
        const valor = e.target.value.trim();
        const erro = document.getElementById('erro-telefone');
        const regex = /^\(\d{2}\)\s9\s\d{4}-\d{4}$/;

        if (!regex.test(valor)) {
            erro.textContent = "Telefone inválido. Use o formato (DD) 9 XXXX-XXXX";
            camposErro.push("Telefone Inválido")
        } else {
            erro.textContent = "";
        }
    });
}


// -------------------- Validação de e-mail --------------------
/**
 * Valida formato de e-mail básico no blur.
 * Mantém estrutura para futura validação de provedores (comentada).
 * @param {HTMLInputElement} input
 */
function validarEmailComProvedor(input) {
    input.addEventListener('blur', function (e) {
        const valor = e.target.value.trim();
        const erro = document.getElementById('erro-email');

        // Regex para verificar formato de e-mail
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
        if (!regex.test(valor)) {
            erro.textContent = "E-mail inválido.";
            return;
        }

        /*// Lista de provedores conhecidos
        const provedores = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com'];
        const dominio = valor.split('@')[1].toLowerCase();

        if (!provedores.includes(dominio)) {
            erro.textContent = "Por favor, use um e-mail de provedor comum (ex: gmail.com, hotmail.com, icloud.com, outlook.com)";
            camposErro.push("Use um e-mail de provedor comum \n (ex: gmail.com, hotmail.com, icloud.com, hotmail.com)")
        } else {
            erro.textContent = ""; // Tudo certo
        }*/else {
            document.getElementById('erro-email').textContent = "";
        }
    });
}
// -------------------- Validação de nome/sobrenome --------------------
/**
 * Valida um input permitindo apenas letras (inclui acentuadas) e espaços.
 * @param {string} id Id do input a validar
 * @param {string} erroId Id do span/alvo de mensagem de erro
 */
function validarNome(id, erroId) {
    const input = document.getElementById(id);
    const erro = document.getElementById(erroId);
    input.addEventListener('blur', function () {
        const regex = /^[A-Za-zÀ-ÿ\s]+$/;
        if (!regex.test(input.value.trim())) {
            erro.textContent = "Use apenas letras e espaços.";
        } else {
            erro.textContent = "";
        }
    });
}

validarNome('nome', 'erro-nome');
validarNome('sobrenome', 'erro-sobrenome');

// -------------------- Aplicar validações iniciais --------------------
document.querySelectorAll('input[name="email[]"]').forEach(input => {
    validarEmailComProvedor(input)
});
document.querySelectorAll('input[name="telefone[]"]').forEach(input => {
    aplicarMascaraTelefone(input);
    aplicarValidacaoTelefone(input);
});

// -------------------- Adicionar/Remover campos --------------------
/**
 * Adiciona um bloco de e-mail com select de tipos traduzidos e input email.
 * Efeitos colaterais: altera DOM (#emails-container) e envia postMessage ao parent.
 */
async function addEmail() {

    const div = document.createElement('div');

    const tipoEmail = campos.find(field => field.label === "Email");
    const opcoesDeTipoEmail = tipoEmail.config.settings.possible_types;

    div.className = 'campo-multiplo';

    // Traduz cada tipo
    const traducoes = await Promise.all(opcoesDeTipoEmail.map(tipo => traduzirPalavras([tipo])));

    let optionsHTML = '';
    traducoes.forEach(trad => {
        const t = trad[0]; // traduzirPalavras retorna array de objetos
        if (t.original === "other") {
            optionsHTML += `<option value="${t.original.toLowerCase()}" selected>${t.traduzido}</option>`;
        } else {
            optionsHTML += `<option value="${t.original.toLowerCase()}">${t.traduzido}</option>`;
        }
    });

    // Monta o HTML do campo
    div.innerHTML = `
                <select name="emailTipo[]">
                    ${optionsHTML}
                </select>
                <input type="email" name="email[]" placeholder="Email" />
                <button type="button" id="remove-email" class="remove-btn" onclick="removeCampo(this, 'email')">✖</button>
            `;

    containerEmail.appendChild(div);
    validarEmailComProvedor(div.querySelector('input'));
    // Atualiza botões de remoção
    const botoes = containerEmail.querySelectorAll('.remove-btn');
    botoes.forEach(btn => (btn.disabled = botoes.length === 1));
    window.parent.postMessage('campoAdicionado', 'https://aiesec.org.br/');
}


/**
 * Adiciona um bloco de telefone, aplica máscara e validação.
 * Efeitos colaterais: altera DOM (#telefones-container) e envia postMessage ao parent.
 */
async function addTelefone() {

    const div = document.createElement('div');

    // Pega o campo "Telefone" dentro do array 'campos'
    const tipoTelefone = campos.find(field => field.label === "Telefone");
    const opcoesDeTipoTelefone = tipoTelefone.config.settings.possible_types;

    div.className = 'campo-multiplo';

    // Traduz cada tipo
    const traducoes = await Promise.all(opcoesDeTipoTelefone.map(tipo => traduzirPalavras([tipo])));

    let optionsHTML = '';
    traducoes.forEach(trad => {
        const t = trad[0]; // traduzirPalavras retorna array de objetos
        if (t.original === "other") {
            optionsHTML += `<option value="${t.original.toLowerCase()}" selected>${t.traduzido}</option>`;
        } else {
            optionsHTML += `<option value="${t.original.toLowerCase()}">${t.traduzido}</option>`;
        }
    });

    // Monta o HTML do campo de telefone
    div.innerHTML = `
                <select name="telefoneTipo[]">
                    ${optionsHTML}
                </select>
                <input type="tel" name="telefone[]" placeholder="Telefone" />
                <button type="button" id="remove-telefone" class="remove-btn" onclick="removeCampo(this, 'telefone')">✖</button>
            `;

    containerTelefone.appendChild(div);

    // Aplica as funções utilitárias
    aplicarMascaraTelefone(div.querySelector('input'));
    aplicarValidacaoTelefone(div.querySelector('input'));

    // Atualiza botões de remoção
    const botoes = containerTelefone.querySelectorAll('.remove-btn');
    botoes.forEach(btn => (btn.disabled = botoes.length === 1));
    window.parent.postMessage('campoAdicionado', 'https://aiesec.org.br/');
}

/**
 * Remove um bloco (email/telefone) mantendo pelo menos um.
 * @param {HTMLButtonElement} botao
 * @param {"email"|"telefone"} tipo
 */
function removeCampo(botao, tipo) {
    const container = tipo === 'email'
        ? document.getElementById('emails-container')
        : document.getElementById('telefones-container');

    // Remove o campo
    if (container.children.length > 1) {
        container.removeChild(botao.parentNode);
        window.parent.postMessage('campoRemovido', 'https://aiesec.org.br/');
    }

    // Se sobrou apenas 1 campo, desabilita o botão de remoção dele
    if (container.children.length === 1) {
        const ultimoBotao = container.querySelector('.remove-btn');
        if (ultimoBotao) {
            ultimoBotao.disabled = true;
        }
    }
}

// -------------------- Pikaday - Data de nascimento --------------------
// Inputs da data
/** @type {HTMLInputElement} */
const inputVisivel = document.getElementById('nascimento'); // mostra DD/MM/YYYY
/** @type {HTMLInputElement} */
const inputISO = document.getElementById('nascimento-iso'); // armazena YYYY-MM-DD 00:00:00

/**
 * Sincroniza campos de data (visível e ISO) e atualiza o calendário.
 * @param {Date} date
 */
function setDate(date) {
    if (date instanceof Date && !isNaN(date)) {
        // Formato brasileiro no input visível
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        inputVisivel.value = `${day}/${month}/${year}`;

        // Formato americano no campo oculto
        inputISO.value = `${year}-${month}-${day} 00:00:00`;

        // Atualiza a marcação do calendário
        picker.setDate(date, true); // true = evita loop de eventos
    }
}

// Inicializa Pikaday
// Instância do componente de calendário (Pikaday)
const picker = new Pikaday({
    field: inputVisivel,
    format: 'DD/MM/YYYY',
    i18n: {
        previousMonth: 'Mês Anterior',
        nextMonth: 'Próximo Mês',
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    },
    yearRange: [1900, new Date().getFullYear()],
    toString(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    },
    parse(dateString) {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    },
    onSelect: setDate
});

// Atualização manual pelo input
// Sincroniza digitação manual com o calendário e o campo oculto ISO
inputVisivel.addEventListener('input', () => {
    let valor = inputVisivel.value.replace(/\D/g, ''); // remove tudo que não for número

    if (valor.length > 2 && valor.length <= 4) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2);
    } else if (valor.length > 4) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2, 4) + '/' + valor.substring(4, 8);
    }

    inputVisivel.value = valor;

    // Atualiza a marcação no calendário conforme digita
    if (valor.length === 10) { // formato completo DD/MM/YYYY
        const [day, month, year] = valor.split('/').map(Number);
        const date = new Date(year, month - 1, day);

        if (!isNaN(date)) {
            setDate(date); // atualiza os campos e o calendário
        }
    }
});

function validarDadosObrigatorios() {
    let valido = true;
    const camposErro = [];

    const setErro = (id, message) => {
        const el = document.getElementById(id);
        if (el) el.textContent = message;
    };

    const clearErro = (id) => setErro(id, '');

    // Nome e sobrenome
    const nome = document.getElementById('nome')?.value.trim() || '';
    const sobrenome = document.getElementById('sobrenome')?.value.trim() || '';
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!nomeRegex.test(nome)) {
        setErro('erro-nome', 'Nome inválido.');
        camposErro.push('Nome inválido.');
        valido = false;
    } else clearErro('erro-nome');

    if (!nomeRegex.test(sobrenome)) {
        setErro('erro-sobrenome', 'Sobrenome inválido.');
        camposErro.push('Sobrenome inválido.');
        valido = false;
    } else clearErro('erro-sobrenome');

    // Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    const emails = Array.from(document.querySelectorAll('input[name="email[]"]'));
    let emailTemErro = false;
    if (emails.length === 0) {
        setErro('erro-email', 'Informe pelo menos um e-mail.');
        camposErro.push('Informe um e-mail válido.');
        emailTemErro = true;
    } else {
        emails.forEach(input => {
            const valor = (input.value || '').trim();
            if (!emailRegex.test(valor)) {
                emailTemErro = true;
            }
        });
    }
    if (emailTemErro) {
        setErro('erro-email', 'E-mail inválido.');
        camposErro.push('E-mail inválido.');
        valido = false;
    } else clearErro('erro-email');

    // Telefone
    const telefoneRegex = /^\(\d{2}\)\s9\s\d{4}-\d{4}$/;
    const telefones = Array.from(document.querySelectorAll('input[name="telefone[]"]'));
    let telefoneTemErro = false;
    if (telefones.length === 0) {
        setErro('erro-telefone', 'Informe pelo menos um telefone.');
        camposErro.push('Informe um telefone válido.');
        telefoneTemErro = true;
    } else {
        telefones.forEach(input => {
            const valor = (input.value || '').trim();
            if (!telefoneRegex.test(valor)) telefoneTemErro = true;
        });
    }
    if (telefoneTemErro) {
        setErro('erro-telefone', 'Telefone inválido. Use o formato (DD) 9 XXXX-XXXX');
        camposErro.push('Telefone inválido.');
        valido = false;
    } else clearErro('erro-telefone');

    // Data
    const nascimento = document.getElementById('nascimento')?.value.trim() || '';
    const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dataRegex.test(nascimento)) {
        setErro('erro-nascimento', 'Data inválida.');
        camposErro.push('Data inválida.');
        valido = false;
    } else clearErro('erro-nascimento');

    // Produto
    if (!selectedProductId) {
        setErro('erro-produto', 'Selecione o produto.');
        camposErro.push('Produto não selecionado.');
        valido = false;
    } else clearErro('erro-produto');

    // AIESEC / Comitê
    const aiesecHidden = document.getElementById('aiesecs')?.value;
    // A `selectedCommitteeId` pode ser pré-definida por UTM
    if (!aiesecHidden && !selectedCommitteeId) {
        setErro('erro-aiesec', 'Selecione o comitê.');
        camposErro.push('Comitê não selecionado.');
        valido = false;
    } else {
        clearErro('erro-aiesec');
    }

    // Como conheceu
    const conheceuHidden = document.getElementById('conheceu')?.value;
    if (!conheceuHidden && !selectedAdSourceId) {
        setErro('erro-conheceu', 'Selecione ou digite como você conheceu a AIESEC.');
        camposErro.push('Como conheceu não selecionado.');
        valido = false;
    } else {
        clearErro('erro-conheceu');
    }

    // Política
    const politica = document.getElementById('politica')?.checked;
    if (!politica) {
        setErro('erro-politica', 'Você deve aceitar a política de privacidade.');
        camposErro.push('Política de privacidade não aceita.');
        valido = false;
    } else {
        clearErro('erro-politica');
    }

    if (valido) {
        return true;
    }

    return showModal({
        title: 'Dados incorretos.',
        message: `Por favor, corrija os erros e tente novamente.\n\n${camposErro.map(campo => `- ${campo}`).join('\n')}`,
        type: 'error',
        showConfirm: false,
        showCancel: true,
        cancelText: 'Corrigir'
    });
}

async function enviarFormularioObrigatorio() {
    return new Promise(resolve => {
        // Coleta e normalização dos dados do formulário para exibição e envio
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const emails = Array.from(document.querySelectorAll('input[name="email[]"]')).map((el, i) => {
            const select = document.querySelectorAll('select[name="emailTipo[]"]')[i];
            const textoTipoOriginal = select.value;
            const textoTipoTraduzido = select.selectedOptions[0].text;
            return {
                email: el.value,
                tipo: textoTipoOriginal,
                tipoTraduzido: textoTipoTraduzido
            };
        });

        const telefones = Array.from(document.querySelectorAll('input[name="telefone[]"]')).map((el, i) => {
            const select = document.querySelectorAll('select[name="telefoneTipo[]"]')[i];
            const textoTipoOriginal = select.value;
            const textoTipoTraduzido = select.selectedOptions[0].text;

            return {
                numero: el.value,
                tipo: textoTipoOriginal,
                tipoTraduzido: textoTipoTraduzido
            };
        });

        const telefonesEnvio = telefones.map(t => ({
            numero: limparTelefoneFormatado(t.numero),
            tipo: t.tipo
        }));

        const emailsEnvio = emails.map(e => ({
            email: e.email,
            tipo: e.tipo
        }));

        let dados = `<strong>Nome</strong>: ${nome}<br><strong>Sobrenome</strong>: ${sobrenome}<br><strong>Emails</strong>: ${emails.map(email => `${email.email} (${email.tipoTraduzido})`).join('<br>\t')}<br>
<strong>Telefones</strong>: ${telefones.map(telefone => `${telefone.numero} (${telefone.tipoTraduzido})`).join('<br>\t')}<br>
<strong>Data de Nascimento</strong>: ${inputVisivel.value}<br>`;

        // Adiciona só se o campo existir
        if (produtoSolicitado) {
            dados += `<strong>Produto</strong>: ${produtoSolicitado.options[produtoSolicitado.selectedIndex].textContent}<br>`;
        }

        const produtoSlug = getSelectedProductSlug();
        const aiesecTexto = document.getElementById('combo-input-aiesec')?.value?.trim() || '';
        const conheceuTexto = document.getElementById('combo-input-conheceu')?.value?.trim() || '';
        const divisaoMercado = (selectedProductId == 1) ? divisaoMercadoGV : divisaoMercadoGT;
        const nomeCL = aiesecTexto || divisaoMercado[selectedCommitteeText?.toLowerCase()] || selectedCommitteeText;
        const comiteMatch = todasAiesecs.find(opcao =>
            opcao.text.toLowerCase().includes(nomeCL?.toLowerCase())
        );

        const idComiteParaPodio = comiteMatch ? comiteMatch.id : 39;
        selectedCommitteeId = idComiteParaPodio;


        if (aiesecTexto) {
            const committeeIdMapeado = getAiesecIdFromNome(divisaoMercado[aiesecTexto.replace("AIESEC em ", "").replace("AIESEC no ", "").toLowerCase()]);
            selectedCommitteeId = committeeIdMapeado || aiesecTexto;
            selectedCommitteeText = divisaoMercado[aiesecTexto.replace("AIESEC em ", "").replace("AIESEC no ", "").toLowerCase().toLowerCase()] || aiesecTexto;
        }

        if (!selectedCommitteeId) {
            selectedCommitteeId = document.getElementById('aiesec')?.value?.trim() || selectedCommitteeId;
        }
        if (!selectedCommitteeText) {
            selectedCommitteeText = document.getElementById('combo-input-aiesec')?.value?.trim() || selectedCommitteeText;
        }


        if (aiesecTexto) {
            dados += `<strong>AiESEC mais próxima</strong>: ${nomeCL || selectedCommitteeText}<br>`;
        }

        if (conheceuTexto) {
            dados += `<strong>Como conheceu</strong>: ${conheceuTexto}<br>`;
        }

        // Código interno para envios back-end
        // Mantém use acima no bloco data que segue


        // Sempre presente
        dados += `<strong>Aceitou Política</strong>: Sim`;
        // Mostra os dados no Modal
        const modal = document.getElementById('exampleModalLong');
        const myModal = new bootstrap.Modal(modal);
        const botaoConfirmar = document.getElementById("botaoConfirmar");
        const botaoRemover = document.getElementById("botaoCancelar");
        const tituloModal = document.getElementById("exampleModalLongTitle");

        tituloModal.textContent = "Confirme seus dados";
        // 🔹 Restaura o estado padrão dos botões caso tenha havido erro antes
        botaoConfirmar.style.display = 'inline-block';
        botaoConfirmar.disabled = false;
        botaoConfirmar.textContent = "Confirmar";
        botaoRemover.textContent = "Editar dados";

        document.getElementById("DadosAqui").innerHTML = dados;
        myModal.show();

        // Remove listener antigo e adiciona o novo
        botaoConfirmar.replaceWith(botaoConfirmar.cloneNode(true));
        const novoBotaoConfirmar = document.getElementById("botaoConfirmar");
        novoBotaoConfirmar.addEventListener("click", async function handleSubmit(e) {
            e.preventDefault();
            // Fecha o modal de confirmação
            myModal.hide();
            mostrarSpinner();
            // Aguarda o modal terminar de fechar
            await esperarModalFechar(modal);

            const tagValue = slugify(document.getElementById('tag')?.value?.trim());

            const mapeamentoProgramas = { 1: 7, 3: 8, 6: 8, 4: 9 };

            const data = {
                // Use the global selectedId variáveis
                nome,
                sobrenome,
                nomeCL: nomeCL || selectedCommitteeText,
                emails: emailsEnvio,
                telefones: telefonesEnvio,
                dataNascimento: inputISO.value,
                idProduto: selectedProductId,
                idComite: nomeCL == "MC BAZI" ? 39 : selectedCommitteeId,
                idCategoria: selectedAdSourceId,
                idAutorizacao: "1",
                tag: slugify(tagValue)
            };

            try {
                const response = await fetch("https://baziAiesec.pythonanywhere.com/adicionar-card-b2c", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    let backend = null;
                    try { backend = await response.json(); } catch (_) { backend = null; }
                    throw { status: response.status, backend };
                }


                esconderSpinner();
                showModal({
                    title: "Dados enviados com sucesso!",
                    message:
                        `Lead Cadastrado com sucesso`,
                    type: "success",
                    showCancel: false,
                    confirmText: "Ok",
                    onConfirm: () => {
                        resolve(true);
                        document.getElementById("meuForm").reset();
                    }
                });
            } catch (err) {
                esconderSpinner();

                showModal({
                    title: err?.status === 400 ? "Erro de Validação" : "Falha ao Enviar",
                    message:
                        err?.status === 400
                            ? ""
                            : "Por favor, tente novamente.\nCaso o erro persista, contate o email: contato@aiesec.org.br",
                    type: "error",
                    showConfirm: false,
                    showCancel: true,
                    cancelText: err?.status === 400 ? "Corrigir" : "Recarregar",
                    backendError: err?.backend,
                    onCancel:
                        err?.status === 400
                            ? undefined
                            : () => {
                                document.getElementById("meuForm").reset();
                                location.reload();
                                resolve(true)
                            }
                });
            }
        })
    })
}

// ============================================================================
// -------------------- FUNÇÕES DE CONTROLE DO SPINNER ------------------------
// ============================================================================

/**
 * Exibe um spinner de carregamento centralizado na tela.
 * 
 * - Cria dinamicamente o elemento HTML do spinner (não precisa existir no HTML).
 * - Bloqueia a interação com o fundo (usando overlay sem interferir no Bootstrap).
 * - Pode ser reutilizado em qualquer parte do código.
 */
function mostrarSpinner() {
    // Verifica se já existe um spinner ativo para evitar duplicação
    if (document.getElementById('spinner-overlay')) return;

    // Cria o overlay escuro
    const overlay = document.createElement('div');
    overlay.id = 'spinner-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = '#ffffff';
    overlay.style.opacity = '0.5';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '2000'; // acima do modal

    // Cria o spinner em si
    const spinner = document.createElement('div');
    spinner.className = 'spinner-border';
    spinner.role = 'status';

    // Cria o texto de carregamento
    const texto = document.createElement('p');
    texto.textContent = 'Enviando dados, aguarde...';
    texto.style.color = '#000';
    texto.style.marginTop = '15px';
    texto.style.fontSize = '1.1rem';
    texto.style.fontWeight = '500';

    // Adiciona ao overlay
    overlay.appendChild(spinner);
    overlay.appendChild(texto);

    // Insere o overlay no body
    document.body.appendChild(overlay);
}

/**
 * Remove o spinner da tela, caso esteja visível.
 * 
 * - É seguro chamar várias vezes (faz checagem antes de remover).
 */
function esconderSpinner() {
    const overlay = document.getElementById('spinner-overlay');
    if (overlay) overlay.remove();
}


// Função genérica para traduzir palavras usando LibreTranslate
/**
 * Traduz termos comuns por dicionário local (fallback para o original).
 * @param {string[]} palavras
 * @returns {Promise<Array<{ original: string, traduzido: string }>>}
 */
async function traduzirPalavras(palavras) {
    // 1. Tabela interna de termos comuns (manual, sem JSON externo)
    const dicionarioBase = {
        home: "Casa",
        main: "Principal",
        mobile: "Celular",
        other: "Outro",
        private_fax: "Fax Privado",
        work: "Trabalho",
        work_fax: "Fax do Trabalho"
    };

    // 2. Traduz cada palavra
    const traducao = palavras.map(palavra => {
        const limpa = palavra.toLowerCase().trim();
        // tenta tradução direta
        if (dicionarioBase[limpa]) {
            return { original: palavra, traduzido: dicionarioBase[limpa] };
        }
        // caso não ache, tenta deduzir algo
        if (limpa.includes('fax')) return { original: palavra, traduzido: 'Fax' };
        if (limpa.includes('phone')) return { original: palavra, traduzido: 'Telefone' };
        // fallback
        return { original: palavra, traduzido: palavra };
    });

    return traducao;
}


/**
 * Converte string para slug: minúsculas, sem acentos, com hífens e barras.
 * @param {string} texto
 * @returns {string}
 */
function slugify(texto) {
    return texto
        .toLowerCase()                       // tudo minúsculo
        .normalize("NFD")                    // separa letras dos acentos
        .replace(/[\u0300-\u036f]/g, "")     // remove acentos
        .replace(/\s+/g, "-")                // substitui espaços por hífen
        .replace(/[^a-z0-9-/]/g, "")         // mantém letras, números, hífen e barra
        .replace(/-+/g, "-")                 // evita múltiplos hífens
        .replace(/\/+/g, "/")                // evita múltiplas barras
        .replace(/^[-/]+|[-/]+$/g, "");      // remove hífens ou barras no início/fim
}

function fecharModalSeAberto() {
    const modalEl = document.getElementById('exampleModalLong');
    if (!modalEl) return;

    const modalInst = bootstrap.Modal.getInstance(modalEl);
    if (modalInst) {
        modalInst.hide();
    }

    // Remover backdrop residual para evitar sobreposição fixa na tela
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }

    // Resetar body overflow caso tenha ficado travado
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}

function toggleStageInputs(activeIndex) {
    stages.forEach((stage, index) => {
        const inputs = stage.querySelectorAll("input, select, textarea");

        inputs.forEach(input => {
            input.disabled = index !== activeIndex;
        });
    });
}


btnNext.addEventListener("click", async () => {
    // Primeiro, valida. A função retorna true se válido, ou mostra um modal e retorna um objeto se inválido.
    const isFormValid = validarDadosObrigatorios();
    if (isFormValid !== true) {
        return; // Para se a validação falhar (o modal já foi exibido)
    }

    // Se for válido, prossegue para mostrar o modal de confirmação e enviar.
    const ok = await enviarFormularioObrigatorio();
    if (!ok) return;
});

function esperarModalFechar(modal) {
    return new Promise(resolve => {
        modal.addEventListener('hidden.bs.modal', function handler() {
            modal.removeEventListener('hidden.bs.modal', handler);
            resolve(false);
        });
    });
}


/*btnPrev.addEventListener("click", () => {
    if (currentStage > 0) {
        showStage(currentStage - 1);
    }
});*/

let bulkRowCounter = 0;

/**
 * Inicializa o painel de Cadastro em Massa, criando a tabela e os botões.
 */
function initBulkMode() {
    const panel = document.getElementById('bulk-panel');
    if (!panel) return;

    panel.innerHTML = `
        <h3>Cadastro em Massa</h3>
        <p>Adicione múltiplos leads manualmente. Todos os campos com * são obrigatórios.</p>
        <div class="table-responsive-wrapper">
            <table id="bulk-leads-table">
                <thead>
                    <tr>
                        <th>Nome *</th>
                        <th>Sobrenome *</th>
                        <th>Email *</th>
                        <th>Telefone *</th>
                        <th>Nascimento *</th>
                        <th>Produto *</th>
                        <th>Comitê *</th>
                        <th>Como Conheceu *</th>
                        <th>Tag</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <button type="button" id="add-bulk-lead" class="add-btn" style="margin-top: 15px;">Adicionar Lead</button>
        <button type="button" id="submit-bulk-leads" class="next" style="margin-top: 15px;">Enviar Todos</button>
        <div id="bulk-results" class="upload-results" style="margin-top: 20px;"></div>
    `;

    document.getElementById('add-bulk-lead').addEventListener('click', addBulkLeadRow);
    document.getElementById('submit-bulk-leads').addEventListener('click', submitBulkLeads);

    addBulkLeadRow(); // Adiciona a primeira linha
}

/**
 * Adiciona uma nova linha de inputs na tabela de cadastro em massa.
 */
function addBulkLeadRow() {
    const tbody = document.querySelector('#bulk-leads-table tbody');
    if (!tbody) return;

    const rowId = bulkRowCounter++;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" class="bulk-nome" placeholder="Nome"></td>
        <td><input type="text" class="bulk-sobrenome" placeholder="Sobrenome"></td>
        <td><input type="email" class="bulk-email" placeholder="email@exemplo.com"></td>
        <td><input type="tel" class="bulk-telefone" placeholder="(11) 98765-4321"></td>
        <td><input type="text" class="bulk-nascimento" placeholder="DD/MM/YYYY"></td>
        <td class="produto-cell"></td>
        <td class="comite-cell"></td>
        <td class="como-conheceu-cell"></td>
        <td><input type="text" class="bulk-tag" placeholder="Tag (opcional)"></td>
        <td><button type="button" class="remove-btn" onclick="this.closest('tr').remove()">✖</button></td>
    `;
    tbody.appendChild(row);

    // Aplica máscaras aos novos inputs para melhor UX
    const telInput = row.querySelector('.bulk-telefone');
    if (telInput) {
        aplicarMascaraTelefone(telInput);
    }

    const nascInput = row.querySelector('.bulk-nascimento');
    if (nascInput) {
        nascInput.addEventListener('input', () => {
            let valor = nascInput.value.replace(/\D/g, '');
            if (valor.length > 8) valor = valor.substring(0, 8);

            if (valor.length > 2 && valor.length <= 4) {
                valor = valor.substring(0, 2) + '/' + valor.substring(2);
            } else if (valor.length > 4) {
                valor = valor.substring(0, 2) + '/' + valor.substring(2, 4) + '/' + valor.substring(4, 8);
            }
            nascInput.value = valor;
        });
    }

    // Constrói os combos nas suas respectivas células
    buildCombo({
        container: row.querySelector('.produto-cell'),
        inputId: `bulk-produto-input-${rowId}`,
        listId: `bulk-produto-list-${rowId}`,
        hiddenId: `bulk-produto-hidden-${rowId}`,
        placeholder: 'Selecione',
        options: todosProdutos,
    });

    buildCombo({
        container: row.querySelector('.comite-cell'),
        inputId: `bulk-comite-input-${rowId}`,
        listId: `bulk-comite-list-${rowId}`,
        hiddenId: `bulk-comite-hidden-${rowId}`,
        placeholder: 'Selecione',
        options: todasAiesecs,
    });

    buildCombo({
        container: row.querySelector('.como-conheceu-cell'),
        inputId: `bulk-como-conheceu-input-${rowId}`,
        listId: `bulk-como-conheceu-list-${rowId}`,
        hiddenId: `bulk-como-conheceu-hidden-${rowId}`,
        placeholder: 'Selecione',
        options: todasOpcoes_Como_Conheceu,
    });
}

/**
 * Coleta, valida e envia todos os leads da tabela de cadastro em massa.
 */
async function submitBulkLeads() {
    const uiRows = document.querySelectorAll('#bulk-leads-table tbody tr');
    const submitBtn = document.getElementById('submit-bulk-leads');

    // Reseta a UI antes de processar
    const resultsDiv = document.getElementById('bulk-results');
    if (resultsDiv) resultsDiv.innerHTML = '';
    uiRows.forEach(row => row.style.backgroundColor = '');

    submitBtn.disabled = true;

    const leads = [];
    const allValidationErrors = [];

    // Validação prévia para campos vazios
    uiRows.forEach((row, index) => {
        // Adiciona um ID interno para rastrear o status no modal de processamento
        const leadData = {
            nome: row.querySelector('.bulk-nome').value.trim(),
            sobrenome: row.querySelector('.bulk-sobrenome').value.trim(),
            email: row.querySelector('.bulk-email').value.trim(),
            telefone: row.querySelector('.bulk-telefone').value.trim(),
            nascimento: row.querySelector('.bulk-nascimento').value.trim(),
            idProduto: row.querySelector('.produto-cell input[type="hidden"]').value,
            idComite: row.querySelector('.comite-cell input[type="hidden"]').value,
            idCategoria: row.querySelector('.como-conheceu-cell input[type="hidden"]').value,
            tag: row.querySelector('.bulk-tag').value.trim(),
            uiElement: row,
            _internalId: `lead-process-${index}`
        };

        const rowErrors = [];
        if (!leadData.nome) rowErrors.push('Nome');
        if (!leadData.sobrenome) rowErrors.push('Sobrenome');
        if (!leadData.email) rowErrors.push('Email');
        if (!leadData.telefone) rowErrors.push('Telefone');
        if (!leadData.nascimento) rowErrors.push('Nascimento');
        if (!leadData.idProduto) rowErrors.push('Produto');
        if (!leadData.idComite) rowErrors.push('Comitê');
        if (!leadData.idCategoria) rowErrors.push('Como Conheceu');

        if (rowErrors.length > 0) {
            allValidationErrors.push(`Linha ${index + 1}: Faltando ${rowErrors.join(', ')}.`);
            row.style.backgroundColor = '#f8d7da'; // Destaca a linha com erro
        }

        leads.push(leadData);
    });

    if (allValidationErrors.length > 0) {
        showModal({
            title: 'Campos Obrigatórios Não Preenchidos',
            message: ['Por favor, corrija os erros nas linhas destacadas antes de continuar.', ...allValidationErrors],
            type: 'error',
            showConfirm: false,
            showCancel: true,
            cancelText: 'Corrigir'
        });
        submitBtn.disabled = false;
        return; // Aborta o envio
    }

    // Exibe o modal de processamento
    const modalBodyContent = `
        <ul id="bulk-processing-list">
            ${leads.map(lead => `
                <li id="${lead._internalId}">
                    <div class="lead-info">
                        <span class="lead-name">${lead.nome} ${lead.sobrenome}</span>
                        <span class="lead-email">(${lead.email})</span>
                    </div>
                    <div class="lead-status">
                        <div class="spinner-border spinner-border-sm" role="status"></div>
                    </div>
                </li>
            `).join('')}
        </ul>
    `;

    showModal({
        title: "Processando Leads...",
        htmlMessage: modalBodyContent,
        showConfirm: false,
        showCancel: false,
    });

    // Processa os leads e obtém os resultados
    const { successful, failed } = await processAndSendLeads(leads);

    // Após o processamento, atualiza o modal com o resultado final.
    // O usuário fechará o modal manualmente.
    if (failed.length > 0) {
        downloadFailedLeads(failed);
        const failedListHtml = failed.map(lead =>
            `<li><strong>${lead.nome} ${lead.sobrenome}</strong> (${lead.email}): ${lead.errorReason || 'Erro desconhecido'}</li>`
        ).join('');

        updateOpenModal({
            title: "Processamento Concluído com Erros",
            htmlMessage: `
                <p class="text-center">Foram cadastrados <strong>${successful.length} leads com sucesso</strong> e <strong>${failed.length} leads falharam</strong>.</p>
                <p class="text-center" style="font-size: 14px;">O download do arquivo CSV com os detalhes dos erros foi iniciado automaticamente.</p>
                <ul style="font-size: 13px; text-align: left; max-height: 150px; overflow-y: auto; margin-top: 15px;">${failedListHtml}</ul>
            `,
            showConfirm: false,
            cancelText: "OK",
            onCancel: () => {
                // Limpa a UI da tabela de massa
                document.getElementById('bulk-leads-table').querySelector('tbody').innerHTML = '';
                addBulkLeadRow();
            }
        });
    } else {
        updateOpenModal({
            title: "Envio Concluído!",
            message: `Todos os ${successful.length} leads foram cadastrados com sucesso!`,
            showConfirm: false,
            cancelText: "OK",
            onCancel: () => {
                document.getElementById('bulk-leads-table').querySelector('tbody').innerHTML = '';
                addBulkLeadRow();
            }
        });
    }

    submitBtn.disabled = false; // Reabilita o botão
}

/**
 * Processa um lote de leads, mapeando textos para IDs e enviando para a API.
 * @param {Array<object>} leads - Array de objetos de lead.
 * @param {string} resultsDivId - ID do elemento div para exibir os resultados.
 */
async function processAndSendLeads(leads) {
    const successful = [];
    const failed = [];

    // Helper para encontrar ID a partir do texto (case-insensitive)
    const findIdByText = (text, options, fieldName) => {
        if (!text) return { id: null, error: `${fieldName} não preenchido.` };
        const normalizedText = text.trim().toLowerCase();
        const option = options.find(opt => opt.text.trim().toLowerCase() === normalizedText);
        if (!option) return { id: null, error: `${fieldName} "${text}" inválido ou não encontrado.` };
        return { id: option.id, error: null };
    };

    for (const lead of leads) {
        const { nome, sobrenome, email, telefone, nascimento, produto, comite, como_conheceu, tag, idProduto, idComite, idCategoria } = lead;

        const validationErrors = [];
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
        const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;

        // 1. Valida todos os campos obrigatórios
        if (!nome) validationErrors.push('Nome é obrigatório.');
        if (!sobrenome) validationErrors.push('Sobrenome é obrigatório.');
        if (!email) {
            validationErrors.push('Email é obrigatório.');
        } else if (!emailRegex.test(email)) {
            validationErrors.push('Email com formato inválido.');
        }
        const telNumeros = telefone.replace(/\D/g, '');
        if (telNumeros.length < 10 || telNumeros.length > 11) {
            validationErrors.push('Telefone inválido (deve ter 10 ou 11 dígitos).');
        }
        if (!nascimento) {
            validationErrors.push('Nascimento é obrigatório.');
        } else if (!dataRegex.test(nascimento)) {
            validationErrors.push('Data de nascimento inválida (use DD/MM/YYYY).');
        }

        // 2. Valida e resolve IDs para formulário em massa (tem ID) e upload de arquivo (tem texto)
        let finalIdProduto, finalIdComite, finalIdCategoria;
        let nomeCLFinal = '';

        // --- PRODUTO ---
        if (idProduto) {
            finalIdProduto = idProduto;
        } else if (produto) {
            const result = findIdByText(produto, todosProdutos, 'Produto');
            if (result.error) validationErrors.push(result.error); else finalIdProduto = result.id;
        } else {
            validationErrors.push('Produto é obrigatório.');
        }

        // --- COMITÊ (com divisão de mercado) ---
        let comiteOriginalText = '';
        if (idComite) { // Bulk form: ID é fornecido
            const comiteObj = todasAiesecs.find(a => String(a.id) === String(idComite));
            if (comiteObj) {
                comiteOriginalText = comiteObj.text;
            } else {
                validationErrors.push('Comitê selecionado é inválido.');
            }
        } else if (comite) { // File upload: Texto é fornecido
            comiteOriginalText = comite;
        } else {
            validationErrors.push('Comitê é obrigatório.');
        }

        // Aplica a regra de divisão de mercado, se tivermos o produto e o comitê original
        if (finalIdProduto && comiteOriginalText) {
            const divisaoMercado = (String(finalIdProduto) === '1') ? divisaoMercadoGV : divisaoMercadoGT;
            // Extrai o nome da cidade/base do texto do comitê. Ex: "AIESEC em Salvador" -> "salvador"
            const comiteBase = comiteOriginalText
                .replace(/AIESEC\s+(em|no|na)\s+/i, '')
                .replace(/unidade\s+/i, '')
                .trim()
                .toLowerCase();

            // Aplica a divisão de mercado. Se não encontrar, usa o texto original.
            nomeCLFinal = divisaoMercado[comiteBase] || comiteOriginalText;

            // Agora, encontra o ID do comitê final usando a função de busca flexível
            const idEncontrado = getAiesecIdFromNome(nomeCLFinal);
            if (idEncontrado) {
                finalIdComite = idEncontrado;
            } else {
                validationErrors.push(`Comitê "${nomeCLFinal}" (após divisão de mercado) não foi encontrado.`);
            }
        }

        // --- COMO CONHECEU ---
        if (idCategoria) {
            finalIdCategoria = idCategoria;
        } else if (como_conheceu) {
            const result = findIdByText(como_conheceu, todasOpcoes_Como_Conheceu, 'Como Conheceu');
            if (result.error) validationErrors.push(result.error); else finalIdCategoria = result.id;
        } else {
            validationErrors.push('Como Conheceu é obrigatório.');
        }

        // 3. Se houver erros, reporta e pula para o próximo lead
        if (validationErrors.length > 0) {
            updateLeadStatusInModal(lead._internalId, 'error');
            lead.errorReason = validationErrors.join(' ');
            failed.push(lead);
            continue;
        }

        // 4. Se a validação passar, prepara e envia os dados
        const [day, month, year] = nascimento.split('/');
        const nascimentoISO = `${year}-${month}-${day} 00:00:00`;

        const data = {
            nome,
            sobrenome,
            nomeCL: nomeCLFinal,
            tag: slugify(tag || ''),
            idProduto: finalIdProduto,
            idComite: finalIdComite,
            idCategoria: finalIdCategoria,
            emails: [{ email: email, tipo: 'other' }],
            telefones: [{ numero: telefone.replace(/\D/g, ''), tipo: 'other' }],
            dataNascimento: nascimentoISO,
            idAutorizacao: "1",
        };

        const result = await sendLead(data, lead._internalId);

        if (result.success) {
            successful.push(lead);
        } else {
            lead.errorReason = decodeUnicode(result.error);
            failed.push(lead);
        }
    }

    return { successful, failed };
}

function decodeUnicode(str) {
    if (typeof str !== "string") return str;

    return str.replace(/\\u[\dA-F]{4}/gi, (match) =>
        String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16))
    );
}

/**
 * Inicializa o painel de Upload de Arquivo.
 */
function initUploadMode() {
    const panel = document.getElementById('upload-panel');
    if (!panel) return;

    panel.innerHTML = `
        <h3>Upload de Arquivo (.xls, .xlsx)</h3>
        <div id="upload-instructions">
            <p>Faça o upload de um arquivo. A primeira linha deve ser o cabeçalho e a ordem das colunas deve ser: <strong>nome,sobrenome,email,telefone,nascimento,produto,comite,como_conheceu,tag</strong></p>
            <p>Os campos "Produto", "Comitê" e "Como Conheceu" no arquivo de modelo terão uma lista de opções para selecionar. Formato da data: DD/MM/YYYY.</p>
            <p>Em caso de erro, reenvie apenas os leads que apresentaram falha, para evitar duplicidades no pódio.</p>
        </div>
        <div id="template-download-area">
            <p>Não tem um modelo? acesse o link abaixo:</p>
            <button type="button" class="btn btn-info btn-sm" id="access-template-btn">Acessar Online (Google Sheets)</button>
        </div>
        <input type="file" id="file-upload-input" accept=".xls, .xlsx" class="form-control" style="margin-top: 20px;">
        <button type="button" id="submit-file-upload" class="next" style="margin-top: 15px;">Enviar Arquivo</button>
        <div id="upload-results" class="upload-results"></div>
    `;

    document.getElementById('access-template-btn').addEventListener('click', () => {
        window.open('https://docs.google.com/spreadsheets/d/1bHWk9ZFYFuB6gCRSSxH0X5sYT4Jc-PSGO1WIsrLAopE/edit?usp=sharing', '_blank');
    });

    document.getElementById('submit-file-upload').addEventListener('click', async () => {
        const submitBtn = document.getElementById('submit-file-upload');
        const fileInput = document.getElementById('file-upload-input');
        const file = fileInput.files[0];

        if (!file) {
            showModal({ title: 'Nenhum arquivo selecionado', message: 'Por favor, selecione um arquivo para continuar.', showConfirm: false, cancelText: 'OK' });
            return;
        }

        const fileType = file.name.split('.').pop().toLowerCase();
        if (!['xls', 'xlsx'].includes(fileType)) {
            showModal({ title: 'Formato Inválido', message: 'Formato de arquivo inválido. Use .csv, .xls ou .xlsx.', showConfirm: false, cancelText: 'OK' });
            return;
        }

        submitBtn.disabled = true;

        const fileContent = await file.arrayBuffer(); // Lê como ArrayBuffer para o XLSX.js
        await handleFileUpload(fileContent, fileType);

        submitBtn.disabled = false;
    });
}

/**
 * Processa o conteúdo de um arquivo (CSV, XLS, XLSX) e envia os leads.
 * @param {string|ArrayBuffer} fileContent - O conteúdo do arquivo.
 * @param {string} fileType - A extensão do arquivo ('csv', 'xls', 'xlsx').
 */
async function handleFileUpload(fileContent, fileType) {
    const resultsDiv = document.getElementById('upload-results');
    const expectedHeaders = ['nome', 'sobrenome', 'email', 'telefone', 'nascimento', 'produto', 'comite', 'como_conheceu', 'tag'];
    let dataRows = [];

    try {
        const workbook = XLSX.read(fileContent, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        dataRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "", raw: false });

        if (dataRows.length < 2) { // Precisa de cabeçalho + pelo menos uma linha de dados
            throw new Error("O arquivo não contém dados para processar.");
        }

        const headers = dataRows.shift().map(h => String(h || '').trim().toLowerCase());

        // Validar cabeçalhos
        const headerErrors = [];
        expectedHeaders.forEach((expected, index) => {
            const actual = headers[index] || '';
            if (actual !== expected) {
                headerErrors.push(`Coluna ${index + 1}: esperado "${expected}", mas encontrado "${actual}".`);
            }
        });

        if (headers.length !== expectedHeaders.length) {
            headerErrors.push(`O arquivo tem ${headers.length} colunas, mas o esperado são ${expectedHeaders.length}.`);
        }

        if (headerErrors.length > 0) {
            // Usamos \n para quebras de linha no modal
            throw new Error(`O cabeçalho do arquivo está incorreto:\n\n- ${headerErrors.join('\n- ')}`);
        }

        // Validação prévia de campos obrigatórios vazios
        const allValidationErrors = [];
        dataRows.forEach((row, index) => {
            // Pula a validação para linhas que estão completamente em branco.
            if (row.every(cell => !cell || String(cell).trim() === '')) {
                return; // Ignora a linha e continua para a próxima.
            }

            const rowErrors = [];
            // A ordem corresponde aos cabeçalhos esperados
            if (!row[0]) rowErrors.push('nome');
            if (!row[1]) rowErrors.push('sobrenome');
            if (!row[2]) rowErrors.push('email');
            if (!row[3]) rowErrors.push('telefone');
            if (!row[4]) rowErrors.push('nascimento');
            if (!row[5]) rowErrors.push('produto');
            if (!row[6]) rowErrors.push('comite');
            if (!row[7]) rowErrors.push('como_conheceu');

            if (rowErrors.length > 0) {
                // A linha no arquivo é o índice da linha de dados + 2 (cabeçalho + 1-based index)
                allValidationErrors.push(`Linha ${index + 2} do arquivo: Faltando ${rowErrors.join(', ')}.`);
            }
        });

        if (allValidationErrors.length > 0) {
            showModal({
                title: 'Campos Obrigatórios Não Preenchidos',
                message: ['Por favor, corrija os erros no arquivo e faça o upload novamente.', ...allValidationErrors],
                type: 'error',
                showConfirm: false,
                showCancel: true,
                cancelText: 'OK'
            });
            resultsDiv.innerHTML = `<div class="error">Upload cancelado. Corrija os erros no arquivo.</div>`;
            return; // Aborta o processamento
        }

        const leads = dataRows
            .filter(row => row.some(cell => cell && cell.toString().trim() !== '')) // Ignora linhas totalmente vazias
            .map((row, index) => ({
                nome: (row[0] || '').trim(),
                sobrenome: (row[1] || '').trim(),
                email: (row[2] || '').trim(),
                telefone: (row[3] || '').trim(),
                nascimento: (row[4] || '').trim(),
                produto: (row[5] || '').trim(),
                comite: (row[6] || '').trim(),
                como_conheceu: (row[7] || '').trim(),
                tag: (row[8] || '').trim(),
                uiElement: null,
                _internalId: `lead-upload-${index}`
            }));

        // Exibe o modal de processamento
        const modalBodyContent = `
            <ul id="bulk-processing-list">
                ${leads.map(lead => `
                    <li id="${lead._internalId}">
                        <div class="lead-info">
                            <span class="lead-name">${lead.nome} ${lead.sobrenome}</span>
                            <span class="lead-email">(${lead.email})</span>
                        </div>
                        <div class="lead-status">
                            <div class="spinner-border spinner-border-sm" role="status"></div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        `;
        showModal({ title: "Processando Leads do Arquivo...", htmlMessage: modalBodyContent, showConfirm: false, showCancel: false });

        const { successful, failed } = await processAndSendLeads(leads);

        // Após o processamento, atualiza o modal com o resultado final.
        // O usuário fechará o modal manualmente.
        if (failed.length > 0) {
            downloadFailedLeads(failed);
            const failedListHtml = failed.map(lead =>
                `<li><strong>${lead.nome} ${lead.sobrenome}</strong> (${lead.email}): ${lead.errorReason || 'Erro desconhecido'}</li>`
            ).join('');

            updateOpenModal({
                title: "Processamento Concluído com Erros",
                htmlMessage: `
                    <p class="text-center">Foram cadastrados <strong>${successful.length} leads com sucesso</strong> e <strong>${failed.length} leads falharam</strong>.</p>
                    <p class="text-center" style="font-size: 14px;">O download do arquivo CSV com os detalhes dos erros foi iniciado automaticamente.</p>
                    <ul style="font-size: 13px; text-align: left; max-height: 150px; overflow-y: auto; margin-top: 15px;">${failedListHtml}</ul>
                `,
                showConfirm: false,
                cancelText: "OK",
                onCancel: () => {
                    document.getElementById('file-upload-input').value = '';
                    document.getElementById('upload-results').innerHTML = '';
                }
            });
        } else {
            updateOpenModal({
                title: "Envio Concluído!",
                message: `Todos os ${successful.length} leads foram cadastrados com sucesso!`,
                showConfirm: false,
                cancelText: "OK",
                onCancel: () => {
                    document.getElementById('file-upload-input').value = '';
                    document.getElementById('upload-results').innerHTML = '';
                }
            });
        }
    } catch (error) {
        resultsDiv.innerHTML = `<div class="error">Erro ao processar o arquivo: ${error.message}</div>`;
        console.error("Erro no upload:", error);
    }
}

/**
 * Gera e baixa um arquivo de modelo para upload de leads.
 * @param {'xls' | 'xlsx'} format - O formato do arquivo a ser baixado.
 */
function downloadTemplate(format) {
    // 1. Headers and example data
    const headers = ['nome', 'sobrenome', 'email', 'telefone', 'nascimento', 'produto', 'comite', 'como_conheceu', 'tag'];
    const exampleData = [
        'João', 'Silva', 'joao.silva@example.com', '11999998888', '01/01/1995',
        'Voluntário Global', 'AIESEC em Salvador', 'Instagram', 'evento-sp-2024'
    ];
    const mainSheetData = [headers, exampleData];

    // 2. Data for dropdowns (as array of arrays for sheet columns)
    const produtosOptions = todosProdutos.map(p => [p.text]);
    const comitesOptions = todasAiesecs.map(c => [c.text]);
    const comoConheceuOptions = todasOpcoes_Como_Conheceu.map(c => [c.text]);

    // 3. Create workbook and worksheets
    const wb = XLSX.utils.book_new();

    // Main sheet with data
    const ws = XLSX.utils.aoa_to_sheet(mainSheetData);

    // Hidden sheet for all dropdown options
    const ws_options = XLSX.utils.aoa_to_sheet(comitesOptions); // Column A: Comitês
    XLSX.utils.sheet_add_aoa(ws_options, produtosOptions, { origin: 'B1' }); // Column B: Produtos
    XLSX.utils.sheet_add_aoa(ws_options, comoConheceuOptions, { origin: 'C1' }); // Column C: Como Conheceu

    // 4. Set column widths for the main sheet
    ws['!cols'] = [
        { wch: 20 }, // A: nome
        { wch: 20 }, // B: sobrenome
        { wch: 30 }, // C: email
        { wch: 15 }, // D: telefone
        { wch: 12 }, // E: nascimento
        { wch: 30 }, // F: produto
        { wch: 45 }, // G: comite
        { wch: 25 }, // H: como_conheceu
        { wch: 20 }  // I: tag
    ];

    // 5. Add data validation (dropdowns)
    const validationRange = 1000; // Apply validation for the first 1000 rows
    if (!ws['!dataValidations']) ws['!dataValidations'] = [];

    // Produto (Coluna F) - Reference hidden sheet to avoid 255 char limit
    ws['!dataValidations'].push({
        sqref: `F2:F${validationRange}`,
        opts: {
            type: 'list',
            formula1: `'Opcoes'!$B$1:$B$${produtosOptions.length}`,
            showDropDown: true,
            allowBlank: true
        }
    });
    if (produtosOptions.length > 0) {
        ws['!dataValidations'].push({
            sqref: `F2:F${validationRange}`,
            opts: {
                type: 'list',
                formula1: `'Opcoes'!$B$1:$B$${produtosOptions.length}`,
                showDropDown: true,
                allowBlank: true
            }
        });
    }

    // Comitê (Coluna G) - Reference hidden sheet
    ws['!dataValidations'].push({
        sqref: `G2:G${validationRange}`,
        opts: {
            type: 'list',
            formula1: `'Opcoes'!$A$1:$A$${comitesOptions.length}`,
            showDropDown: true,
            allowBlank: true
        }
    });
    if (comitesOptions.length > 0) {
        ws['!dataValidations'].push({
            sqref: `G2:G${validationRange}`,
            opts: {
                type: 'list',
                formula1: `'Opcoes'!$A$1:$A$${comitesOptions.length}`,
                showDropDown: true,
                allowBlank: true
            }
        });
    }

    // Como Conheceu (Coluna H) - Reference hidden sheet to avoid 255 char limit
    ws['!dataValidations'].push({
        sqref: `H2:H${validationRange}`,
        opts: {
            type: 'list',
            formula1: `'Opcoes'!$C$1:$C$${comoConheceuOptions.length}`,
            showDropDown: true,
            allowBlank: true
        }
    });
    if (comoConheceuOptions.length > 0) {
        ws['!dataValidations'].push({
            sqref: `H2:H${validationRange}`,
            opts: {
                type: 'list',
                formula1: `'Opcoes'!$C$1:$C$${comoConheceuOptions.length}`,
                showDropDown: true,
                allowBlank: true
            }
        });
    }

    // 6. Add sheets to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.utils.book_append_sheet(wb, ws_options, "Opcoes");

    // Hide the options sheet
    wb.Sheets["Opcoes"].Hidden = 2; // Oculta a aba de opções do usuário final (2 = "very hidden")

    // 7. Write and download the file
    XLSX.writeFile(wb, `modelo_aiesec_com_opcoes.${format}`);
}

/**
 * Envia um único lead para a API e atualiza a UI com o resultado.
 * @param {object} data - O payload do lead.
 * @param {HTMLElement} uiElement - O elemento da UI (linha da tabela) a ser atualizado.
 * @param {HTMLElement} resultsDiv - O div para logar os resultados.
 */
async function sendLead(data, internalId) {
    const leadIdentifier = data.emails?.[0]?.email || data.nome;
    try {
        console.log(data)
        const response = await fetch("https://baziAiesec.pythonanywhere.com/adicionar-card-b2c", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const responseText = await response.text();
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${responseText}`);
        }

        updateLeadStatusInModal(internalId, 'success');
        return { success: true, data };

    } catch (error) {
        console.error('Erro ao enviar lead:', error);
        updateLeadStatusInModal(internalId, 'error');
        return { success: false, data, error: error.message };
    }
}

/**
 * Atualiza o ícone de status de um lead no modal de processamento.
 * @param {string} internalId - O ID interno do elemento <li> do lead.
 * @param {'success' | 'error'} status - O novo status.
 */
function updateLeadStatusInModal(internalId, status) {
    const listItem = document.getElementById(internalId);
    if (!listItem) return;

    const statusDiv = listItem.querySelector('.lead-status');
    if (!statusDiv) return;

    if (status === 'success') {
        statusDiv.innerHTML = `<i class="bi bi-check-lg status-icon status-success"></i>`;
    } else if (status === 'error') {
        statusDiv.innerHTML = `<i class="bi bi-x-lg status-icon status-error"></i>`;
    }
}

/**
 * Gera e baixa um arquivo CSV com os dados dos leads que falharam.
 * @param {Array} failedLeads - A lista de leads que falharam.
 */
function downloadFailedLeads(failedLeads) {
    const headers = ['nome', 'sobrenome', 'email', 'telefone', 'nascimento', 'produto', 'comite', 'como_conheceu', 'tag', 'motivo_erro'];


    const data = failedLeads.map(lead => {
        // Para os campos de select/combo, usamos o texto original se disponível (upload), ou mapeamos o ID de volta para texto (bulk)
        const produtoText = lead.produto || todosProdutos.find(p => p.id == lead.idProduto)?.text || lead.idProduto;
        const comiteText = lead.comite || todasAiesecs.find(c => c.id == lead.idComite)?.text || lead.idComite;
        const comoConheceuText = lead.como_conheceu || todasOpcoes_Como_Conheceu.find(c => c.id == lead.idCategoria)?.text || lead.idCategoria;

        return [lead.nome, lead.sobrenome, lead.email, lead.telefone, lead.nascimento, produtoText, comiteText, comoConheceuText, lead.tag, lead.errorReason || 'N/A'];
    });

    const sheetData = [headers, ...data];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    ws['!cols'] = [
        { wch: 20 }, // nome
        { wch: 20 }, // sobrenome
        { wch: 30 }, // email
        { wch: 15 }, // telefone
        { wch: 12 }, // nascimento
        { wch: 30 }, // produto
        { wch: 45 }, // comite
        { wch: 25 }, // como_conheceu
        { wch: 20 }, // tag
        { wch: 50 }  // motivo_erro
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads com Erro");
    XLSX.writeFile(wb, "leads_com_erro.xlsx", { bookSST: true });
}