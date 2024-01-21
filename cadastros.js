//Event listeners

/*Botão Concluir*/
document.getElementById('submit-button').addEventListener('click', verificaCampoObrigatorio)

function verificaCampoObrigatorio(evento) {

    //Percorrer os campos de input
    for(let i = 0; i < input.length; i++){

     //Verificar se o campo é obrigatório
        var campo = document.querySelectorAll('input')[i];
        var obrigatorio = campo.required;
        var campoValor = campo.value;
        var campoStyle = campo.style
        var idDiv = campo.parentNode.id;
        var contadorCamposEmBranco = 0

        if(obrigatorio == true){
            if(campoValor == ''){
                contadorCamposEmBranco = contadorCamposEmBranco + 1;
            }
            
            //se sim, verificar se o valor do campo foi preenchido. Se não foi preenchido indica o campo como obrigatório
            if(campoValor == '' && campoStyle.border != '1px solid red'){
                
                campo.style="border: 1px solid #ccc";
                campo.style="border: 1px solid red";
                var mensagemVermelha = document.createElement('p');
                    mensagemVermelha.classList.add('mensagemVermelha')
                    mensagemVermelha.id = `id${i}`
                    mensagemVermelha.setAttribute('for', input[i].id)
                    mensagemVermelha.textContent = 'Obrigatório*'

                document.getElementById(idDiv).appendChild(mensagemVermelha);
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

function cadastrarProduto(){
    loading('exibir');
    var nomeProduto = input[0].value;
    var link = input[1].value;
    var img = input[2].value;
    var situacao = 0;
    var apiUrl = 'https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path=cadastro&' + new Date().getTime();
    var body = {
        "Descricao":nomeProduto,
        "Link":link,
        "Linkimg":img,
        "Situacao":0
    }
    var dadosRecebidos = null;

    const configuracao = {
        method: 'POST', // Método HTTP
        body: JSON.stringify(body) // Converte o objeto JavaScript para uma string JSON
      };
    fetch(apiUrl,configuracao)
    .then(response => {
        // Verificando se a requisição foi bem-sucedida (código de status 2xx)
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        // Convertendo a resposta para JSON
        return response.json();
      })
      .then(data => {
        if(data.Status == 200){
            limparInputs();
            loading('ocultar');
            mostrarModal('Cadastro Realizado com Sucesso', 'Seu cadastro foi realizado com sucesso!');
        }
        else{
            loading('ocultar');
            mostrarModal('Erro no Cadastro', data.Mensagem);
        }
       ;
      })
      .catch(error => {
        // Lidando com erros durante a requisição
        loading('ocultar');
        mostrarModal('Erro', 'Servidor Indisponível')
        console.error('Erro durante a requisição:', error);
      });
        
}


function loading(acao){
    var displayOpt = null
        if(acao == 'exibir'){
        displayOpt = 'flex'
        }
        else{
        displayOpt = 'none'
        };
    
        document.getElementById('loading').style.display = displayOpt;
        document.getElementById('overlay').style.display = displayOpt;
    }
    
    function limparInputs(){
        //Limpando os campos se o Status for positivo
        for(i=0; i < input.length; i++){
            input[i].value = ''
        }
    };
    
    function mostrarModal(titulo, mensagem) {
        var modal = new bootstrap.Modal(document.getElementById('universalModal'));
        
        // Atualiza o título e o corpo do modal
        document.getElementById('universalModalLabel').textContent = titulo;
        document.getElementById('universalModalBody').textContent = mensagem;
      
        // Exibe o modal
        modal.show();
      };

    function limparModal(){
      //limpar dados de modal anterior
      document.querySelector('#universalModalBody').childNodes[3].remove()
};