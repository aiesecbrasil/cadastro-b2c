/**
 * @file ui.js
 * @description Módulo de manipulação da Interface do Usuário (DOM).
 * Este arquivo é responsável por todas as interações diretas com o DOM.
 * Inclui a criação de modais, spinners, campos de formulário dinâmicos
 * (como os combos de autocomplete) e a inicialização dos painéis de cada aba.
 */

/**
 * @typedef {object} OptionItem
 * @property {string|number} id - O valor da opção.
 * @property {string} text - O texto de exibição da opção.
 */

/**
 * Constrói e anexa um componente de combobox com funcionalidade de autocomplete.
 * @param {object} params - Parâmetros de configuração do combobox.
 * @param {HTMLElement} params.container - O elemento pai onde o combo será inserido.
 * @param {string} params.inputId - O ID para o campo de input visível.
 * @param {string} params.listId - O ID para a lista de opções (ul).
 * @param {string} params.hiddenId - O ID para o campo de input oculto que armazenará o valor selecionado.
 * @param {string} params.placeholder - O texto do placeholder para o input.
 * @param {OptionItem[]} params.options - Um array de objetos `{id, text}` para popular as opções.
 * @param {number|null} [params.preselectIndex=null] - O índice da opção a ser pré-selecionada.
 * @param {boolean} [params.hasTags=false] - Se `true`, permite múltiplas seleções exibidas como tags.
 * @param {OptionItem[]|null} [params.selecionados=null] - Array para armazenar as opções selecionadas (usado com `hasTags`).
 * @param {Function|null} [params.filterOption=null] - Uma função de filtro customizada para as opções (usado com `hasTags`).
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

        const filtradas = (options || []).filter(o => {
            if (!o.text.toLowerCase().includes(t)) return false;
            if (hasTags && selecionados.some(s => s.id === o.id)) return false;
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
 * Exibe um modal de Bootstrap padronizado com conteúdo dinâmico.
 * @param {object} options - Opções de configuração do modal.
 * @param {'info'|'success'|'error'} [options.type='info'] - O tipo de modal (atualmente não altera o estilo, mas está presente para futuras implementações).
 * @param {string} [options.title] - O título do modal.
 * @param {string|string[]} [options.message] - A mensagem de texto a ser exibida no corpo do modal.
 * @param {string} [options.htmlMessage] - Uma string HTML para ser inserida diretamente no corpo do modal.
 * @param {boolean} [options.showConfirm=true] - Se `true`, exibe o botão de confirmação.
 * @param {string} [options.confirmText='Confirmar'] - O texto do botão de confirmação.
 * @param {Function} [options.onConfirm] - A função a ser executada quando o botão de confirmação é clicado.
 * @param {boolean} [options.showCancel=true] - Se `true`, exibe o botão de cancelamento.
 * @param {string} [options.cancelText='Cancelar'] - O texto do botão de cancelamento.
 * @param {Function} [options.onCancel] - A função a ser executada quando o botão de cancelamento é clicado.
 * @param {string|Error} [options.backendError] - Um erro vindo do backend para ser exibido no corpo do modal.
 */
function showModal(options) {
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

    const modalEl = document.getElementById('exampleModalLong');
    const myModal = new bootstrap.Modal(modalEl);
    const tituloModal = document.getElementById('exampleModalLongTitle');
    const botaoConfirmar = document.getElementById('botaoConfirmar');
    const botaoCancelar = document.getElementById('botaoCancelar');
    const corpo = document.getElementById('DadosAqui');

    const normalizedMessage = Array.isArray(message) ? message.join('\n') : (message || '');

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

    tituloModal.textContent = title || '';

    if (htmlMessage) {
        corpo.innerHTML = htmlMessage;
    } else {
        corpo.textContent = backendMsg || normalizedMessage;
    }

    botaoConfirmar.style.display = showConfirm ? 'inline-block' : 'none';
    botaoConfirmar.disabled = !showConfirm;
    botaoConfirmar.textContent = confirmText;

    botaoCancelar.style.display = showCancel ? 'inline-block' : 'none';
    botaoCancelar.disabled = !showCancel;
    botaoCancelar.textContent = cancelText;

    botaoConfirmar.replaceWith(botaoConfirmar.cloneNode(true));
    botaoCancelar.replaceWith(botaoCancelar.cloneNode(true));
    const novoConfirmar = document.getElementById('botaoConfirmar');
    const novoCancelar = document.getElementById('botaoCancelar');

    if (showConfirm && typeof onConfirm === 'function') {
        novoConfirmar.addEventListener('click', ev => {
            onConfirm(ev);
            myModal.hide();
        }, { once: true });
    }

    if (showCancel && typeof onCancel === 'function') {
        novoCancelar.addEventListener('click', ev => {
            onCancel(ev);
            myModal.hide();
        }, { once: true });
    }

    myModal.show();
}

/**
 * Atualiza o conteúdo de um modal já aberto, sem reabri-lo.
 * É útil para transições de estado dentro do modal, como de "processando" para "concluído", sem a necessidade de fechar e reabrir.
 * @param {object} options - Opções de configuração do modal (semelhante a `showModal`).
 * @param {string} [options.title] - O novo título do modal.
 * @param {string|string[]} [options.message] - A nova mensagem de texto.
 * @param {string} [options.htmlMessage] - O novo conteúdo HTML.
 * @param {boolean} [options.showConfirm=true] - Define a visibilidade do botão de confirmação.
 * @param {string} [options.confirmText='Confirmar'] - O novo texto do botão de confirmação.
 * @param {Function} [options.onConfirm] - A nova função de callback para o botão de confirmação.
 * @param {boolean} [options.showCancel=true] - Define a visibilidade do botão de cancelamento.
 * @param {string} [options.cancelText='Cancelar'] - O novo texto do botão de cancelamento.
 * @param {Function} [options.onCancel] - A nova função de callback para o botão de cancelamento.
 */
function updateOpenModal(options) {
    const {
        title,
        message,
        htmlMessage,
        showConfirm = true,
        confirmText = 'Confirmar',
        onConfirm,
        showCancel = true,
        cancelText = 'Cancelar',
        onCancel
    } = options || {};

    const modalEl = document.getElementById('exampleModalLong');
    if (!modalEl || !modalEl.classList.contains('show')) {
        showModal(options);
        return;
    }

    const tituloModal = document.getElementById('exampleModalLongTitle');
    const corpo = document.getElementById('DadosAqui');
    const botaoConfirmar = document.getElementById('botaoConfirmar');
    const botaoCancelar = document.getElementById('botaoCancelar');
    const myModal = bootstrap.Modal.getInstance(modalEl);

    tituloModal.textContent = title || '';

    if (htmlMessage) {
        corpo.innerHTML = htmlMessage;
    } else {
        const normalizedMessage = Array.isArray(message) ? message.join('\n') : (message || '');
        corpo.textContent = normalizedMessage;
    }

    botaoConfirmar.style.display = showConfirm ? 'inline-block' : 'none';
    botaoConfirmar.disabled = !showConfirm;
    botaoConfirmar.textContent = confirmText;

    botaoCancelar.style.display = showCancel ? 'inline-block' : 'none';
    botaoCancelar.disabled = !showCancel;
    botaoCancelar.textContent = cancelText;

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

/**
 * Exibe um spinner de carregamento centralizado na tela.
 * Cria um overlay translúcido que bloqueia a interação com o restante da página enquanto o spinner está ativo.
 */
function mostrarSpinner() {
    if (document.getElementById('spinner-overlay')) return;

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
    overlay.style.zIndex = '2000';

    const spinner = document.createElement('div');
    spinner.className = 'spinner-border';
    spinner.role = 'status';

    const texto = document.createElement('p');
    texto.textContent = 'Enviando dados, aguarde...';
    texto.style.color = '#000';
    texto.style.marginTop = '15px';
    texto.style.fontSize = '1.1rem';
    texto.style.fontWeight = '500';

    overlay.appendChild(spinner);
    overlay.appendChild(texto);
    document.body.appendChild(overlay);
}

/**
 * Remove o spinner da tela, caso esteja visível.
 */
function esconderSpinner() {
    const overlay = document.getElementById('spinner-overlay');
    if (overlay) overlay.remove();
}

/**
 * Cria e popula os campos de formulário dinâmicos (Produto, Comitê, Como Conheceu).
 * Utiliza a função `buildCombo` para criar os campos de seleção com autocomplete.
 * Esta função é chamada durante a inicialização do modo de "Cadastro Individual".
 * @param {string|undefined} [programa] - Parâmetro legado, mantido para retrocompatibilidade, mas não utilizado.
 * @param {string|undefined} [comite] - Parâmetro legado, não utilizado atualmente.
 * @param {string|undefined} [anuncio] - Parâmetro legado, não utilizado atualmente.
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
        `;
        const dropdown = document.getElementById('produto');
        dropdown.innerHTML = '';
        dropdown.setAttribute("disabled", "");

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Carregando';
        dropdown.appendChild(defaultOption);

        defaultOption.setAttribute('disabled', '');
        defaultOption.setAttribute('selected', '');

        todosProdutos.forEach((produto) => {
            const newOption = document.createElement("option");
            newOption.value = produto.id;
            newOption.textContent = produto.text;
            if (selectedProductId !== null && String(produto.id) === String(selectedProductId)) {
                newOption.selected = true;
            }
            dropdown.appendChild(newOption);
        });

        defaultOption.textContent = "Selecione";
        dropdown.removeAttribute("disabled");

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

        const containerAiesecProxima = document.getElementById("container-aiesec-proxima");
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
    }
    if (!anuncio) {
        conheceAiesecDiv.innerHTML = `
        <label for="combo-input-conheceu">Como você conheceu a AIESEC? *</label>
        `;

        let preselectIndex = -1;
        if (selectedAdSourceId !== null) {
            preselectIndex = todasOpcoes_Como_Conheceu.findIndex(o => o.id === selectedAdSourceId);
        }

        buildCombo({
            container: conheceAiesecDiv,
            inputId: 'combo-input-conheceu',
            listId: 'combo-list-conheceu',
            hiddenId: 'conheceu',
            placeholder: 'Digite ou selecione',
            options: todasOpcoes_Como_Conheceu,
            preselectIndex: preselectIndex >= 0 ? preselectIndex : undefined
        });

        const hiddenConheceu = document.getElementById('conheceu');
        if (hiddenConheceu) {
            hiddenConheceu.addEventListener('change', (event) => {
                selectedAdSourceId = event.target.value;
            });
        }
        conheceAiesecDiv.insertAdjacentHTML('beforeend', '<div class="error-msg" id="erro-conheceu"></div>');
    }
}

/**
 * Adiciona um novo campo de e-mail dinamicamente ao formulário.
 * O campo inclui um seletor para o tipo de e-mail (ex: Pessoal, Trabalho) e um botão para remoção.
 * @async
 */
async function addEmail() {
    const div = document.createElement('div');
    const tipoEmail = campos.find(field => field.label === "Email");
    const opcoesDeTipoEmail = tipoEmail.config.settings.possible_types;

    div.className = 'campo-multiplo';
    const traducoes = await Promise.all(opcoesDeTipoEmail.map(tipo => traduzirPalavras([tipo])));

    let optionsHTML = '';
    traducoes.forEach(trad => {
        const t = trad[0];
        optionsHTML += `<option value="${t.original.toLowerCase()}" ${t.original === "other" ? 'selected' : ''}>${t.traduzido}</option>`;
    });

    div.innerHTML = `
        <select name="emailTipo[]">${optionsHTML}</select>
        <input type="email" name="email[]" placeholder="Email" />
        <button type="button" class="remove-btn" onclick="removeCampo(this, 'email')">✖</button>
    `;

    containerEmail.appendChild(div);
    validarEmailComProvedor(div.querySelector('input'));

    const botoes = containerEmail.querySelectorAll('.remove-btn');
    botoes.forEach(btn => (btn.disabled = botoes.length === 1));
}

/**
 * Adiciona um novo campo de telefone dinamicamente ao formulário.
 * O campo inclui um seletor para o tipo de telefone, aplica a máscara de formatação e um botão para remoção.
 * @async
 */
async function addTelefone() {
    const div = document.createElement('div');
    const tipoTelefone = campos.find(field => field.label === "Telefone");
    const opcoesDeTipoTelefone = tipoTelefone.config.settings.possible_types;

    div.className = 'campo-multiplo';
    const traducoes = await Promise.all(opcoesDeTipoTelefone.map(tipo => traduzirPalavras([tipo])));

    let optionsHTML = '';
    traducoes.forEach(trad => {
        const t = trad[0];
        optionsHTML += `<option value="${t.original.toLowerCase()}" ${t.original === "other" ? 'selected' : ''}>${t.traduzido}</option>`;
    });

    div.innerHTML = `
        <select name="telefoneTipo[]">${optionsHTML}</select>
        <input type="tel" name="telefone[]" placeholder="Telefone" />
        <button type="button" class="remove-btn" onclick="removeCampo(this, 'telefone')">✖</button>
    `;

    containerTelefone.appendChild(div);
    aplicarMascaraTelefone(div.querySelector('input'));

    const botoes = containerTelefone.querySelectorAll('.remove-btn');
    botoes.forEach(btn => (btn.disabled = botoes.length === 1));
}

/**
 * Remove um campo de e-mail ou telefone do formulário.
 * Garante que pelo menos um campo de cada tipo sempre permaneça no formulário.
 * @param {HTMLButtonElement} botao - O botão de remoção que foi clicado.
 * @param {'email'|'telefone'} tipo - O tipo de campo a ser removido.
 */
function removeCampo(botao, tipo) {
    const container = tipo === 'email' ? containerEmail : containerTelefone;
    if (container.children.length > 1) {
        container.removeChild(botao.parentNode);
    }
    if (container.children.length === 1) {
        const ultimoBotao = container.querySelector('.remove-btn');
        if (ultimoBotao) ultimoBotao.disabled = true;
    }
}

/**
 * Inicializa o componente de calendário Pikaday.
 * Configura a internacionalização (i18n) para português e a sincronização entre o input visível (DD/MM/YYYY)
 * e um input oculto que armazena a data no formato ISO (YYYY-MM-DD) para a API.
 */
function initPikaday() {
    const inputVisivel = document.getElementById('nascimento');
    const inputISO = document.getElementById('nascimento-iso');

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
        onSelect: function(date) {
            if (date instanceof Date && !isNaN(date)) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                inputVisivel.value = `${day}/${month}/${year}`;
                inputISO.value = `${year}-${month}-${day} 00:00:00`;
                this.setDate(date, true);
            }
        }
    });

    inputVisivel.addEventListener('input', () => {
        let valor = inputVisivel.value.replace(/\D/g, '');
        if (valor.length > 2 && valor.length <= 4) {
            valor = valor.substring(0, 2) + '/' + valor.substring(2);
        } else if (valor.length > 4) {
            valor = valor.substring(0, 2) + '/' + valor.substring(2, 4) + '/' + valor.substring(4, 8);
        }
        inputVisivel.value = valor;

        if (valor.length === 10) {
            const [day, month, year] = valor.split('/').map(Number);
            const date = new Date(year, month - 1, day);
            if (!isNaN(date)) {
                picker.setDate(date);
            }
        }
    });
}

/**
 * Inicializa o painel de Cadastro em Massa.
 * A estrutura HTML principal já existe estaticamente no `index.html`. Esta função
 * apenas anexa os listeners de evento aos botões "Adicionar Lead" e "Enviar Todos"
 * e adiciona a primeira linha à tabela.
 * Anexa os listeners de evento aos botões "Adicionar Lead" e "Enviar Todos".
 */
function initBulkMode() {
    const panel = document.getElementById('bulk-panel');
    // O 'dataset.initialized' previne que os eventos sejam anexados múltiplas vezes,
    // o que é importante devido ao carregamento "preguiçoso" (lazy loading) das abas.
    if (!panel || panel.dataset.initialized === 'true') return;

    document.getElementById('add-bulk-lead').addEventListener('click', addBulkLeadRow);
    document.getElementById('submit-bulk-leads').addEventListener('click', submitBulkLeads);

    addBulkLeadRow();
    panel.dataset.initialized = 'true';
}

/**
 * Adiciona uma nova linha à tabela de cadastro em massa.
 * Cada célula da linha contém um campo de input ou um componente de combo para a inserção dos dados do lead.
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

    const telInput = row.querySelector('.bulk-telefone');
    if (telInput) aplicarMascaraTelefone(telInput);

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
 * Inicializa o painel de Upload de Arquivo.
 * A estrutura HTML já existe estaticamente no `index.html`. Esta função
 * apenas anexa os listeners de evento aos botões de acesso ao template e de envio do arquivo.
 * Anexa os listeners de evento aos botões de template e de envio.
 */
function initUploadMode() {
    const panel = document.getElementById('upload-panel');
    // O 'dataset.initialized' previne que os eventos sejam anexados múltiplas vezes (lazy loading).
    if (!panel || panel.dataset.initialized === 'true') return;

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
            showModal({ title: 'Formato Inválido', message: 'Formato de arquivo inválido. Use .xls ou .xlsx.', showConfirm: false, cancelText: 'OK' });
            return;
        }

        submitBtn.disabled = true;
        const fileContent = await file.arrayBuffer();
        await handleFileUpload(fileContent, fileType);
        submitBtn.disabled = false;
    });

    panel.dataset.initialized = 'true';
}

/**
 * Atualiza o ícone de status de um lead no modal de processamento.
 * Troca o spinner de carregamento por um ícone de sucesso (check) ou erro (X).
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
 * Fecha o modal se estiver aberto e limpa o backdrop.
 * Garante que a interface volte a um estado normal, removendo classes (`modal-open`) e elementos (`.modal-backdrop`)
 * que o Bootstrap adiciona ao `body`.
 */
function fecharModalSeAberto() {
    const modalEl = document.getElementById('exampleModalLong');
    if (!modalEl) return;

    const modalInst = bootstrap.Modal.getInstance(modalEl);
    if (modalInst) {
        modalInst.hide();
    }

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }

    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}