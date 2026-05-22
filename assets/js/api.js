/**
 * @file api.js
 * @description Módulo de comunicação com a API.
 * Este arquivo centraliza todas as chamadas `fetch` para o backend,
 * abstraindo a lógica de requisição e tratamento de respostas HTTP.
 * Abstrai as chamadas de `fetch` para serem reutilizadas.
 */

/**
 * URL base da API do backend.
 * @type {string}
 */
const API_BASE_URL = 'https://baziaiesec.pythonanywhere.com';

/**
 * Busca os metadados (campos, universidades) do servidor.
 * @async
 * @returns {Promise<object>} Uma promessa que resolve com os dados de metadados da API.
 * @throws {Error} Lança um erro se a requisição de rede falhar ou a resposta não for bem-sucedida (status não-2xx).
 */
async function fetchMetadata() {
    const response = await fetch(`${API_BASE_URL}/metadados-card`);
    if (!response.ok) {
        throw new Error('Falha ao buscar metadados do servidor.');
    }
    return await response.json();
}

/**
 * Envia um único lead para a API.
 * @async
 * @param {object} data - O payload do lead.
 * @returns {Promise<object>} Uma promessa que resolve com a resposta JSON do servidor em caso de sucesso.
 * @throws {Error} Lança um erro se a requisição de rede falhar ou se a API retornar um status de erro. A mensagem de erro
 * é extraída do corpo da resposta da API (`responseData.error`), se disponível, para fornecer um feedback mais claro.
 */
async function sendLeadToApi(data) {
    const response = await fetch(`${API_BASE_URL}/adicionar-card-b2c`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (!response.ok) {
        const errorMessage = responseData.error || `A requisição falhou com o status ${response.status}`;
        throw new Error(errorMessage);
    }
    return responseData;
}