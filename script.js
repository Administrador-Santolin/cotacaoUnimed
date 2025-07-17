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
}

let currentStep = 0;
const totalSteps = 4;;


document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM comuns
    const formPessoal = document.getElementById('form-pessoal');
    const formEmpresarial = document.getElementById('form-empresarial');
    const messageBox = document.getElementById('message-box');

    const stepperSteps = document.querySelectorAll('.stepper-step-item'); // Alterado para .stepper-step-item
    const formSteps = document.querySelectorAll('.form-step');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const editCotacaoButton = document.getElementById('edit-cotacao-button');

    // Elementos do Passo 1 (Tipo de Cotação)
    const tipoCotacaoRadios = document.querySelectorAll('input[name="tipo_cotacao"]');

    // Elementos do Passo 2 (Dados Pessoais/Empresariais)
    const formDadosPessoais = document.getElementById('personalForm');
    const formDadosEmpresariais = document.getElementById('businessForm');
    const nomePessoalInput = document.getElementById('personalName');
    const cpfPessoalInput = document.getElementById('cpf');
    const telefonePessoalInput = document.getElementById('personalNumber');
    const cepPessoalInput = document.getElementById('personalCep');
    const enderecoPessoalInput = document.getElementById('personalAddress');
    const numeroPessoalInput = document.getElementById('addressNumber');
    const complementoPessoalInput = document.getElementById('addressComplement');
    const bairroPessoalInput = document.getElementById('neighborhood');
    const cidadePessoalInput = document.getElementById('city');
    const estadoPessoalInput = document.getElementById('state');

    const razaoSocialEmpresarialInput = document.getElementById('businessName');
    const cnpjEmpresarialInput = document.getElementById('CNPJ');
    const telefoneEmpresarialInput = document.getElementById('businessTel');
    const cepEmpresarialInput = document.getElementById('businessCep');
    const enderecoEmpresarialInput = document.getElementById('businessAddress');
    const numeroEmpresarialInput = document.getElementById('businessAddNumber');
    const complementoEmpresarialInput = document.getElementById('businessAddComplement');
    const bairroEmpresarialInput = document.getElementById('businessNeighborhood');
    const cidadeEmpresarialInput = document.getElementById('businessCity');
    const estadoEmpresarialInput = document.getElementById('businessState');

    // Elementos do Passo 3 (Detalhes da Cotação)
    const formCotacaoPessoal = document.getElementById('professionalInfo');
    const formCotacaoEmpresarial = document.getElementById('businessDetails');

    // Pessoal
    const importanciaSliderPessoal = document.getElementById('importancia-slider-pessoal');
    const importanciaDisplayPessoal = document.getElementById('importancia-display-pessoal');
    

    // Empresarial
    const lmgSliderEmpresarial = document.getElementById('lmg-slider-empresarial');
    const lmgDisplayEmpresarial = document.getElementById('lmg-display-empresarial');

    // Elementos do Passo 4 (Resumo)
    const resultadoPessoalDiv = document.getElementById('resultado-pessoal');
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
    }

    function applyCpfMask(value) {
        value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
        if (value.length > 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4");
        } else if (value.length > 6) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3}).*/, "$1.$2.$3");
        } else if (value.length > 3) {
            value = value.replace(/^(\d{3})(\d{3}).*/, "$1.$2");
        }
        return value;
    }

    function applyCnpjMask(value) {
        value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
        if (value.length > 12) {
            value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, "$1.$2.$3/$4-$5");
        } else if (value.length > 8) {
            value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4}).*/, "$1.$2.$3/$4");
        } else if (value.length > 5) {
            value = value.replace(/^(\d{2})(\d{3})(\d{3}).*/, "$1.$2.$3");
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{3}).*/, "$1.$2");
        }
        return value;
    }

    function applyPhoneMask(value) {
        value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
        if (value.length > 10) { // (XX) XXXXX-XXXX (11 dígitos)
            value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (value.length > 5) { // (XX) XXXX-XXXX (10 dígitos) ou (XX) XXXX-XXXX (9 dígitos)
            value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (value.length > 2) { // (XX)
            value = value.replace(/^(\d\d)(\d{0,5}).*/, "($1) $2");
        }
        return value;
    }

    // --- Integração ViaCEP ---

    async function fetchAddressByCep(cepInput, enderecoInput, bairroInput, cidadeInput, estadoInput) {
        const cep = cepInput.value.replace(/\D/g, ''); // Limpa o CEP

        // Limpa campos de endereço enquanto busca
        enderecoInput.value = '';
        bairroInput.value = '';
        cidadeInput.value = '';
        estadoInput.value = '';

        if (cep.length !== 8) {
            // showMessage('CEP inválido. Por favor, digite 8 dígitos.', 'warning');
            return; // Não busca se o CEP não tem 8 dígitos
        }

        try {
            // Desabilita campos para evitar edição durante a busca
            enderecoInput.readOnly = true;
            bairroInput.readOnly = true;
            cidadeInput.readOnly = true;
            estadoInput.readOnly = true;

            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                showMessage('CEP não encontrado. Verifique o número digitado.', 'error');
                enderecoInput.readOnly = false; // Permite edição manual se não encontrado
                bairroInput.readOnly = false;
                cidadeInput.readOnly = false;
                estadoInput.readOnly = false;
            } else {
                enderecoInput.value = data.logradouro || '';
                bairroInput.value = data.bairro || '';
                cidadeInput.value = data.localidade || '';
                estadoInput.value = data.uf || '';

                // Habilita campos para edição manual apenas se estiverem vazios após a busca
                if (!data.logradouro) enderecoInput.readOnly = false;
                if (!data.bairro) bairroInput.readOnly = false;
                if (!data.localidade) cidadeInput.readOnly = false;
                if (!data.uf) estadoInput.readOnly = false;
                hideMessage(); // Esconde mensagem de erro se a busca foi bem-sucedida
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            showMessage('Erro ao buscar CEP. Tente novamente mais tarde.', 'error');
            // Em caso de erro na API, permite edição manual
            enderecoInput.readOnly = false;
            bairroInput.readOnly = false;
            cidadeInput.readOnly = false;
            estadoInput.readOnly = false;
        }
    }

    function updateStepperUI() {
        stepperSteps.forEach((step, index) => {
            if (index === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else if (index < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Atualiza visibilidade dos botões de navegação
        prevButton.classList.toggle('hidden', currentStep === 0);
        nextButton.classList.toggle('hidden', currentStep === totalSteps - 1);
        editCotacaoButton.classList.toggle('hidden', currentStep !== totalSteps - 1); // Mostra "Editar" apenas no resumo

        // Altera o texto do botão "Próximo" para "Finalizar" no penúltimo passo
        if (currentStep === totalSteps - 2) { // Penúltimo passo (antes do resumo)
            nextButton.textContent = 'Finalizar Cotação';
        } else {
            nextButton.textContent = 'Próximo';
        }
    }

    // Exibe o passo atual e oculta os outros
    function showStep(stepIndex) {
        formSteps.forEach((stepElement, index) => {
            stepElement.classList.toggle('hidden', index !== stepIndex);
        });
        updateStepperUI();
        hideMessage(); // Sempre esconde a mensagem ao mudar de passo
        hideAllResults(); // Esconde resultados ao mudar de passo

        // Lógica específica para o Passo 2 (Dados Pessoais/Empresariais)
        if (stepIndex === 1) {
            const selectedType = document.querySelector('input[name="tipo_cotacao"]:checked')?.value;
            if (selectedType === 'pessoal') {
                formDadosPessoais.classList.remove('hidden');
                formDadosEmpresariais.classList.add('hidden');
            } else if (selectedType === 'empresarial') {
                formDadosPessoais.classList.add('hidden');
                formDadosEmpresariais.classList.remove('hidden');
            }
        }
        // Lógica específica para o Passo 3 (Detalhes da Cotação)
        else if (stepIndex === 2) {
            const selectedType = document.querySelector('input[name="tipo_cotacao"]:checked')?.value;
            if (selectedType === 'pessoal') {
                formCotacaoPessoal.classList.remove('hidden');
                formCotacaoEmpresarial.classList.add('hidden');
            } else if (selectedType === 'empresarial') {
                formCotacaoPessoal.classList.add('hidden');
                formCotacaoEmpresarial.classList.remove('hidden');
            }
        }
        // Lógica específica para o Passo 4 (Resumo)
        else if (stepIndex === 3) {
            displaySummary(); // Chama a função para exibir o resumo
        }
    }

    // Valida o passo atual antes de avançar
    function validateStep(stepIndex) {
        hideMessage(); // Limpa mensagens anteriores

        let isValid = true;
        let errorMessage = '';

        if (stepIndex === 0) { // Validação do Passo 1: Tipo de Cotação
            const selectedType = document.querySelector('input[name="tipo_cotacao"]:checked');
            if (!selectedType) {
                errorMessage = 'Por favor, selecione o tipo de cotação (Pessoal ou Empresarial).';
                isValid = false;
            }
        } else if (stepIndex === 1) { // Validação do Passo 2: Dados Pessoais/Empresariais
            const selectedType = document.querySelector('input[name="tipo_cotacao"]:checked')?.value;
            if (selectedType === 'pessoal') {
                if (!nomePessoalInput.value.trim() || !cpfPessoalInput.value.trim()) {
                    errorMessage = 'Por favor, preencha seu Nome Completo e CPF.';
                    isValid = false;
                }
            } else if (selectedType === 'empresarial') {
                if (!razaoSocialEmpresarialInput.value.trim() || !cnpjEmpresarialInput.value.trim()) {
                    errorMessage = 'Por favor, preencha a Razão Social e o CNPJ.';
                    isValid = false;
                }
            } else {
                errorMessage = 'Tipo de cotação não selecionado no passo anterior.';
                isValid = false;
            }
        } else if (stepIndex === 2) { // Validação do Passo 3: Detalhes da Cotação
            const selectedType = document.querySelector('input[name="tipo_cotacao"]:checked')?.value;
            if (selectedType === 'pessoal') {
                const selectedGrupoPessoal = document.querySelector('input[name="grupo_pessoal"]:checked');
                const selectedEquipePessoal = document.querySelector('input[name="equipe_pessoal"]:checked');
                if (!selectedGrupoPessoal || !selectedEquipePessoal || isNaN(parseFloat(importanciaSliderPessoal.value))) {
                    errorMessage = 'Por favor, selecione o Tipo de Equipe, o Grupo e a Importância Segurada para a Cotação Pessoal.';
                    isValid = false;
                }
            } else if (selectedType === 'empresarial') {
                const selectedGrupoEmpresarial = document.querySelector('input[name="grupo_empresarial"]:checked');
                const selectedProfissionaisEmpresarial = document.querySelector('input[name="profissionais_empresarial"]:checked');
                if (!selectedGrupoEmpresarial || !selectedProfissionaisEmpresarial || isNaN(parseFloat(lmgSliderEmpresarial.value))) {
                    errorMessage = 'Por favor, selecione o Grupo, a Quantidade de Profissionais e o LMG para a Cotação Empresarial.';
                    isValid = false;
                }
            } else {
                errorMessage = 'Tipo de cotação não selecionado no passo anterior.';
                isValid = false;
            }
        }

        if (!isValid) {
            showMessage(errorMessage, 'error');
        }
        return isValid;
    }

    // --- Navegação do Stepper ---

    prevButton.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    nextButton.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps - 1) {
                currentStep++;
                showStep(currentStep);
            }
        }
    });

    editCotacaoButton.addEventListener('click', () => {
        currentStep = 2; // Volta para o primeiro passo para edição
        showStep(currentStep);
        // Não reseta os inputs aqui, apenas permite a edição.
        // O reset acontece apenas se o tipo de cotação for alterado no Passo 1.
    });

    // --- Lógica de Reset de Formulários ---

    // Função para resetar todos os inputs de um formulário
    function resetFormFields(formElement) {
        formElement.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
        formElement.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
            // Adaptação para as novas classes CSS
            const parentLabel = radio.closest('.radio-option'); // Todos os radio options tem esta classe
            if (parentLabel) {
                parentLabel.classList.remove('selected');
            }
        });
        // Resetar sliders para o valor mínimo inicial
        if (formElement.id === 'personalForm') {
            setupImportanciaSliderPessoal();
        } else if (formElement.id === 'businessForm') {
            setupLMGSliderEmpresarial();
        }
    }

    // Listener para o tipo de cotação (Pessoal/Empresarial)
    tipoCotacaoRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            // Resetar formulários quando o tipo de cotação muda
            resetFormFields(formDadosPessoais);
            resetFormFields(formDadosEmpresariais);
            resetFormFields(formCotacaoPessoal);
            resetFormFields(formCotacaoEmpresarial);

            // Garante que o radio button recém-selecionado tenha a classe 'selected'
            setupRadioSelection('tipo_cotacao', 'cotacao-type-option');

            // Atualiza a visibilidade dos sub-formulários no Passo 2 e Passo 3
            const selectedType = event.target.value;
            if (currentStep === 1) { // Se estiver no passo de dados pessoais/empresariais
                if (selectedType === 'pessoal') {
                    formDadosPessoais.classList.remove('hidden');
                    formDadosEmpresariais.classList.add('hidden');
                } else {
                    formDadosPessoais.classList.add('hidden');
                    formDadosEmpresariais.classList.remove('hidden');
                }
            } else if (currentStep === 2) { // Se estiver no passo de detalhes da cotação
                if (selectedType === 'pessoal') {
                    formCotacaoPessoal.classList.remove('hidden');
                    formCotacaoEmpresarial.classList.add('hidden');
                } else {
                    formCotacaoPessoal.classList.add('hidden');
                    formCotacaoEmpresarial.classList.remove('hidden');
                }
            }
            hideAllResults(); // Esconde resultados ao trocar o tipo de cotação
            hideMessage(); // Esconde mensagens
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

     function displaySummary() {
        const selectedType = document.querySelector('input[name="tipo_cotacao"]:checked')?.value;
        hideAllResults(); // Esconde ambos os resultados antes de exibir o correto

        if (selectedType === 'pessoal') {
            const selectedGrupoPessoal = document.querySelector('input[name="grupo_pessoal"]:checked')?.value;
            const selectedEquipePessoal = document.querySelector('input[name="equipe_pessoal"]:checked')?.value;
            const selectedImportanciaPessoal = parseFloat(importanciaSliderPessoal.value);

            const foundItem = planData.find(item =>
                item.grupo === selectedGrupoPessoal &&
                item.importancia_segurada === selectedImportanciaPessoal
            );

            if (foundItem && foundItem[selectedEquipePessoal]) {
                const cota = foundItem[selectedEquipePessoal];
                document.getElementById('res-grupo-pessoal-resumo').textContent = grupoNamesPessoal[selectedGrupoPessoal];
                document.getElementById('res-especialidade-pessoal-resumo').textContent = grupoNamesPessoal[selectedGrupoPessoal].split('(')[1].replace(')', '');
                document.getElementById('res-importancia-pessoal-resumo').textContent = selectedImportanciaPessoal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                document.getElementById('res-equipe-pessoal-resumo').textContent = equipeNames[selectedEquipePessoal];
                document.getElementById('res-premio-pessoal-resumo').textContent = cota.premio_total_ano.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                document.getElementById('res-parcelamento-pessoal-resumo').textContent = cota.parcelamento_maximo_meses;
                document.getElementById('res-condicao-pessoal-resumo').textContent = cota.parcela_minima_condicao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                resultadoPessoalDiv.classList.remove('hidden');
            } else {
                showMessage('Não foi possível gerar o resumo da Cotação Pessoal. Verifique os dados preenchidos.', 'error');
            }
        } else if (selectedType === 'empresarial') {
            const selectedGrupoEmpresarial = document.querySelector('input[name="grupo_empresarial"]:checked')?.value;
            const selectedProfissionaisEmpresarial = document.querySelector('input[name="profissionais_empresarial"]:checked')?.value;
            const selectedLMGEmpresarial = parseFloat(lmgSliderEmpresarial.value);

            const foundItem = planDataEmpresarial.find(item =>
                item.grupo === selectedGrupoEmpresarial &&
                item.quantidade_profissionais_key === selectedProfissionaisEmpresarial &&
                item.lmg === selectedLMGEmpresarial
            );
            const foundFranquia = franquiaDataEmpresarial.find(item => item.lmg === selectedLMGEmpresarial);

            if (foundItem) {
                document.getElementById('res-grupo-empresarial-resumo').textContent = grupoNamesEmpresarial[selectedGrupoEmpresarial];
                document.getElementById('res-tipo-instituicao-empresarial-resumo').textContent = foundItem.tipo_instituicao;
                document.getElementById('res-profissionais-empresarial-resumo').textContent = profissionaisNamesEmpresarial[selectedProfissionaisEmpresarial];
                document.getElementById('res-lmg-empresarial-resumo').textContent = selectedLMGEmpresarial.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                document.getElementById('res-premio-empresarial-resumo').textContent = foundItem.premio_a_vista.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                document.getElementById('res-franquia-empresarial-resumo').textContent = foundFranquia ? foundFranquia.franquia_texto : 'Não disponível';
                resultadoEmpresarialDiv.classList.remove('hidden');
            } else {
                showMessage('Não foi possível gerar o resumo da Cotação Empresarial. Verifique os dados preenchidos.', 'error');
            }
        } else {
            showMessage('Tipo de cotação não selecionado para gerar o resumo.', 'error');
        }
    }

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

    // Inicializa o formulário correto ao carregar a página
    showStep(currentStep);
    setupImportanciaSliderPessoal(); // Inicializa o slider pessoal
    setupLMGSliderEmpresarial(); // Inicializa o slider empresarial

    cpfPessoalInput.addEventListener('input', (e) => e.target.value = applyCpfMask(e.target.value));
    cnpjEmpresarialInput.addEventListener('input', (e) => e.target.value = applyCnpjMask(e.target.value));
    telefonePessoalInput.addEventListener('input', (e) => e.target.value = applyPhoneMask(e.target.value));
    telefoneEmpresarialInput.addEventListener('input', (e) => e.target.value = applyPhoneMask(e.target.value));

    // Adiciona listeners para busca de CEP
    cepPessoalInput.addEventListener('blur', () => fetchAddressByCep(cepPessoalInput, enderecoPessoalInput, bairroPessoalInput, cidadePessoalInput, estadoPessoalInput));
    cepPessoalInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            fetchAddressByCep(cepPessoalInput, enderecoPessoalInput, bairroPessoalInput, cidadePessoalInput, estadoPessoalInput);
        }
    });

    cepEmpresarialInput.addEventListener('blur', () => fetchAddressByCep(cepEmpresarialInput, enderecoEmpresarialInput, bairroEmpresarialInput, cidadeEmpresarialInput, estadoEmpresarialInput));
    cepEmpresarialInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            fetchAddressByCep(cepEmpresarialInput, enderecoEmpresarialInput, bairroEmpresarialInput, cidadeEmpresarialInput, estadoEmpresarialInput);
        }
    });
});
