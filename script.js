// script.js

// Importa os dados da planilha de um arquivo separado
import { planData, planDataEmpresarial, franquiaDataEmpresarial } from './planData.js';

// Mapeamento para exibir nomes amigáveis para os tipos de equipe (Pessoal)
const equipeNames = {
    "sem_chefe_sem_diretor_clinico": "Sem Chefe de Equipe e Sem Diretor Clínico",
    "com_chefe_sem_diretor_clinico": "Com Chefe de Equipe e Sem Diretor Clínico",
    "sem_chefe_com_diretor_clinico": "Sem Chefe de Equipe e Com Diretor Clínico",
    "com_chefe_com_diretor_clinico": "Com Chefe de Equipe e Com Diretor Clínico"
};

// Mapeamento para exibir nomes amigáveis para os grupos/especialidades (Pessoal)
const grupoNamesPessoal = {
    "G2": "G2 (Farmácia sem Estética)",
    "G5": "G5 (Farmácia com Estética)"
};

// Mapeamento para exibir nomes amigáveis para os grupos/tipos de instituição (Empresarial)
const grupoNamesEmpresarial = {
    "G1": "G1 (Farmácia sem estética)",
    "G3": "G3 (Farmácia de Manipulação)",
    "G6": "G6 (Farmácia com estética²)"
};

// Mapeamento para exibir nomes amigáveis para quantidade de profissionais (Empresarial)
const profissionaisNamesEmpresarial = {
    "de_2_a_10_profissionais": "De 2 até 10 Profissionais",
    "de_11_a_20_profissionais": "De 11 até 20 Profissionais",
    "de_21_a_30_profissionais": "De 21 até 30 Profissionais",
    "de_31_a_50_profissionais": "De 31 até 50 Profissionais"
};


document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM comuns
    const tipoCotacaoRadios = document.querySelectorAll('input[name="tipo_cotacao"]');
    const formPessoal = document.getElementById('form-pessoal');
    const formEmpresarial = document.getElementById('form-empresarial');
    const messageBox = document.getElementById('message-box');

    // Referências aos elementos do DOM do formulário Pessoal
    const importanciaSliderPessoal = document.getElementById('importancia-slider-pessoal');
    const importanciaDisplayPessoal = document.getElementById('importancia-display-pessoal');
    const cotarButtonPessoal = document.getElementById('cotar-button-pessoal');
    const resultadoPessoalDiv = document.getElementById('resultado-pessoal');

    // Referências aos elementos do DOM do formulário Empresarial
    const lmgSliderEmpresarial = document.getElementById('lmg-slider-empresarial');
    const lmgDisplayEmpresarial = document.getElementById('lmg-display-empresarial');
    const cotarButtonEmpresarial = document.getElementById('cotar-button-empresarial');
    const resultadoEmpresarialDiv = document.getElementById('resultado-empresarial');

    let validImportanciasPessoal = []; // Valores válidos para slider Pessoal
    let validLMGsEmpresarial = []; // Valores válidos para slider Empresarial

    // --- Funções Auxiliares ---
    function showMessage(message, type = 'warning') {
        messageBox.textContent = message;
        messageBox.className = `mt-4 p-4 rounded-md ${type === 'error' ? 'bg-red-100 border-red-400 text-red-800' : 'bg-yellow-100 border-yellow-400 text-yellow-800'} block`;
        resultadoPessoalDiv.classList.add('hidden'); // Esconde ambos os resultados ao mostrar mensagem
        resultadoEmpresarialDiv.classList.add('hidden');
        console.log('Mensagem exibida:', message);
    }

    function hideMessage() {
        messageBox.classList.add('hidden');
    }

    function hideAllResults() {
        resultadoPessoalDiv.classList.add('hidden');
        resultadoEmpresarialDiv.classList.add('hidden');
        hideMessage();
    }

    // Função para encontrar o valor mais próximo e válido (genérica)
    function findClosestValue(currentValue, validValues) {
        if (validValues.includes(currentValue)) {
            return currentValue;
        }

        let lowerBound = validValues[0];
        let upperBound = validValues[validValues.length - 1];

        for (let i = 0; i < validValues.length; i++) {
            if (validValues[i] <= currentValue) {
                lowerBound = validValues[i];
            }
            if (validValues[i] >= currentValue) {
                upperBound = validValues[i];
                break;
            }
        }

        const diffToLower = Math.abs(currentValue - lowerBound);
        const diffToUpper = Math.abs(currentValue - upperBound);

        return (diffToLower <= diffToUpper) ? lowerBound : upperBound;
    }


    function setupRadioSelection(radioGroupName, optionClass) {
        const radios = document.querySelectorAll(`input[name="${radioGroupName}"]`);
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                // Remove a classe 'selected' de todas as opções no grupo
                radios.forEach(otherRadio => {
                    const parentLabel = otherRadio.closest(`.${optionClass}`);
                    if (parentLabel) {
                        parentLabel.classList.remove('selected');
                    }
                });

                // Adiciona a classe 'selected' apenas à opção selecionada
                if (radio.checked) {
                    const parentLabel = radio.closest(`.${optionClass}`);
                    if (parentLabel) {
                        parentLabel.classList.add('selected');
                    }
                }
            });
        });
    // --- Lógica do Formulário Pessoal ---
    function setupImportanciaSliderPessoal() {
        const importanciasSet = new Set(planData.map(item => item.importancia_segurada));
        validImportanciasPessoal = Array.from(importanciasSet).sort((a, b) => a - b);

        const minImportancia = validImportanciasPessoal[0];
        const maxImportancia = validImportanciasPessoal[validImportanciasPessoal.length - 1];

        importanciaSliderPessoal.min = minImportancia;
        importanciaSliderPessoal.max = maxImportancia;
        importanciaSliderPessoal.step = 1; // Snapping handled by JS

        importanciaSliderPessoal.value = minImportancia;
        importanciaDisplayPessoal.textContent = parseFloat(importanciaSliderPessoal.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        importanciaSliderPessoal.addEventListener('input', () => {
            const currentValue = parseFloat(importanciaSliderPessoal.value);
            const snappedValue = findClosestValue(currentValue, validImportanciasPessoal);
            importanciaSliderPessoal.value = snappedValue;
            importanciaDisplayPessoal.textContent = snappedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        });
        console.log('Slider de importância segurada Pessoal configurado.');
    }

    cotarButtonPessoal.addEventListener('click', () => {
        console.log('Botão Cotar Pessoal clicado!');
        hideAllResults();

        const selectedGrupoRadio = document.querySelector('input[name="grupo_pessoal"]:checked');
        const selectedGrupo = selectedGrupoRadio ? selectedGrupoRadio.value : '';

        const selectedEquipeRadio = document.querySelector('input[name="equipe_pessoal"]:checked');
        const selectedEquipeKey = selectedEquipeRadio ? selectedEquipeRadio.value : '';

        const selectedImportancia = parseFloat(importanciaSliderPessoal.value);

        if (!selectedGrupo || !selectedEquipeKey || isNaN(selectedImportancia)) {
            showMessage('Por favor, selecione o Tipo de Equipe, o Grupo e a Importância Segurada para a Cotação Pessoal.', 'warning');
            return;
        }

        const foundItem = planData.find(item =>
            item.grupo === selectedGrupo &&
            item.importancia_segurada === selectedImportancia
        );

        if (foundItem) {
            const cota = foundItem[selectedEquipeKey];
            if (cota) {
                document.getElementById('res-grupo-pessoal').textContent = grupoNamesPessoal[selectedGrupo];
                document.getElementById('res-especialidade-pessoal').textContent = grupoNamesPessoal[selectedGrupo].split('(')[1].replace(')', '');
                document.getElementById('res-importancia-pessoal').textContent = selectedImportancia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                document.getElementById('res-equipe-pessoal').textContent = equipeNames[selectedEquipeKey];
                document.getElementById('res-premio-pessoal').textContent = cota.premio_total_ano.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                document.getElementById('res-parcelamento-pessoal').textContent = cota.parcelamento_maximo_meses;
                document.getElementById('res-condicao-pessoal').textContent = cota.parcela_minima_condicao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                resultadoPessoalDiv.classList.remove('hidden');
                hideMessage();
            } else {
                showMessage('Dados de cotação não encontrados para o tipo de equipe selecionado no formulário Pessoal. Verifique suas opções.', 'error');
            }
        } else {
            showMessage('Não foi encontrado um plano com as seleções de Grupo e Importância Segurada informadas no formulário Pessoal. Verifique os valores.', 'error');
        }
    });

    // --- Lógica do Formulário Empresarial ---
    function setupLMGSliderEmpresarial() {
        const lmgsSet = new Set(planDataEmpresarial.map(item => item.lmg));
        validLMGsEmpresarial = Array.from(lmgsSet).sort((a, b) => a - b);

        const minLMG = validLMGsEmpresarial[0];
        const maxLMG = validLMGsEmpresarial[validLMGsEmpresarial.length - 1];

        lmgSliderEmpresarial.min = minLMG;
        lmgSliderEmpresarial.max = maxLMG;
        lmgSliderEmpresarial.step = 1; // Snapping handled by JS

        lmgSliderEmpresarial.value = minLMG;
        lmgDisplayEmpresarial.textContent = parseFloat(lmgSliderEmpresarial.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        lmgSliderEmpresarial.addEventListener('input', () => {
            const currentValue = parseFloat(lmgSliderEmpresarial.value);
            const snappedValue = findClosestValue(currentValue, validLMGsEmpresarial);
            lmgSliderEmpresarial.value = snappedValue;
            lmgDisplayEmpresarial.textContent = snappedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        });
        console.log('Slider de LMG Empresarial configurado.');
    }

    cotarButtonEmpresarial.addEventListener('click', () => {
        console.log('Botão Cotar Empresarial clicado!');
        hideAllResults();

        const selectedGrupoRadio = document.querySelector('input[name="grupo_empresarial"]:checked');
        const selectedGrupo = selectedGrupoRadio ? selectedGrupoRadio.value : '';

        const selectedProfissionaisRadio = document.querySelector('input[name="profissionais_empresarial"]:checked');
        const selectedProfissionaisKey = selectedProfissionaisRadio ? selectedProfissionaisRadio.value : '';

        const selectedLMG = parseFloat(lmgSliderEmpresarial.value);

        if (!selectedGrupo || !selectedProfissionaisKey || isNaN(selectedLMG)) {
            showMessage('Por favor, selecione o Grupo, a Quantidade de Profissionais e o LMG para a Cotação Empresarial.', 'warning');
            return;
        }

        const foundItem = planDataEmpresarial.find(item =>
            item.grupo === selectedGrupo &&
            item.quantidade_profissionais_key === selectedProfissionaisKey &&
            item.lmg === selectedLMG
        );

        const foundFranquia = franquiaDataEmpresarial.find(item => item.lmg === selectedLMG);

        if (foundItem) {
            document.getElementById('res-grupo-empresarial').textContent = grupoNamesEmpresarial[selectedGrupo];
            document.getElementById('res-tipo-instituicao-empresarial').textContent = foundItem.tipo_instituicao;
            document.getElementById('res-profissionais-empresarial').textContent = profissionaisNamesEmpresarial[selectedProfissionaisKey];
            document.getElementById('res-lmg-empresarial').textContent = selectedLMG.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.getElementById('res-premio-empresarial').textContent = foundItem.premio_a_vista.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.getElementById('res-franquia-empresarial').textContent = foundFranquia ? foundFranquia.franquia_texto : 'Não disponível';

            resultadoEmpresarialDiv.classList.remove('hidden');
            hideMessage();
        } else {
            showMessage('Não foi encontrado um plano com as seleções de Grupo, Profissionais e LMG informadas no formulário Empresarial. Verifique os valores.', 'error');
        }
    });

    // --- Lógica de Alternância de Formulário ---
    function toggleFormVisibility() {
        const selectedType = document.querySelector('input[name="tipo_cotacao"]:checked').value;
        hideAllResults(); // Esconde resultados e mensagens ao trocar de formulário

        if (selectedType === 'pessoal') {
            formPessoal.classList.remove('hidden');
            formEmpresarial.classList.add('hidden');
        } else {
            formPessoal.classList.add('hidden');
            formEmpresarial.classList.remove('hidden');
        }
        console.log('Tipo de cotação selecionado:', selectedType);

    }

    // Cotação Pessoal
    setupRadioSelection('equipe_pessoal', 'card-option');
    setupRadioSelection('grupo_pessoal', 'card-option');

    // Cotação Empresarial
    setupRadioSelection('tipo_cotacao', 'card-option'); // Para alternar entre Pessoal/Empresarial
    setupRadioSelection('grupo_empresarial', 'card-option'); // Assumindo que você usou 'grupo-option' ou similar
    setupRadioSelection('profissionais_empresarial', 'card-option');

    // Adiciona listeners para os radio buttons de tipo de cotação
    tipoCotacaoRadios.forEach(radio => {
        radio.addEventListener('change', toggleFormVisibility);
        radio.addEventListener('change', () => {
            tipoCotacaoRadios.forEach(opcao => {
                opcao.closest('.card-option').classList.remove('selected');
            });
            if (radio.checked) {
                radio.closest('.card-option').classList.add('selected');
            }
        });
    });

    // Inicializa o formulário correto ao carregar a página
    toggleFormVisibility();
    setupImportanciaSliderPessoal(); // Inicializa o slider pessoal
    setupLMGSliderEmpresarial(); // Inicializa o slider empresarial
});
