var input = document.querySelectorAll('input');

function verificaCampoObrigatorio(evento) {
    var contadorCamposEmBranco = 0;
    //Percorrer os campos de input
    for(let i = 0; i < input.length; i++){

     //Verificar se o campo é obrigatório
        var campo = document.querySelectorAll('input')[i];
        var obrigatorio = campo.required;
        var campoValor = campo.value;
        var idDiv = campo.parentNode.id;
       

        if(obrigatorio == true){

            //se sim, verificar se o valor do campo foi preenchido. Se não foi preenchido indica o campo como obrigatório
            if(campoValor == ''){
                document.querySelectorAll('input')[i].style="border: 1px solid red";

                var mensagemVermelha = document.createElement('p');
                    mensagemVermelha.classList.add('mensagemVermelha')
                    mensagemVermelha.id = `id${i}`
                    mensagemVermelha.setAttribute('for', input[i].id)
                    mensagemVermelha.textContent = 'Obrigatório*'

                document.getElementById(idDiv).appendChild(mensagemVermelha);
                contadorCamposEmBranco = contadorCamposEmBranco + 1;
           } 
           
        }
            
    }    
    
    if(contadorCamposEmBranco == 0){
        cadastrarProduto()
    }
};        
    
function tirarMensagemVermelha(idCampo){
   
        let mensagem = document.querySelector(`p[for=${idCampo}]`) 
        let inputTirar = document.querySelector(`#${idCampo}`)   
        var cor = "1px solid red";
        var campoBorda = inputTirar.style.border;
        
        if(mensagem){
            mensagem.remove()
        }

        if(campoBorda == cor){
            inputTirar.style="border: 1px solid #ccc";
        }
       
};        

function teclaPressionada(e, idCampo) {

    
    var tecla = e.key;
    var tabIndex = document.querySelector(`#${idCampo}`).tabIndex
    var proximoCampo = document.querySelector(`[tabIndex="${tabIndex + 1}"]`)
    
    if(tecla == 'Enter'){
        e.preventDefault()
        proximoCampo.focus()
    }

}

function mostrarCadastro() {
    document.getElementById('cadastro-container').style.display = 'block';
    document.getElementById('presentes-container').style.display = 'none';
}

function mostrarPresentes() {
    document.getElementById('cadastro-container').style.display = 'none';
    document.getElementById('presentes-container').style.display = 'block';
}

function cadastrarProduto(){
    var nomeProduto = input[0].value;
    var link = input[1].value;
    var img = input[2].value;
    var situacao = 0;
    var apiUrl = 'https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec'
    var body = {
        "Descricao":nomeProduto,
        "Link":link,
        "Linkimg":img,
        "Situacao":0
    }

    console.log(body)
    const configuracao = {
        method: 'POST', // Método HTTP
        headers: {
          'Content-Type': 'application/json' // Tipo de conteúdo sendo enviado (JSON neste caso)
          // Adicione outros cabeçalhos conforme necessário
        },
        body: JSON.stringify(body) // Converte o objeto JavaScript para uma string JSON
      };
    fetch(apiUrl,configuracao)

    for(i=0; i < input.length; i++){
        input[i].value = ''
    }
}