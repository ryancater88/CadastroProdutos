
//ao abrir a pagina
let paginaAtual = 1
let paginasTotais = 0

buscarListaDePresentes(paginaAtual)


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
      paginaAtual = data.PaginaAtual
      paginasTotais = data.Totalpaginas
      listarItens(listaDePresentes.Dados);
      loading('ocultar');
      atualizarPaginacao();
(paginaAtual, paginasTotais);
      
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
 
    const convidado =    produto.Convidado;
    const data =     produto.Datahora;
    const descricao =  produto.Descricao;
    const email =     produto.Email;
    const id =     produto.Id;
    const link =    produto.Link;
    const linkimg =     produto.Linkimg;
    const situacao =     produto.Situacao;


    var item = document.createElement('li');
        item.className = 'list-group-item';
        item.id = id;
        item.textContent = descricao;

    var buttonEditar = document.createElement('button');
        buttonEditar.id = id;
        buttonEditar.className = 'item-button';
        buttonEditar.textContent = 'Editar';
        buttonEditar.addEventListener('click', () => {buscarById(item.id)});

    var div = document.getElementById('listapresente')

    item.appendChild(buttonEditar)

    div.append(item);

    //mostra o container de itens:

    document.getElementById('presentes-container').removeAttribute('style');
    setTimeout(() =>{document.getElementById('presentes-container').classList.add("show-container");}, 50);

}

// Ao clicar em editar, essa função é chamada
let itemEscolhido = null

function buscarById(id){
  loading('exibir');
  const apiUrl = 'https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path=buscarbyid&' + new Date().getTime();
  const body = {
                "Id":id
              };
  const configuracao = {
    method: 'POST', // Método HTTP
    body: JSON.stringify(body) // Converte o objeto JavaScript para uma string JSON
  };

  fetch(apiUrl, configuracao)
    .then(response => {
      if (!response.ok) {
       loading('Ocultar');
       mostrarModal('Erro', 'Erro na requisição');
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      mostrarModalDados('Produto', data);
      itemEscolhido = data
      loading('ocultar')
    })
    .catch(error => {
      console.error('Erro durante a requisição:', error);
      loading('ocultar');
      // Mostrar um modal de erro se necessário
    });

}

//Construindo modal de dados

function mostrarModalDados(titulo, dados) {
    const modal = new bootstrap.Modal(document.getElementById('modalDados'));
    limparModal();

    const convidado = dados.Convidado;
    const data = dados.Datahora;
    const descricao = dados.Descricao;
    const email = dados.Email;
    const id = dados.Id;
    const link = dados.Link;
    const linkimg = dados.Linkimg;
    const situacao = dados.Situacao;


    // Atualiza o título e o corpo do modal
    document.getElementById('modalDadosLabel').textContent = titulo;
   
     var dadosModal = document.getElementById('modalDadosBody');
//------------------------------Div da lista de campos----------------------------------
     var divProdutosList = document.createElement('div')
        divProdutosList.className = 'produto-modal'
   
//------------------------------Campo Nome do Produto----------------------------------
     var divProduto = document.createElement('div')
        divProduto.id = 'nomeproduto'
        
     var labelProduto = document.createElement('label')
        labelProduto.textContent = "Nome do Produto:";
        labelProduto.setAttribute('for', 'inputproduto');
        labelProduto.className = 'produto-modal-label'
        
     var inputProduto = document.createElement('input');
        inputProduto.id = 'inputproduto';
        inputProduto.name = 'Produto';
        inputProduto.required = true;
        inputProduto.className = 'produto-modal-input';
        inputProduto.setAttribute('maxlength', 50)
        if(descricao) inputProduto.value = descricao;

        divProduto.append(labelProduto, inputProduto);
        divProdutosList.appendChild(divProduto);
//------------------------------Campo Link----------------------------------

      var divLink = document.createElement('div')
       divLink.id = 'link'

      var labelLink = document.createElement('label')
        labelLink.textContent = "Link:";
        labelLink.setAttribute('for', 'inputLink');
        labelLink.className = 'produto-modal-label'

      var inputLink = document.createElement('input');
        inputLink.id = 'inputLink';
        inputLink.name = 'Link';
        inputLink.required = true;
        inputLink.className = 'produto-modal-input';
        inputLink.setAttribute('maxlength', 1000)
       if(link) inputLink.value = link;

       divLink.append(labelLink, inputLink);
       divProdutosList.appendChild(divLink);

//------------------------------Campo Linkimg----------------------------------
    
      var divLinkimg = document.createElement('div')
       divLinkimg.id = 'Linkimg'

      var labelLinkimg = document.createElement('label')
        labelLinkimg.textContent = "Link da Imagem:";
        labelLinkimg.setAttribute('for', 'inputLinkimg');
        labelLinkimg.className = 'produto-modal-label'

      var inputLinkimg = document.createElement('input');
        inputLinkimg.id = 'inputLinkimg';
        inputLinkimg.name = 'Linkimg';
        inputLinkimg.required = true;
        inputLinkimg.className = 'produto-modal-input';
        inputLinkimg.setAttribute('maxlength', 1000)
       if(linkimg) inputLinkimg.value = linkimg;

       divLinkimg.append(labelLinkimg, inputLinkimg);
       divProdutosList.appendChild(divLinkimg);


//------------------------------Campo Convidado----------------------------------
     var divConvidado = document.createElement('div')
       divConvidado.id = 'Convidado'

      var labelConvidado = document.createElement('label')
        labelConvidado.textContent = "Convidado:";
        labelConvidado.setAttribute('for', 'inputConvidado');
        labelConvidado.className = 'produto-modal-label'

      var inputConvidado = document.createElement('input');
        inputConvidado.id = 'inputConvidado';
        inputConvidado.name = 'Convidado';
        inputConvidado.className = 'produto-modal-input';
        inputConvidado.setAttribute('maxlength', 50)
       if(convidado) inputConvidado.value = convidado;

       divConvidado.append(labelConvidado, inputConvidado);
       divProdutosList.appendChild(divConvidado);

//------------------------------Campo Email----------------------------------
      var divEmail = document.createElement('div')
       divEmail.id = 'Email'

      var labelEmail = document.createElement('label')
        labelEmail.textContent = "Email:";
        labelEmail.setAttribute('for', 'inputEmail');
        labelEmail.className = 'produto-modal-label'

      var inputEmail = document.createElement('input');
        inputEmail.id = 'inputEmail';
        inputEmail.name = 'Email';
        inputEmail.className = 'produto-modal-input';
        inputEmail.setAttribute('maxlength', 50)
       if(email) inputEmail.value = email;

       divEmail.append(labelEmail, inputEmail);
       divProdutosList.appendChild(divEmail);

//------------------------------Campo Situacao----------------------------------
      var divSituacao = document.createElement('div')
       divSituacao.id = 'Situacao'

      var labelSituacao = document.createElement('label')
        labelSituacao.textContent = "Situacao:";
        labelSituacao.setAttribute('for', 'inputSituacao');
        labelSituacao.className = 'produto-modal-label'

      var selectSituacao = document.createElement('select');
        selectSituacao.id = 'inputSituacao';
        selectSituacao.op
      
      var opt1 = document.createElement('option');
        opt1.value = 1;
        opt1.textContent = 'Reservado';
      
      var opt2 = document.createElement('option')
        opt2.value = 0;
        opt2.textContent = 'Não-reservado';
      
        selectSituacao.append(opt1, opt2);
        selectSituacao.value = situacao


       divSituacao.append(labelSituacao, selectSituacao);
       divProdutosList.appendChild(divSituacao);

//------------------------------Criando modal----------------------------------

     
     dadosModal.appendChild(divProdutosList);
  
    // Exibe o modal
    modal.show();
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
      var dadosModal =  document.querySelector('#modalDadosBody').childNodes[3];

      if(dadosModal){
        dadosModal.remove()
      }
      
};

//------------------------------Paginação----------------------------------

function atualizarPaginacao(evento){
  const textoColocar = `Pagina: ${paginaAtual} de ${paginasTotais}`
  const container = document.querySelector('#presentes-container');
  const listaItem = document.querySelectorAll('.list-group-item');

  document.getElementById('currentPage').textContent = textoColocar

  if(evento == 'proxima' && paginaAtual < paginasTotais){
    container.style.display = 'none';
    listaItem.forEach(item => {item.remove()})
    paginaAtual = parseInt(paginaAtual) + 1;
    buscarListaDePresentes(paginaAtual);
  }
  else if(evento == 'anterior' && paginaAtual > 1){
    container.style.display = 'none';
    listaItem.forEach(item => {item.remove()});
    paginaAtual = parseInt(paginaAtual) - 1;
    buscarListaDePresentes(paginaAtual);
  }
}

//------------------------------Função do botão salvar----------------------------------

function alterarProduto(){
  fecharModal();
  loading('exibir');

  
  const id = itemEscolhido.Id
  const descricao = document.querySelector('#inputproduto').value;
  const link = document.querySelector('#inputLink').value;
  const linkimg = document.querySelector('#inputLinkimg').value;
  const convidado = document.querySelector('#inputConvidado').value;
  const email = document.querySelector('#inputEmail').value;
  const situacao = document.querySelector('#inputSituacao').value;


if(id && descricao && link && linkimg){
  
  const endpoint = "https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path=alterar&"+ new Date().getTime();

  const body = {
    "Id":id,
    "Descricao":descricao,
    "Link":link,
    "Linkimg":linkimg,
    "Situacao":situacao,
    "Convidado":convidado,
    "Email":email
};

  const configuracao =  {
    method: 'POST', 
    body: JSON.stringify(body)
};

fetch(endpoint, configuracao)
    .then(response => {
      if (!response.ok) {
       loading('Ocultar');
       mostrarModal('Erro', 'Erro na requisição');
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      limparModal();
      mostrarModal('Sucesso', "Alteração bem Sucedida;")
      loading('ocultar')

    })
    .catch(error => {
      console.error('Erro durante a requisição:', error);
      loading('ocultar');
      mostrarModal('Erro', 'Erro durante a requisição:')
    });

}
else{
  let campoBranco = []

  if(id == ""){campoBranco.push("Id")};
  if(descricao == ""){campoBranco.push("Descricão")};
  if(link == ""){campoBranco.push("Link")};
  if(linkimg == ""){campoBranco.push("Link Img")};

  console.log(campoBranco)

  mostrarModal('Erro', `Preencha os seguintes campos: ${campoBranco}`)
  loading('ocultar');
}

}

function fecharModal(){
  const event = new Event('click')
  document.querySelector('#dadosFechar').dispatchEvent(event)
}