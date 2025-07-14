// script.js

// Importa os dados da planilha de um arquivo separado
import { planData } from 'data.js';

// Mapeamento para exibir nomes amigáveis para os tipos de equipe
const equipeNames = {
    "sem_chefe_sem_diretor_clinico": "Sem Chefe de Equipe e Sem Diretor Clínico",
    "com_chefe_sem_diretor_clinico": "Com Chefe de Equipe e Sem Diretor Clínico",
    "sem_chefe_com_diretor_clinico": "Sem Chefe de Equipe e Com Diretor Clínico",
    "com_chefe_com_diretor_clinico": "Com Chefe de Equipe e Com Diretor Clínico"
};

// Mapeamento para exibir nomes amigáveis para os grupos/especialidades
const grupoNames = {
    "G2": "G2 (Farmácia sem Estética)",
    "G5": "G5 (Farmácia com Estética)"
};

document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const importanciaSlider = document.getElementById('importancia-slider');
    const importanciaDisplay = document.getElementById('importancia-display');
    const cotarButton = document.getElementById('cotar-button');
    const resultadoDiv = document.getElementById('resultado');
    const messageBox = document.getElementById('message-box');

    let validImportancias = []; // Array para armazenar os valores de importância segurada válidos e ordenados

    // Funções auxiliares para mostrar/esconder mensagens e resultados
    function showMessage(message, type = 'warning') {
        messageBox.textContent = message;
        messageBox.className = `mt-4 p-4 rounded-md ${type === 'error' ? 'bg-red-100 border-red-400 text-red-800' : 'bg-yellow-100 border-yellow-400 text-yellow-800'} block`;
        resultadoDiv.classList.add('hidden'); // Esconde o resultado ao mostrar mensagem
        console.log('Mensagem exibida:', message);
    }

    function hideMessage() {
        messageBox.classList.add('hidden');
    }

    function showResult() {
        resultadoDiv.classList.remove('hidden');
        hideMessage(); // Esconde a mensagem ao mostrar resultado
        console.log('Resultado exibido.');
    }

    function hideResult() {
        resultadoDiv.classList.add('hidden');
    }

    // Função para encontrar o valor de importância segurada mais próximo e válido
    function findClosestImportance(currentValue) {
        if (validImportancias.includes(currentValue)) {
            return currentValue; // Se o valor já é um dos válidos, retorna ele mesmo
        }

        let lowerBound = validImportancias[0];
        let upperBound = validImportancias[validImportancias.length - 1];

        // Encontra os dois valores válidos mais próximos (um abaixo e um acima)
        for (let i = 0; i < validImportancias.length; i++) {
            if (validImportancias[i] <= currentValue) {
                lowerBound = validImportancias[i];
            }
            if (validImportancias[i] >= currentValue) {
                upperBound = validImportancias[i];
                break; // Encontrou o limite superior, pode parar
            }
        }

        // Determina qual dos dois limites é mais próximo
        const diffToLower = Math.abs(currentValue - lowerBound);
        const diffToUpper = Math.abs(currentValue - upperBound);

        if (diffToLower <= diffToUpper) {
            return lowerBound;
        } else {
            return upperBound;
        }
    }

    // Configura o slider de Importância Segurada com passos personalizados
    function setupImportanciaSlider() {
        // Coleta todos os valores únicos de importancia_segurada e os ordena
        const importanciasSet = new Set(planData.map(item => item.importancia_segurada));
        validImportancias = Array.from(importanciasSet).sort((a, b) => a - b); // Armazena os valores válidos ordenados

        const minImportancia = validImportancias[0];
        const maxImportancia = validImportancias[validImportancias.length - 1];

        importanciaSlider.min = minImportancia;
        importanciaSlider.max = maxImportancia;
        importanciaSlider.step = 1; // Define o passo como 1 para permitir movimento granular, o "snap" será feito no JS

        // Define o valor inicial do slider para o primeiro valor válido
        importanciaSlider.value = minImportancia;

        // Atualiza o display do valor do slider
        importanciaDisplay.textContent = parseFloat(importanciaSlider.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        console.log('Slider de importância segurada configurado com passos personalizados.');
        console.log('Valores de importância válidos:', validImportancias);
    }

    // Chama a função para configurar o slider ao carregar a página
    setupImportanciaSlider();

    // Adiciona um listener para atualizar o display e "snapar" o valor quando o slider for movido
    importanciaSlider.addEventListener('input', () => {
        const currentValue = parseFloat(importanciaSlider.value);
        const snappedValue = findClosestImportance(currentValue);

        // Atualiza o valor real do slider para o valor "snapado"
        importanciaSlider.value = snappedValue;

        // Atualiza o display
        importanciaDisplay.textContent = snappedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });

    cotarButton.addEventListener('click', () => {
        console.log('Botão Cotar clicado!');

        hideResult(); // Esconde o resultado anterior
        hideMessage(); // Esconde mensagens anteriores

        // Obtém o valor do radio button selecionado para Grupo
        const selectedGrupoRadio = document.querySelector('input[name="grupo"]:checked');
        const selectedGrupo = selectedGrupoRadio ? selectedGrupoRadio.value : '';

        // Obtém o valor do radio button selecionado para Tipo de Equipe
        const selectedEquipeRadio = document.querySelector('input[name="equipe"]:checked');
        const selectedEquipeKey = selectedEquipeRadio ? selectedEquipeRadio.value : '';

        // Obtém o valor do slider (que já está "snapado" para um valor válido)
        const selectedImportancia = parseFloat(importanciaSlider.value);

        console.log('Valores selecionados:', {
            grupo: selectedGrupo,
            importancia: selectedImportancia,
            equipeKey: selectedEquipeKey
        });

        // Validação dos campos
        if (!selectedGrupo || !selectedEquipeKey || isNaN(selectedImportancia)) {
            showMessage('Por favor, selecione o Tipo de Equipe, o Grupo e a Importância Segurada.', 'warning');
            console.log('Validação falhou: campos incompletos ou importância inválida.');
            return;
        }

        // Encontra o item correspondente na planData
        const foundItem = planData.find(item =>
            item.grupo === selectedGrupo &&
            item.importancia_segurada === selectedImportancia
        );

        console.log('Item encontrado na base de dados:', foundItem);

        if (foundItem) {
            const cota = foundItem[selectedEquipeKey];
            console.log('Cota específica para a equipe:', cota);

            if (cota) {
                // Exibe os resultados
                document.getElementById('res-grupo').textContent = grupoNames[selectedGrupo];
                document.getElementById('res-especialidade').textContent = grupoNames[selectedGrupo].split('(')[1].replace(')', '');
                document.getElementById('res-importancia').textContent = selectedImportancia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                document.getElementById('res-equipe').textContent = equipeNames[selectedEquipeKey];
                document.getElementById('res-premio').textContent = cota.premio_total_ano.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                document.getElementById('res-parcelamento').textContent = cota.parcelamento_maximo_meses;
                document.getElementById('res-condicao').textContent = cota.parcela_minima_condicao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                showResult();
            } else {
                showMessage('Dados de cotação não encontrados para o tipo de equipe selecionado. Por favor, verifique suas opções.', 'error');
                console.log('Erro: Cota para a equipe específica não encontrada.');
            }
        } else {
            showMessage('Não foi encontrado um plano com as seleções de Grupo e Importância Segurada informadas. Verifique os valores.', 'error');
            console.log('Erro: Item não encontrado para Grupo e Importância Segurada.');
        }
    });
});
