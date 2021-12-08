const inputs = [document.getElementById('localidade'), document.getElementById('logradouro'), document.getElementById('bairro'), document.getElementById('uf'), document.getElementById('cep')]
const inputs2 = [document.getElementById('localidade'), document.getElementById('logradouro'), document.getElementById('bairro'), document.getElementById('uf')]
const btn = document.querySelector('input[type="submit"]')
const cep = document.querySelector('#cep')

cep.addEventListener('change', addInfo)
btn.addEventListener('click', addInfo)

function addInfo(e) {
    e.preventDefault()
    let cepValue = cep.value

    if (cepValue != '') {
        fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
            .then(response => response.json())
            .then(body => {
                inputs.forEach(item => {
                    item.value = body[item.name]
                    

                    inputs2.forEach(item => {
                        if(item.value != ''){
                            item.setAttribute('disabled', 'disabled')
                        }
                    })
                })
            })
    }

}