
//ao abrir a pagina
let pagina = 1

buscarListaDePresentes(pagina)


// Função para buscar a lista de presentes ao abrir a página
let listaDePresentes = [];


function buscarListaDePresentes(page) {
   loading('exibir');
    var apiLink = 'https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path=buscar&' + new Date().getTime();
    var body = {
        'Page':`${page}`,
        'Pagelength':'10'
      }
    
const configuracao = {
    method: 'POST', // Método HTTP
    body: JSON.stringify(body) // Converte o objeto JavaScript para uma string JSON
  };

 
fetch(apiLink, configuracao)
    .then(response => {
      if (!response.ok) {
       loading('Ocultar');
       mostrarModal('Erro', 'Erro na requisição');
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      listaDePresentes = data;
      listarItens(listaDePresentes);
      loading('ocultar')
    })
    .catch(error => {
      console.error('Erro durante a requisição:', error);
      // Mostrar um modal de erro se necessário
    });
}

function listarItens(item){
   item.forEach(elemento => {contrutorListaPresente(elemento)})

}

function contrutorListaPresente(produto){
 
    const convidado = produto.Convidado;
    const data = produto.Datahora;
    const descricao = produto.Descricao;
    const email = produto.Email;
    const id = produto.Id;
    const link = produto.Link;
    const linkimg = produto.Linkimg;
    const situacao = produto.Situacao;

    var item = document.createElement('li');
        item.className = 'list-group-item';
        item.id = id;
        item.textContent = descricao;

    var buttonEditar = document.createElement('button');
        buttonEditar.id = id;
        buttonEditar.className = 'item-button';
        buttonEditar.textContent = 'Editar';

    var div = document.getElementById('listapresente');

    item.appendChild(buttonEditar)

    div.append(item);
   
    //mostra o container de itens:

    document.getElementById('presentes-container').removeAttribute('style')

}

//Empregando função aos botões de editar

let itemBut = document.querySelectorAll('.item-button')

itemBut.forEach(item => {item.addEventListener('click', () => {})})

//Construindo modal de dados

function mostrarModalDados(titulo, dados) {
    var modal = new bootstrap.Modal(document.getElementById('universalModal'));

   
    
    // Atualiza o título e o corpo do modal
    document.getElementById('universalModalLabel').textContent = titulo;
   
     var dadosModal = document.getElementById('universalModalBody');

     var divProdutosList = document.createElement('div')
        divProdutosList.className = 'produto-list'
   

     var divProduto = document.createElement('div')
        divProduto.className = 'produto'
        
     var labelProduto = document.createElement('label')
        labelProduto.textContent = "Produto";
        labelProduto.setAttribute('for', 'produto');
        
     var inputProduto = document.createElement('input');
        inputProduto.id = 1;
        inputProduto.name = 'Produto'

     divProduto.append(labelProduto, inputProduto);

     divProdutosList.appendChild(divProduto);
    
     dadosModal.appendChild(divProdutosList);
  
    // Exibe o modal
    modal.show();
     //Definindo Função para o button fechar
     document.querySelector('.btn-secondary').addEventListener('click', limparModal);

  };

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