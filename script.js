import { planData } from './planData.js';

const equipeNames = {
    "sem_chefe_sem_diretor_clinico": "Sem Chefe de Equipe e Sem Diretor Clínico",
    "com_chefe_sem_diretor_clinico": "Com Chefe de Equipe e Sem Diretor Clínico",
    "sem_chefe_com_diretor_clinico": "Sem Chefe de Equipe e Com Diretor Clínico",
    "com_chefe_com_diretor_clinico": "Com Chefe de Equipe e Com Diretor Clínico"
};

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

    function showMessage(message, type = 'warning') {
        messageBox.textContent = message;
        messageBox.className = `mt-4 p-4 rounded-md ${type === 'error' ? 'bg-red-100 border-red-400 text-red-800' : 'bg-yellow-100 border-yellow-400 text-yellow-800'} block`;
        resultadoDiv.classList.add('hidden');
        console.log('Mensagem exibida:', message);
    }

    function hideMessage() {
        messageBox.classList.add('hidden');
    }

    function showResult() {
        resultadoDiv.classList.remove('hidden');
        hideMessage();
        console.log('Resultado exibido.');
    }

    function hideResult() {
        resultadoDiv.classList.add('hidden');
    }

    function findClosestImportance(currentValue) {
        if (validImportancias.includes(currentValue)) {
            return currentValue;
        }

        let lowerBound = validImportancias[0];
        let upperBound = validImportancias[validImportancias.length - 1];

        for (let i = 0; i < validImportancias.length; i++) {
            if (validImportancias[i] <= currentValue) {
                lowerBound = validImportancias[i];
            }
            if (validImportancias[i] >= currentValue) {
                upperBound = validImportancias[i];
                break;
            }
        }

        const diffToLower = Math.abs(currentValue - lowerBound);
        const diffToUpper = Math.abs(currentValue - upperBound);

        if (diffToLower <= diffToUpper) {
            return lowerBound;
        } else {
            return upperBound;
        }
    }

    function setupImportanciaSlider() {
        const importanciasSet = new Set(planData.map(item => item.importancia_segurada));
        validImportancias = Array.from(importanciasSet).sort((a, b) => a - b);

        const minImportancia = validImportancias[0];
        const maxImportancia = validImportancias[validImportancias.length - 1];

        importanciaSlider.min = minImportancia;
        importanciaSlider.max = maxImportancia;
        importanciaSlider.step = 1; 

        importanciaSlider.value = minImportancia;

        importanciaDisplay.textContent = parseFloat(importanciaSlider.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        console.log('Slider de importância segurada configurado com passos personalizados.');
        console.log('Valores de importância válidos:', validImportancias);
    }

    setupImportanciaSlider();

    importanciaSlider.addEventListener('input', () => {
        const currentValue = parseFloat(importanciaSlider.value);
        const snappedValue = findClosestImportance(currentValue);

        importanciaSlider.value = snappedValue;

        importanciaDisplay.textContent = snappedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });

    cotarButton.addEventListener('click', () => {
        console.log('Botão Cotar clicado!');

        hideResult();
        hideMessage();

        const selectedGrupoRadio = document.querySelector('input[name="grupo"]:checked');
        const selectedGrupo = selectedGrupoRadio ? selectedGrupoRadio.value : '';

        const selectedEquipeRadio = document.querySelector('input[name="equipe"]:checked');
        const selectedEquipeKey = selectedEquipeRadio ? selectedEquipeRadio.value : '';

        const selectedImportancia = parseFloat(importanciaSlider.value);

        console.log('Valores selecionados:', {
            grupo: selectedGrupo,
            importancia: selectedImportancia,
            equipeKey: selectedEquipeKey
        });

        if (!selectedGrupo || !selectedEquipeKey || isNaN(selectedImportancia)) {
            showMessage('Por favor, selecione o Tipo de Equipe, o Grupo e a Importância Segurada.', 'warning');
            console.log('Validação falhou: campos incompletos ou importância inválida.');
            return;
        }

        const foundItem = planData.find(item =>
            item.grupo === selectedGrupo &&
            item.importancia_segurada === selectedImportancia
        );

        console.log('Item encontrado na base de dados:', foundItem);

        if (foundItem) {
            const cota = foundItem[selectedEquipeKey];
            console.log('Cota específica para a equipe:', cota);

            if (cota) {
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
