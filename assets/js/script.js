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
    corpo.textContent = backendMsg || normalizedMessage;

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


    // Como conheceu
    const conheceuHidden = document.getElementById('conheceu')?.value;
    if (!conheceuHidden && !selectedAdSourceId) {
        setErro('erro-conheceu', 'Selecione ou digite como você conheceu a AIESEC.');
        camposErro.push('Como conheceu é obrigatório.');
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
        const codigoUniversidade = produtoSlug === 'gv' ? 'ogv' : 'ogt';
        const universidadeInput = document.getElementById('combo-input-universidades')?.value?.trim() || document.getElementById('universidade')?.value?.trim();
        const semUniversidade = document.getElementById('sem-universidade')?.checked || false;
        const aiesecTexto = document.getElementById('combo-input-aiesec')?.value?.trim() || '';
        const conheceuTexto = document.getElementById('combo-input-conheceu')?.value?.trim() || '';
        const nomeCLUniversidade = getNomeCLFromUniversidade(universidadeInput, produtoSlug);
        const divisaoMercado = (selectedProductId == 1) ? divisaoMercadoGV : divisaoMercadoGT;
        const nomeCL = nomeCLUniversidade || aiesecTexto || divisaoMercado[selectedCommitteeText.toLowerCase()] || selectedCommitteeText;
        const comiteMatch = todasAiesecs.find(opcao =>
            opcao.text.toLowerCase().includes(nomeCL.toLowerCase())
        );

        const idComiteParaPodio = comiteMatch ? comiteMatch.id : 39;
        selectedCommitteeId = idComiteParaPodio;
        if (nomeCLUniversidade) {
            const committeeIdMapeado = getAiesecIdFromNome(nomeCLUniversidade);
            if (committeeIdMapeado) {
                selectedCommitteeId = committeeIdMapeado;
                selectedCommitteeText = nomeCLUniversidade;
            }
        }

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

        if (!semUniversidade && document.getElementById('sem-universidade')) {
            dados += `<strong>Universidade</strong>: ${universidadeInput || 'Não informada'}<br>`;
        } else if (semUniversidade && document.getElementById('sem-universidade')) {
            const universidadeTextoAvulso = universidadeInput ? `${universidadeInput} (não listada)` : 'Não está cursando ou não está listada';
            dados += `<strong>Universidade</strong>: ${universidadeTextoAvulso}<br>`;
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

            const tagValue = document.getElementById('tag')?.value?.trim() || slugify(parametros.campanha);

            const mapeamentoProgramas = { 1: 7, 3: 8, 6: 8, 4: 9 };

            const data = {
                // Use the global selectedId variáveis
                nome,
                sobrenome,
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
                const response = await fetch("https://baziAiesec.pythonanywhere.com/adicionar-card", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    let backend = null;
                    try { backend = await response.json(); } catch (_) { backend = null; }
                    throw { status: response.status, backend };
                }

                const result = await response.json();
                itemID = result.data?.item_id || 0;

                itemID = itemID || 0;
                esconderSpinner();
                showModal({
                    title: "Dados enviados com sucesso!",
                    message:
                        `Lead Cadastrado com sucesso`,
                    type: "success",
                    showCancel: false,
                    confirmText: "Ok",
                    onConfirm: () => {
                        resolve(true)
                    }
                });
                esconderSpinner();
                showModal({
                    title: "Dados enviados com sucesso!",
                    message:
                        `Lead Cadastrado com sucesso`,
                    type: "success",
                    showCancel: false,
                    confirmText: "Ok",
                    onConfirm: () => {
                        resolve(true)
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
    const ok = await enviarFormularioObrigatorio();
    if (!ok) return;
})

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

    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" class="bulk-nome" placeholder="Nome"></td>
        <td><input type="text" class="bulk-sobrenome" placeholder="Sobrenome"></td>
        <td><input type="email" class="bulk-email" placeholder="email@exemplo.com"></td>
        <td><input type="tel" class="bulk-telefone" placeholder="11987654321"></td>
        <td><input type="text" class="bulk-nascimento" placeholder="DD/MM/YYYY"></td>
        <td><input type="text" class="bulk-produto" placeholder="Ex: Voluntário Global"></td>
        <td><input type="text" class="bulk-comite" placeholder="Ex: AIESEC em Salvador"></td>
        <td><input type="text" class="bulk-como-conheceu" placeholder="Ex: Instagram"></td>
        <td><input type="text" class="bulk-tag" placeholder="Tag (opcional)"></td>
        <td><button type="button" class="remove-btn" onclick="this.closest('tr').remove()">✖</button></td>
    `;
    tbody.appendChild(row);
}

/**
 * Coleta, valida e envia todos os leads da tabela de cadastro em massa.
 */
async function submitBulkLeads() {
    const uiRows = document.querySelectorAll('#bulk-leads-table tbody tr');
    const submitBtn = document.getElementById('submit-bulk-leads');
    submitBtn.disabled = true;

    const leads = Array.from(uiRows).map(row => ({
        nome: row.querySelector('.bulk-nome').value.trim(),
        sobrenome: row.querySelector('.bulk-sobrenome').value.trim(),
        email: row.querySelector('.bulk-email').value.trim(),
        telefone: row.querySelector('.bulk-telefone').value.trim(),
        nascimento: row.querySelector('.bulk-nascimento').value.trim(),
        produto: row.querySelector('.bulk-produto').value.trim(),
        comite: row.querySelector('.bulk-comite').value.trim(),
        como_conheceu: row.querySelector('.bulk-como-conheceu').value.trim(),
        tag: row.querySelector('.bulk-tag').value.trim(),
        uiElement: row // Mantém referência à linha da tabela para feedback visual
    }));

    await processAndSendLeads(leads, 'bulk-results');

    submitBtn.disabled = false;
}

/**
 * Processa um lote de leads, mapeando textos para IDs e enviando para a API.
 * @param {Array<object>} leads - Array de objetos de lead.
 * @param {string} resultsDivId - ID do elemento div para exibir os resultados.
 */
async function processAndSendLeads(leads, resultsDivId) {
    const resultsDiv = document.getElementById(resultsDivId);
    resultsDiv.innerHTML = '<div>Processando...</div>';

    // Helper para encontrar ID a partir do texto (case-insensitive)
    const findIdByText = (text, options, fieldName) => {
        if (!text) return { id: null, error: `${fieldName} não preenchido.` };
        const normalizedText = text.trim().toLowerCase();
        const option = options.find(opt => opt.text.trim().toLowerCase() === normalizedText);
        if (!option) return { id: null, error: `${fieldName} "${text}" inválido ou não encontrado.` };
        return { id: option.id, error: null };
    };

    for (const lead of leads) {
        const { uiElement, nome, sobrenome, email, telefone, nascimento, produto, comite, como_conheceu, tag } = lead;

        // Validação básica de campos obrigatórios
        if (!nome || !sobrenome || !email || !telefone || !nascimento || !produto || !comite || !como_conheceu) {
            if (uiElement) uiElement.style.backgroundColor = '#f8d7da';
            resultsDiv.innerHTML += `<div class="error">Erro: Linha com dados obrigatórios incompletos (${email || 'sem email'}).</div>`;
            continue;
        }

        // Mapeia texto para ID
        const produtoResult = findIdByText(produto, todosProdutos, 'Produto');
        const comiteResult = findIdByText(comite, todasAiesecs, 'Comitê');
        const categoriaResult = findIdByText(como_conheceu, todasOpcoes_Como_Conheceu, 'Como Conheceu');

        // Verifica se houve erros no mapeamento
        const errors = [produtoResult.error, comiteResult.error, categoriaResult.error].filter(Boolean);
        if (errors.length > 0) {
            if (uiElement) uiElement.style.backgroundColor = '#f8d7da';
            resultsDiv.innerHTML += `<div class="error">Erro em ${email}: ${errors.join(' ')}</div>`;
            continue;
        }

        const [day, month, year] = nascimento.split('/');
        const nascimentoISO = `${year}-${month}-${day} 00:00:00`;

        const data = {
            nome,
            sobrenome,
            email,
            tag: slugify(tag || ''),
            idProduto: produtoResult.id,
            idComite: comiteResult.id,
            idCategoria: categoriaResult.id,
            idprograma: siglaProduto.find(p => p.id === parseInt(produtoResult.id))?.idprograma,
            nomeCL: todasAiesecs.find(a => a.id === comiteResult.id)?.text || 'AIESEC no Brasil',
            emails: [{ email: email, tipo: 'other' }],
            telefones: [{ numero: telefone.replace(/\D/g, ''), tipo: 'other' }],
            dataNascimento: nascimentoISO,
            idAutorizacao: "1",
            idAnuncio: 0,
        };

        await sendLead(data, uiElement, resultsDiv);
    }

    resultsDiv.innerHTML += '<div>Processamento concluído.</div>';
}

/**
 * Inicializa o painel de Upload de Arquivo.
 */
function initUploadMode() {
    const panel = document.getElementById('upload-panel');
    if (!panel) return;

    panel.innerHTML = `
        <h3>Upload de Arquivo (.csv, .xls, .xlsx)</h3>
        <div id="upload-instructions">
            <p>Faça o upload de um arquivo. A primeira linha deve ser o cabeçalho e a ordem das colunas deve ser: <strong>nome,sobrenome,email,telefone,nascimento,produto,comite,como_conheceu,tag</strong></p>
            <p>Para arquivos CSV, use vírgula (,) como separador. Formato da data: DD/MM/YYYY.</p>
        </div>
        <div id="template-download-area">
            <p>Não tem um modelo? Baixe um aqui:</p>
            <button type="button" class="btn btn-secondary btn-sm" id="download-csv">Modelo .csv</button>
            <button type="button" class="btn btn-secondary btn-sm" id="download-xls">Modelo .xls</button>
            <button type="button" class="btn btn-secondary btn-sm" id="download-xlsx">Modelo .xlsx</button>
        </div>
        <input type="file" id="file-upload-input" accept=".csv, .xls, .xlsx" class="form-control" style="margin-top: 20px;">
        <button type="button" id="submit-file-upload" class="next" style="margin-top: 15px;">Enviar Arquivo</button>
        <div id="upload-results" class="upload-results"></div>
    `;

    document.getElementById('download-csv').addEventListener('click', () => downloadTemplate('csv'));
    document.getElementById('download-xls').addEventListener('click', () => downloadTemplate('xls'));
    document.getElementById('download-xlsx').addEventListener('click', () => downloadTemplate('xlsx'));

    document.getElementById('submit-file-upload').addEventListener('click', () => {
        const submitBtn = document.getElementById('submit-file-upload');
        const fileInput = document.getElementById('file-upload-input');
        const file = fileInput.files[0];
        if (!file) {
            alert('Por favor, selecione um arquivo.');
            return;
        }

        const fileType = file.name.split('.').pop().toLowerCase();
        if (!['csv', 'xls', 'xlsx'].includes(fileType)) {
            alert('Formato de arquivo inválido. Use .csv, .xls ou .xlsx.');
            return;
        }

        submitBtn.disabled = true;
        const reader = new FileReader();

        reader.onload = async (event) => {
            await handleFileUpload(event.target.result, fileType);
            submitBtn.disabled = false; // Reabilita o botão após o processamento
        };

        if (fileType === 'csv') {
            reader.readAsText(file);
        } else { // xls, xlsx
            reader.readAsArrayBuffer(file);
        }
    });
}

/**
 * Processa o conteúdo de um arquivo (CSV, XLS, XLSX) e envia os leads.
 * @param {string|ArrayBuffer} fileContent - O conteúdo do arquivo.
 * @param {string} fileType - A extensão do arquivo ('csv', 'xls', 'xlsx').
 */
async function handleFileUpload(fileContent, fileType) {
    const expectedHeaders = ['nome', 'sobrenome', 'email', 'telefone', 'nascimento', 'produto', 'comite', 'como_conheceu', 'tag'];
    let dataRows = [];

    try {
        if (fileType === 'csv') {
            const lines = fileContent.split(/\r\n|\n/).filter(line => line.trim() !== '');
            if (lines.length === 0) throw new Error("Arquivo CSV vazio ou inválido.");
            dataRows = lines.map(line => line.split(','));
        } else { // xls, xlsx
            const workbook = XLSX.read(fileContent, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            // raw: false para garantir que datas e números venham como strings formatadas
            dataRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "", raw: false });
        }

        if (dataRows.length < 2) { // Precisa de cabeçalho + pelo menos uma linha de dados
            throw new Error("O arquivo não contém dados para processar.");
        }

        const headers = dataRows.shift().map(h => String(h || '').trim());

        // Validar cabeçalhos
        if (JSON.stringify(headers) !== JSON.stringify(expectedHeaders)) {
            throw new Error(`O cabeçalho do arquivo está incorreto. A ordem esperada é: ${expectedHeaders.join(', ')}`);
        }

        const leads = dataRows
            .filter(row => row.some(cell => cell && cell.toString().trim() !== '')) // Ignora linhas totalmente vazias
            .map(row => ({
                nome: (row[0] || '').trim(),
                sobrenome: (row[1] || '').trim(),
                email: (row[2] || '').trim(),
                telefone: (row[3] || '').trim(),
                nascimento: (row[4] || '').trim(),
                produto: (row[5] || '').trim(),
                comite: (row[6] || '').trim(),
                como_conheceu: (row[7] || '').trim(),
                tag: (row[8] || '').trim(),
                uiElement: null
            }));

        await processAndSendLeads(leads, 'upload-results');

    } catch (error) {
        document.getElementById('upload-results').innerHTML = `<div class="error">Erro ao processar o arquivo: ${error.message}</div>`;
        console.error("Erro no upload:", error);
    }
}

/**
 * Gera e baixa um arquivo de modelo para upload de leads.
 * @param {'csv' | 'xls' | 'xlsx'} format - O formato do arquivo a ser baixado.
 */
function downloadTemplate(format) {
    const headers = ['nome', 'sobrenome', 'email', 'telefone', 'nascimento', 'produto', 'comite', 'como_conheceu', 'tag'];
    const exampleData = [
        'João',
        'Silva',
        'joao.silva@example.com',
        '11999998888',
        '01/01/1995',
        'Voluntário Global',
        'AIESEC em Salvador',
        'Instagram',
        'evento-sp-2024'
    ];
    const data = [headers, exampleData];

    if (format === 'csv') {
        let csvContent = data.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "modelo_aiesec.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else { // xls, xlsx
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Leads");
        XLSX.writeFile(wb, `modelo_aiesec.${format}`);
    }
}

/**
 * Envia um único lead para a API e atualiza a UI com o resultado.
 * @param {object} data - O payload do lead.
 * @param {HTMLElement} uiElement - O elemento da UI (linha da tabela) a ser atualizado.
 * @param {HTMLElement} resultsDiv - O div para logar os resultados.
 */
async function sendLead(data, uiElement, resultsDiv) {
    try {
        const response = await fetch("https://baziAiesec.pythonanywhere.com/adicionar-card", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorData}`);
        }

        await response.json();
        if (uiElement) uiElement.style.backgroundColor = '#d4edda'; // Sucesso
        resultsDiv.innerHTML += `<div class="success">Sucesso: Lead ${data.email} cadastrado.</div>`;
    } catch (error) {
        console.error('Erro ao enviar lead:', error);
        if (uiElement) uiElement.style.backgroundColor = '#f8d7da'; // Erro
        resultsDiv.innerHTML += `<div class="error">Erro ao cadastrar ${data.email}: ${error.message}</div>`;
    }
}