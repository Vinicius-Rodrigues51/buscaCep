const inputs = [document.getElementById('localidade'), document.getElementById('logradouro'), document.getElementById('bairro'), document.getElementById('uf'), document.getElementById('cep')]
const inputs2 = [document.getElementById('localidade'), document.getElementById('logradouro'), document.getElementById('bairro'), document.getElementById('uf')]
const btn = document.querySelector('input[type="submit"]')
const cep = document.querySelector('#cep')
const erro1 = document.querySelector('.erro')

cep.addEventListener('change', addInfo)
btn.addEventListener('click', addInfo)


async function addInfo(event) {
    try {
        event.preventDefault();
        let cepValue = cep.value
        const dadosResponse = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const jsonResponse = await dadosResponse.json();

        if (cepValue != '') {
            inputs.forEach(item => {
                item.value = jsonResponse[item.name]
                cep.classList.remove('ativo')
                erro1.innerText = ''

                if(jsonResponse[item.name] === undefined) {
                    item.value = ''
                    erro1.innerText = 'Esse CEP não foi encontrado'
                    cep.classList.add('ativo')
                }
            })
            
            inputs2.forEach( item => {
                if(item.value != '') {
                    item.setAttribute('disabled', 'disabled')
                }
            })
        }

    } catch (erro) {
        cep.classList.add('ativo')
        erro1.innerText = 'Dígite um CEP válido'
    }
}