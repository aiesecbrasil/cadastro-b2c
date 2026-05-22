/**
 * @file utils.js
 * @description Módulo de funções utilitárias.
 * Contém funções auxiliares genéricas e reutilizáveis que não dependem
 * do estado da aplicação ou de elementos DOM específicos.
 * Inclui formatadores de string, validadores de campo, e outros helpers.
 */

/**
 * Converte uma string para um formato "slug" (URL amigável).
 * A conversão inclui:
 * - Transformar em minúsculas.
 * - Remover acentos e caracteres especiais (exceto hífen e barra).
 * - Substituir espaços por hífens.
 * Remove acentos, converte para minúsculas e substitui espaços por hífens.
 * @param {string} texto O texto a ser convertido.
 * @returns {string} O texto formatado como slug.
 */
function slugify(texto) {
    if (typeof texto !== 'string') return '';
    return texto
        .toLowerCase() // tudo minúsculo
        .normalize("NFD") // separa letras dos acentos
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/\s+/g, "-") // substitui espaços por hífen
        .replace(/[^a-z0-9-/]/g, "") // mantém letras, números, hífen e barra
        .replace(/-+/g, "-") // evita múltiplos hífens
        .replace(/\/+/g, "/") // evita múltiplas barras
        .replace(/^[-/]+|[-/]+$/g, ""); // remove hífens ou barras no início/fim
}

/**
 * Decodifica sequências de escape unicode em uma string (ex: \\u00e3 -> ã).
 * @param {string} str A string para decodificar.
 * @returns {string} A string decodificada.
 */
function decodeUnicode(str) {
    if (typeof str !== "string") return str;
    return str.replace(/\\u[\dA-F]{4}/gi, (match) =>
        String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16))
    );
}

/**
 * Traduz uma lista de palavras usando um dicionário local.
 * Esta função é usada para internacionalizar (i18n) os tipos de email e telefone vindos da API.
 * Se uma tradução não for encontrada, a palavra original é retornada.
 * @async
 * @param {string[]} palavras Um array de palavras a serem traduzidas.
 * @returns {Promise<Array<{ original: string, traduzido: string }>>} Uma promessa que resolve com um array de objetos contendo a palavra original e sua tradução.
 */
async function traduzirPalavras(palavras) {
    const dicionarioBase = {
        home: "Casa",
        main: "Principal",
        mobile: "Celular",
        other: "Outro",
        private_fax: "Fax Privado",
        work: "Trabalho",
        work_fax: "Fax do Trabalho"
    };

    const traducao = palavras.map(palavra => {
        const limpa = palavra.toLowerCase().trim();
        if (dicionarioBase[limpa]) {
            return { original: palavra, traduzido: dicionarioBase[limpa] };
        }
        if (limpa.includes('fax')) return { original: palavra, traduzido: 'Fax' };
        if (limpa.includes('phone')) return { original: palavra, traduzido: 'Telefone' };
        return { original: palavra, traduzido: palavra };
    });

    return traducao;
}

/**
 * Retorna uma promessa que resolve quando um modal do Bootstrap termina de ser ocultado.
 * Útil para encadear ações que devem ocorrer somente após a animação de fechamento do modal.
 * @param {HTMLElement} modal O elemento do modal.
 * @returns {Promise<void>} Uma promessa que resolve quando o evento 'hidden.bs.modal' é disparado.
 */
function esperarModalFechar(modal) {
    return new Promise(resolve => {
        modal.addEventListener('hidden.bs.modal', function handler() {
            modal.removeEventListener('hidden.bs.modal', handler);
            resolve(false);
        });
    });
}

/**
 * Aplica máscara de telefone brasileiro durante a digitação.
 * Adiciona parênteses, espaços e hífen conforme o usuário digita.
 * Formato: (XX) XXXXX-XXXX.
 * @param {HTMLInputElement} input O elemento de input do telefone.
 */
function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.substring(0, 11);

        if (valor.length > 2) {
            valor = '(' + valor.substring(0, 2) + ') ' + valor.substring(2);
        }
        if (valor.length > 6) {
            valor = valor.substring(0, 6) + ' ' + valor.substring(6);
        }
        if (valor.length > 11) {
            valor = valor.substring(0, 11) + '-' + valor.substring(11);
        }
        e.target.value = valor;
    });
}

/**
 * Remove todos os caracteres não numéricos de um telefone formatado.
 * @param {string} valorFormatado O valor do telefone com máscara.
 * @returns {string} Apenas os dígitos do número de telefone.
 */
function limparTelefoneFormatado(valorFormatado) {
    return String(valorFormatado || '').replace(/\D/g, '');
}

/**
 * Valida um input permitindo apenas letras (inclui acentuadas) e espaços.
 * Anexa um listener ao evento 'blur' do campo para realizar a validação.
 * Exibe uma mensagem de erro se a validação falhar no evento 'blur'.
 * @param {string} id O ID do elemento de input a ser validado.
 * @param {string} erroId O ID do elemento onde a mensagem de erro será exibida.
 */
function validarNome(id, erroId) {
    const input = document.getElementById(id);
    const erro = document.getElementById(erroId);
    if (!input || !erro) return;

    input.addEventListener('blur', function() {
        const regex = /^[A-Za-zÀ-ÿ\s]+$/;
        if (!regex.test(input.value.trim())) {
            erro.textContent = "Use apenas letras e espaços.";
        } else {
            erro.textContent = "";
        }
    });
}

/**
 * Valida formato de e-mail básico no blur.
 * Anexa um listener ao evento 'blur' do campo para realizar a validação.
 * Exibe uma mensagem de erro se a validação falhar no evento 'blur'.
 * @param {HTMLInputElement} input O elemento de input do e-mail.
 */
function validarEmailComProvedor(input) {
    input.addEventListener('blur', function(e) {
        const valor = e.target.value.trim();
        const erro = document.getElementById('erro-email');
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

        if (!regex.test(valor)) {
            if (erro) erro.textContent = "E-mail inválido.";
        } else {
            if (erro) erro.textContent = "";
        }
    });
}