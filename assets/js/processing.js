/**
 * @file processing.js
 * @description Módulo de Lógica de Negócio (Business Logic).
 * Este arquivo cuida do processamento e validação de dados antes do envio para a API.
 * Inclui validação de dados, processamento de leads para envio,
 * manipulação de arquivos de upload e geração de relatórios de erro.
 */

/**
 * Mapeia o texto de um produto para um slug ('gv' ou 'gt').
 * Este slug é usado para determinar qual conjunto de regras de divisão de mercado (`divisaoMercadoGV` ou `divisaoMercadoGT`) aplicar.
 * @param {string} textoProduto - O nome do produto (ex: "Voluntário Global").
 * @returns {'gv'|'gt'|'unknown'} O slug correspondente ('gv' para Voluntário, 'gt' para Talento)
 * ou 'unknown' se não for reconhecido.
 */
function getProdutoSlug(textoProduto) {
    const slug = String(textoProduto || '').toLowerCase();
    if (slug.includes('gv') || slug.includes('volunt')) return 'gv';
    if (slug.includes('gt') || slug.includes('talento')) return 'gt';
    return 'unknown';
}

/**
 * Retorna um array de opções de universidade formatado para o componente `buildCombo`.
 * A lógica para determinar o ID da universidade pode variar com base no produto (GV/GT),
 * lendo as chaves `ogv` ou `ogt` do objeto de universidades.
 * @param {'gv'|'gt'|'unknown'} produtoSlug - O slug do produto para determinar a lógica de ID.
 * @typedef {{id: string|number, text: string}} OptionItem
 * @returns {OptionItem[]} Um array de objetos de opção `{id, text}`.
 */
function getUniversidadesPorProduto(produtoSlug) {
    const optionKey = produtoSlug === 'gv' ? 'ogv' : 'ogt';
    let source = universidades?.universidades || universidades;
    if (!source || (typeof source !== 'object' && !Array.isArray(source))) return [];

    const normalizeId = (item, name) => {
        if (!item && !name) return null;
        if (typeof item === 'string') return item;
        const possibleId = item[optionKey] || item[optionKey?.toLowerCase?.()] || item['ogv'] || item['ogt'] || item.id || name;
        return possibleId != null ? String(possibleId).trim() : null;
    };

    const normalizeText = (item, name) => {
        const rawText = item?.nome || item?.text || item?.label || name || '';
        return String(rawText).toLowerCase().includes('mc bazi') ? 'Aiesec no Brasil' : String(rawText).trim();
    };

    let lista = [];
    if (Array.isArray(source)) {
        lista = source.filter(u => u && (u.nome || u.text || u.label)).map(u => {
            const text = normalizeText(u);
            let id = normalizeId(u, text);
            if (text.toLowerCase().includes('aiesec no brasil')) id = 'Aiesec no Brasil';
            return { id: id || text, text };
        });
    } else {
        lista = Object.entries(source || {}).filter(([nome, data]) => nome && data).map(([nome, data]) => {
            const text = normalizeText(data, nome);
            let id = normalizeId(data, nome);
            if (text.toLowerCase().includes('aiesec no brasil')) id = 'Aiesec no Brasil';
            return { id: id || text, text };
        });
    }

    if (!lista.length) {
        lista = [
            { id: 'FIAP', text: 'FIAP' }, { id: 'USP', text: 'USP' }, { id: 'Mackenzie', text: 'Mackenzie' },
            { id: 'PUC', text: 'PUC' }, { id: 'UNESP', text: 'UNESP' }, { id: 'UNICAMP', text: 'UNICAMP' }
        ];
    }
    if (!lista.some(item => String(item.text).toLowerCase() === 'outra')) {
        lista.push({ id: 'Outra', text: 'Outra' });
    }
    return lista;
}

/**
 * Obtém o slug do produto atualmente selecionado no formulário.
 * @returns {'gv'|'gt'|'unknown'} O slug do produto selecionado.
 */
function getSelectedProductSlug() {
    if (selectedProductId && Array.isArray(todosProdutos)) {
        const produto = todosProdutos.find(p => String(p.id) === String(selectedProductId));
        if (produto && produto.text) return getProdutoSlug(produto.text);
    }
    const produtoSelect = document.getElementById('produto');
    if (produtoSelect && produtoSelect.options.length > 0) {
        const selectedOpt = produtoSelect.options[produtoSelect.selectedIndex];
        if (selectedOpt && selectedOpt.text) return getProdutoSlug(selectedOpt.text);
    }
    return 'unknown';
}

/**
 * Obtém o nome do comitê (CL) de destino com base na universidade e no produto (divisão de mercado).
 * @param {string} universidadeText - O nome da universidade.
 * @param {'gv'|'gt'} produtoSlug - O slug do produto.
 * @returns {string|null} O nome do comitê de destino ou `null` se não for encontrado.
 */
function getNomeCLFromUniversidade(universidadeText, produtoSlug) {
    if (!universidadeText || !produtoSlug) return null;
    const source = universidades?.universidades || universidades;
    if (!source || typeof source !== 'object') return null;

    const normalized = universidadeText.trim().toLowerCase();
    const key = Object.keys(source).find(k => String(k).trim().toLowerCase() === normalized);
    const entry = key ? source[key] : source[universidadeText];
    if (!entry || typeof entry !== 'object') return null;

    const optKey = produtoSlug === 'gv' ? 'ogv' : 'ogt';
    let value = entry[optKey] || entry[optKey.toLowerCase?.()] || entry['ogv'] || entry['ogt'];
    if (value) return String(value).trim();

    if (entry.nome || entry.text || entry.label) {
        return String(entry.nome || entry.text || entry.label).trim();
    }
    return null;
}

/**
 * Encontra o ID de um comitê AIESEC com base em seu nome.
 * @param {string} nomeCL - O nome do comitê.
 * @returns {string|number|null} O ID do comitê ou `null` se não for encontrado.
 */
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

/**
 * Função de filtro para o combo de idiomas.
 * Impede que o usuário selecione o mesmo idioma com níveis de proficiência diferentes (ex: "Inglês - Básico" e "Inglês - Avançado").
 * @param {OptionItem} option - A opção a ser avaliada.
 * @param {OptionItem[]} selecionados - O array de opções já selecionadas.
 * @returns {boolean} `true` se a opção for válida, `false` caso contrário.
 */
function filtroIdiomas(option, selecionados) {
    const idiomaBase = option.text.split(' - ')[0];
    return !selecionados.some(sel => sel.text.startsWith(idiomaBase + ' -'));
}

/**
 * Valida os campos obrigatórios do formulário de cadastro individual.
 * Exibe mensagens de erro diretamente no DOM ao lado de cada campo inválido.
 * @returns {boolean|undefined} Retorna `true` se todos os campos forem válidos.
 * Caso contrário, exibe um modal com os erros e não retorna nada.
 */
function validarDadosObrigatorios() {
    let valido = true;
    const camposErro = [];
    const setErro = (id, message) => {
        const el = document.getElementById(id);
        if (el) el.textContent = message;
    };
    const clearErro = (id) => setErro(id, '');

    const nome = document.getElementById('nome')?.value.trim() || '';
    const sobrenome = document.getElementById('sobrenome')?.value.trim() || '';
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!nomeRegex.test(nome)) { setErro('erro-nome', 'Nome inválido.'); camposErro.push('Nome inválido.'); valido = false; } else clearErro('erro-nome');
    if (!nomeRegex.test(sobrenome)) { setErro('erro-sobrenome', 'Sobrenome inválido.'); camposErro.push('Sobrenome inválido.'); valido = false; } else clearErro('erro-sobrenome');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    const emails = Array.from(document.querySelectorAll('input[name="email[]"]'));
    let emailTemErro = emails.length === 0 || emails.some(input => !emailRegex.test((input.value || '').trim()));
    if (emailTemErro) { setErro('erro-email', 'Informe pelo menos um e-mail válido.'); camposErro.push('E-mail inválido.'); valido = false; } else clearErro('erro-email');

    const telefones = Array.from(document.querySelectorAll('input[name="telefone[]"]'));
    let telefoneTemErro = telefones.length === 0 || telefones.some(input => limparTelefoneFormatado(input.value).length < 10);
    if (telefoneTemErro) { setErro('erro-telefone', 'Informe pelo menos um telefone válido.'); camposErro.push('Telefone inválido.'); valido = false; } else clearErro('erro-telefone');

    const nascimento = document.getElementById('nascimento')?.value.trim() || '';
    const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dataRegex.test(nascimento)) { setErro('erro-nascimento', 'Data inválida.'); camposErro.push('Data inválida.'); valido = false; } else clearErro('erro-nascimento');

    if (!selectedProductId) { setErro('erro-produto', 'Selecione o produto.'); camposErro.push('Produto não selecionado.'); valido = false; } else clearErro('erro-produto');

    const aiesecHidden = document.getElementById('aiesecs')?.value;
    if (!aiesecHidden && !selectedCommitteeId) { setErro('erro-aiesec', 'Selecione o comitê.'); camposErro.push('Comitê não selecionado.'); valido = false; } else clearErro('erro-aiesec');

    const conheceuHidden = document.getElementById('conheceu')?.value;
    if (!conheceuHidden && !selectedAdSourceId) { setErro('erro-conheceu', 'Selecione como conheceu a AIESEC.'); camposErro.push('Como conheceu não selecionado.'); valido = false; } else clearErro('erro-conheceu');

    const politica = document.getElementById('politica')?.checked;
    if (!politica) { setErro('erro-politica', 'Você deve aceitar a política de privacidade.'); camposErro.push('Política não aceita.'); valido = false; } else clearErro('erro-politica');

    if (valido) return true;

    return showModal({
        title: 'Dados incorretos.',
        message: `Por favor, corrija os erros e tente novamente.\n\n${camposErro.map(campo => `- ${campo}`).join('\n')}`,
        type: 'error',
        showConfirm: false,
        showCancel: true,
        cancelText: 'Corrigir'
    });
}

/**
 * Orquestra o envio do formulário individual.
 * Coleta os dados, mostra um modal de confirmação para o usuário e, se confirmado, envia os dados para a API.
 * @returns {Promise<boolean>} Uma promessa que resolve como `true` se o envio for bem-sucedido.
 */
async function enviarFormularioObrigatorio() {
    return new Promise(resolve => {
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const emails = Array.from(document.querySelectorAll('input[name="email[]"]')).map((el, i) => ({
            email: el.value,
            tipo: document.querySelectorAll('select[name="emailTipo[]"]')[i].value,
            tipoTraduzido: document.querySelectorAll('select[name="emailTipo[]"]')[i].selectedOptions[0].text
        }));
        const telefones = Array.from(document.querySelectorAll('input[name="telefone[]"]')).map((el, i) => ({
            numero: el.value,
            tipo: document.querySelectorAll('select[name="telefoneTipo[]"]')[i].value,
            tipoTraduzido: document.querySelectorAll('select[name="telefoneTipo[]"]')[i].selectedOptions[0].text
        }));

        const aiesecTexto = document.getElementById('combo-input-aiesec')?.value?.trim() || '';
        const divisaoMercado = (selectedProductId == 1) ? divisaoMercadoGV : divisaoMercadoGT;
        const nomeCL = aiesecTexto || divisaoMercado[selectedCommitteeText?.toLowerCase()] || selectedCommitteeText;

        let dados = `<strong>Nome</strong>: ${nome}<br><strong>Sobrenome</strong>: ${sobrenome}<br><strong>Emails</strong>: ${emails.map(e => `${e.email} (${e.tipoTraduzido})`).join('<br>\t')}<br>
<strong>Telefones</strong>: ${telefones.map(t => `${t.numero} (${t.tipoTraduzido})`).join('<br>\t')}<br>
<strong>Data de Nascimento</strong>: ${document.getElementById('nascimento').value}<br>`;
        if (produtoSolicitado) dados += `<strong>Produto</strong>: ${produtoSolicitado.options[produtoSolicitado.selectedIndex].textContent}<br>`;
        if (aiesecTexto) dados += `<strong>AiESEC mais próxima</strong>: ${nomeCL || selectedCommitteeText}<br>`;
        if (document.getElementById('combo-input-conheceu')?.value) dados += `<strong>Como conheceu</strong>: ${document.getElementById('combo-input-conheceu').value}<br>`;
        dados += `<strong>Aceitou Política</strong>: Sim`;

        showModal({
            title: "Confirme seus dados",
            htmlMessage: dados,
            confirmText: "Confirmar",
            cancelText: "Editar dados",
            onConfirm: async () => {
                mostrarSpinner();

                const comiteMatch = todasAiesecs.find(opcao => opcao.text.toLowerCase().includes(nomeCL?.toLowerCase()));
                let finalCommitteeId = comiteMatch ? comiteMatch.id : 39;

                if (aiesecTexto) {
                    const committeeIdMapeado = getAiesecIdFromNome(divisaoMercado[aiesecTexto.replace("AIESEC em ", "").replace("AIESEC no ", "").toLowerCase()]);
                    finalCommitteeId = committeeIdMapeado || aiesecTexto;
                }

                const data = {
                    nome,
                    sobrenome,
                    nomeCL: nomeCL || selectedCommitteeText,
                    emails: emails.map(e => ({ email: e.email, tipo: e.tipo })),
                    telefones: telefones.map(t => ({ numero: limparTelefoneFormatado(t.numero), tipo: t.tipo })),
                    dataNascimento: document.getElementById('nascimento-iso').value,
                    idProduto: selectedProductId,
                    idComite: nomeCL == "MC BAZI" ? 39 : finalCommitteeId,
                    idCategoria: selectedAdSourceId,
                    idAutorizacao: "1",
                    tag: slugify(document.getElementById('tag')?.value?.trim())
                };

                try {
                    await sendLeadToApi(data);
                    esconderSpinner();
                    showModal({
                        title: "Dados enviados com sucesso!",
                        message: "Lead Cadastrado com sucesso",
                        type: "success",
                        showCancel: false,
                        confirmText: "Ok",
                        onConfirm: () => {
                            document.getElementById("meuForm").reset();
                            resolve(true);
                        }
                    });
                } catch (err) {
                    esconderSpinner();
                    showModal({
                        title: "Falha ao Enviar",
                        message: "Ocorreu um erro. Por favor, tente novamente.",
                        type: "error",
                        showConfirm: false,
                        cancelText: "Corrigir",
                        backendError: err.message,
                    });
                    resolve(false);
                }
            },
            onCancel: () => resolve(false)
        });
    });
}

/**
 * Coleta, valida e envia todos os leads da tabela de cadastro em massa.
 * Exibe um modal de processamento que mostra o status de envio de cada lead individualmente.
 * Ao final, informa o resultado e oferece o download de um arquivo com os leads que falharam.
 * @async
 */
async function submitBulkLeads() {
    const uiRows = document.querySelectorAll('#bulk-leads-table tbody tr');
    const submitBtn = document.getElementById('submit-bulk-leads');
    submitBtn.disabled = true;

    const leads = Array.from(uiRows).map((row, index) => ({
        nome: row.querySelector('.bulk-nome').value.trim(),
        sobrenome: row.querySelector('.bulk-sobrenome').value.trim(),
        email: row.querySelector('.bulk-email').value.trim(),
        telefone: row.querySelector('.bulk-telefone').value.trim(),
        nascimento: row.querySelector('.bulk-nascimento').value.trim(),
        idProduto: row.querySelector('.produto-cell input[type="hidden"]').value,
        idComite: row.querySelector('.comite-cell input[type="hidden"]').value,
        idCategoria: row.querySelector('.como-conheceu-cell input[type="hidden"]').value,
        tag: row.querySelector('.bulk-tag').value.trim(),
        _internalId: `lead-process-${index}`
    }));

    const modalBodyContent = `
        <ul id="bulk-processing-list">
            ${leads.map(lead => `
                <li id="${lead._internalId}">
                    <div class="lead-info">
                        <span class="lead-name">${lead.nome} ${lead.sobrenome}</span>
                        <span class="lead-email">(${lead.email})</span>
                    </div>
                    <div class="lead-status"><div class="spinner-border spinner-border-sm" role="status"></div></div>
                </li>
            `).join('')}
        </ul>
    `;
    showModal({ title: "Processando Leads...", htmlMessage: modalBodyContent, showConfirm: false, showCancel: false });

    const { successful, failed } = await processAndSendLeads(leads);

    if (failed.length > 0) {
        downloadFailedLeads(failed);
        const failedListHtml = failed.map(lead => `<li><strong>${lead.nome} ${lead.sobrenome}</strong> (${lead.email}): ${lead.errorReason || 'Erro desconhecido'}</li>`).join('');
        updateOpenModal({
            title: "Processamento Concluído com Erros",
            htmlMessage: `<p>Cadastrados <strong>${successful.length} com sucesso</strong> e <strong>${failed.length} falharam</strong>.</p><p style="font-size: 14px;">O download do arquivo com os erros foi iniciado.</p><ul style="font-size: 13px; max-height: 150px; overflow-y: auto; margin-top: 15px;">${failedListHtml}</ul>`,
            showConfirm: false,
            cancelText: "OK",
            onCancel: () => {
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
    submitBtn.disabled = false;
}

/**
 * Processa o conteúdo de um arquivo (XLS, XLSX) e envia os leads.
 * Utiliza a biblioteca `XLSX` (SheetJS) para ler o arquivo. Valida o cabeçalho e os dados de cada linha.
 * @async
 * @param {ArrayBuffer} fileContent - O conteúdo do arquivo.
 * @param {string} fileType - A extensão do arquivo (não utilizada atualmente, mas mantida para referência).
 */
async function handleFileUpload(fileContent, fileType) {
    const resultsDiv = document.getElementById('upload-results');
    try {
        const workbook = XLSX.read(fileContent, { type: 'array', cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const dataRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

        if (dataRows.length < 2) throw new Error("O arquivo não contém dados para processar.");

        const headers = dataRows.shift().map(h => String(h || '').trim().toLowerCase());
        const expectedHeaders = ['nome', 'sobrenome', 'email', 'telefone', 'nascimento', 'produto', 'comite', 'como_conheceu', 'tag'];
        const headerErrors = [];
        expectedHeaders.forEach((expected, index) => {
            if ((headers[index] || '') !== expected) {
                headerErrors.push(`Coluna ${index + 1}: esperado "${expected}", mas encontrado "${headers[index] || ''}".`);
            }
        });
        if (headerErrors.length > 0) throw new Error(`Cabeçalho do arquivo incorreto:\n\n- ${headerErrors.join('\n- ')}`);

        const leads = dataRows
            .filter(row => row.some(cell => cell && cell.toString().trim() !== ''))
            .map((row, index) => ({
                nome: (row[0] || '').trim(),
                sobrenome: (row[1] || '').trim(),
                email: (row[2] || '').trim(),
                telefone: (row[3] || ''),
                nascimento: row[4],
                produto: (row[5] || '').trim(),
                comite: (row[6] || '').trim(),
                como_conheceu: (row[7] || '').trim(),
                tag: (row[8] || '').trim(),
                _internalId: `lead-upload-${index}`
            }));

        const modalBodyContent = `
            <ul id="bulk-processing-list">
                ${leads.map(lead => `
                    <li id="${lead._internalId}">
                        <div class="lead-info"><span class="lead-name">${lead.nome} ${lead.sobrenome}</span><span class="lead-email">(${lead.email})</span></div>
                        <div class="lead-status"><div class="spinner-border spinner-border-sm" role="status"></div></div>
                    </li>
                `).join('')}
            </ul>
        `;
        showModal({ title: "Processando Leads do Arquivo...", htmlMessage: modalBodyContent, showConfirm: false, showCancel: false });

        const { successful, failed } = await processAndSendLeads(leads);

        if (failed.length > 0) {
            downloadFailedLeads(failed);
            const failedListHtml = failed.map(lead => `<li><strong>${lead.nome} ${lead.sobrenome}</strong> (${lead.email}): ${lead.errorReason || 'Erro desconhecido'}</li>`).join('');
            updateOpenModal({
                title: "Processamento Concluído com Erros",
                htmlMessage: `<p>Cadastrados <strong>${successful.length} com sucesso</strong> e <strong>${failed.length} falharam</strong>.</p><p style="font-size: 14px;">O download do arquivo com os erros foi iniciado.</p><ul style="font-size: 13px; max-height: 150px; overflow-y: auto; margin-top: 15px;">${failedListHtml}</ul>`,
                showConfirm: false,
                cancelText: "OK",
                onCancel: () => {
                    document.getElementById('file-upload-input').value = '';
                    resultsDiv.innerHTML = '';
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
                    resultsDiv.innerHTML = '';
                }
            });
        }
    } catch (error) {
        resultsDiv.innerHTML = `<div class="error">Erro ao processar o arquivo: ${error.message}</div>`;
        console.error("Erro no upload:", error);
    }
}

/**
 * Processa um lote de leads, mapeando textos para IDs e enviando para a API.
 * @async
 * @param {Array<object>} leads - Array de objetos de lead, vindos da tabela de cadastro em massa ou do arquivo de upload.
 * @description Esta é uma função central que valida cada lead, converte campos de texto (como "Produto") em seus respectivos IDs, e os envia para a API um a um.
 * @returns {Promise<{successful: Array<object>, failed: Array<object>}>} Um objeto contendo arrays de leads bem-sucedidos e com falha.
 */
async function processAndSendLeads(leads) {
    const successful = [];
    const failed = [];

    const findIdByText = (text, options, fieldName) => {
        if (!text) return { id: null, error: `${fieldName} não preenchido.` };
        const normalizedText = text.trim().toLowerCase();
        const option = options.find(opt => opt.text.trim().toLowerCase() === normalizedText);
        return option ? { id: option.id, error: null } : { id: null, error: `${fieldName} "${text}" inválido.` };
    };

    for (const lead of leads) {
        const { nome, sobrenome, email, telefone, nascimento, produto, comite, como_conheceu, tag, idProduto, idComite, idCategoria } = lead;
        const validationErrors = [];
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

        if (!nome) validationErrors.push('Nome é obrigatório.');
        if (!sobrenome) validationErrors.push('Sobrenome é obrigatório.');
        if (!email || !emailRegex.test(email)) validationErrors.push('Email inválido.');
        if (limparTelefoneFormatado(telefone).length < 10) validationErrors.push('Telefone inválido.');

        let nascimentoISO = null;
        let nascimentoParaFalha = nascimento;
        if (nascimento instanceof Date && !isNaN(nascimento)) {
            const day = String(nascimento.getDate()).padStart(2, '0');
            const month = String(nascimento.getMonth() + 1).padStart(2, '0');
            const year = nascimento.getFullYear();
            nascimentoISO = `${year}-${month}-${day} 00:00:00`;
            nascimentoParaFalha = `${day}/${month}/${year}`;
        } else if (typeof nascimento === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(nascimento.trim())) {
            const [day, month, year] = nascimento.trim().split('/');
            nascimentoISO = `${year}-${month}-${day} 00:00:00`;
        } else {
            validationErrors.push('Data de nascimento inválida (use DD/MM/YYYY).');
        }

        let finalIdProduto, finalIdComite, finalIdCategoria;
        let nomeCLFinal = '';

        if (idProduto) {
            finalIdProduto = idProduto;
        } else if (produto) {
            const result = findIdByText(produto, todosProdutos, 'Produto');
            if (result.error) validationErrors.push(result.error); else finalIdProduto = result.id;
        } else {
            validationErrors.push('Produto é obrigatório.');
        }

        let comiteOriginalText = '';
        if (idComite) {
            comiteOriginalText = todasAiesecs.find(a => String(a.id) === String(idComite))?.text || '';
            if (!comiteOriginalText) validationErrors.push('Comitê selecionado é inválido.');
        } else if (comite) {
            comiteOriginalText = comite;
        } else {
            validationErrors.push('Comitê é obrigatório.');
        }

        if (finalIdProduto && comiteOriginalText) {
            const divisaoMercado = (String(finalIdProduto) === '1') ? divisaoMercadoGV : divisaoMercadoGT;
            const comiteBase = comiteOriginalText.replace(/AIESEC\s+(em|no|na)\s+/i, '').replace(/unidade\s+/i, '').trim().toLowerCase();
            nomeCLFinal = divisaoMercado[comiteBase] || comiteOriginalText;
            const idEncontrado = getAiesecIdFromNome(nomeCLFinal);
            if (idEncontrado) {
                finalIdComite = idEncontrado;
            } else {
                validationErrors.push(`Comitê "${nomeCLFinal}" não foi encontrado.`);
            }
        }

        if (idCategoria) {
            finalIdCategoria = idCategoria;
        } else if (como_conheceu) {
            const result = findIdByText(como_conheceu, todasOpcoes_Como_Conheceu, 'Como Conheceu');
            if (result.error) validationErrors.push(result.error); else finalIdCategoria = result.id;
        } else {
            validationErrors.push('Como Conheceu é obrigatório.');
        }

        if (validationErrors.length > 0) {
            updateLeadStatusInModal(lead._internalId, 'error');
            lead.errorReason = validationErrors.join(' ');
            lead.nascimento = nascimentoParaFalha;
            failed.push(lead);
            continue;
        }

        const data = {
            nome, sobrenome, tag: slugify(tag || ''),
            nomeCL: nomeCLFinal.replace(/AIESEC\s+(em|no|na)\s+/i, '').replace(/unidade\s+/i, '').replace(/são paulo\s+/i, '').trim().toLowerCase(),
            idProduto: finalIdProduto,
            idComite: finalIdComite,
            idCategoria: finalIdCategoria,
            emails: [{ email: email, tipo: 'other' }],
            telefones: [{ numero: limparTelefoneFormatado(telefone), tipo: 'other' }],
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

/**
 * Envia um único lead para a API e atualiza a UI com o resultado.
 * Esta função é um wrapper para `sendLeadToApi` que também atualiza o status do lead no modal de processamento.
 * @async
 * @param {object} data - O payload do lead.
 * @param {string} internalId - O ID interno do elemento `<li>` do lead no modal de processamento.
 * @returns {Promise<{success: boolean, data: object, error?: string}>} Um objeto indicando o sucesso da operação.
 */
async function sendLead(data, internalId) {
    try {
        await sendLeadToApi(data);
        updateLeadStatusInModal(internalId, 'success');
        return { success: true, data };
    } catch (error) {
        console.error('Erro ao enviar lead:', error);
        updateLeadStatusInModal(internalId, 'error');
        return { success: false, data, error: error.message };
    }
}

/**
 * Gera e baixa um arquivo XLSX com os dados dos leads que falharam.
 * @param {Array<object>} failedLeads - A lista de leads que falharam.
 * @description O arquivo gerado inclui uma coluna extra "motivo_erro" para que o usuário possa corrigir e reenviar os dados.
 */
function downloadFailedLeads(failedLeads) {
    const headers = ['nome', 'sobrenome', 'email', 'telefone', 'nascimento', 'produto', 'comite', 'como_conheceu', 'tag', 'motivo_erro'];

    const data = failedLeads.map(lead => {
        const produtoText = lead.produto || todosProdutos.find(p => p.id == lead.idProduto)?.text || lead.idProduto;
        const comiteText = lead.comite || todasAiesecs.find(c => c.id == lead.idComite)?.text || lead.idComite;
        const comoConheceuText = lead.como_conheceu || todasOpcoes_Como_Conheceu.find(c => c.id == lead.idCategoria)?.text || lead.idCategoria;

        let nascimentoText = lead.nascimento;
        if (nascimentoText instanceof Date && !isNaN(nascimentoText)) {
            const day = String(nascimentoText.getDate()).padStart(2, '0');
            const month = String(nascimentoText.getMonth() + 1).padStart(2, '0');
            const year = nascimentoText.getFullYear();
            nascimentoText = `${day}/${month}/${year}`;
        }

        return [lead.nome, lead.sobrenome, lead.email, lead.telefone, nascimentoText, produtoText, comiteText, comoConheceuText, lead.tag, lead.errorReason || 'N/A'];
    });

    const sheetData = [headers, ...data];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    ws['!cols'] = [
        { wch: 20 }, { wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 12 },
        { wch: 30 }, { wch: 45 }, { wch: 25 }, { wch: 20 }, { wch: 50 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads com Erro");
    XLSX.writeFile(wb, "leads_com_erro.xlsx", { bookSST: true });
}