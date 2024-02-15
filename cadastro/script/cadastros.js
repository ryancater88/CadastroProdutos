//Mostrar o cadastro
var presentesContainer = document.querySelector(".body-cadastro");
  setTimeout(() => {presentesContainer.classList.add("show-container"), 50});

/*Botão Concluir*/
document.getElementById('submit-button').addEventListener('click', verificaCampoObrigatorio)
 
function cadastrarProduto(){
    loading('exibir');
    const nomeProduto = input[0].value;
    const link = input[1].value;
    const img = input[2].value;
    const qtd = input[3].value;
    const local = document.querySelector('#selectLista').options.selectedIndex;
    const apiUrl = `https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path=cadastro&local=${local}&${new Date().getTime()}`;
    const body = {
        "Descricao":nomeProduto,
        "Link":link,
        "Linkimg":img,
        "QtdMax":parseInt(qtd, 10),
        "Situacao":'0'
    };

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
            input[i].value = '';
            document.querySelector('#selectLista').options.selectedIndex = 0;  
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