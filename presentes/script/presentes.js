
//ao abrir a pagina
let paginaAtual = 1
let paginasTotais = 0
let lista = null


setTimeout(() =>{document.getElementById('presentes-container').classList.add("show-container");}, 50);

const dropMenuOpt = document.querySelector('#qualLista');
      dropMenuOpt.addEventListener('change', () => {
        lista = dropMenuOpt.value; 
        if(paginaAtual > 1)paginaAtual = 1;
        buscarListaDePresentes(paginaAtual, dropMenuOpt.value); 
        limparListaPresentes()
      });

// Função para buscar a lista de presentes ao abrir a página
let listaDePresentes = [];


function buscarListaDePresentes(page, lista) {
   loading('exibir');
   
    var apiLink = `https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path=buscar&local=${lista}&${new Date().getTime()}`
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
      if(data.Status == 400){
        loading('Ocultar');
        mostrarModal('Erro', data.Mensagem)
      }
      else if(data.Dados == ''){
        loading('Ocultar');
        mostrarModal('Erro', 'Nenhum registro encontrado')
      }
      else{
        listaDePresentes = data;
        paginaAtual = data.PaginaAtual
        paginasTotais = data.Totalpaginas
        listarItens(listaDePresentes.Dados);
        loading('ocultar');
        atualizarPaginacao();
      }
      
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
    let id =     produto.Id;
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

     var buttonExcluir = document.createElement('button');
         buttonExcluir.id = id;
         buttonExcluir.className = 'item-button-excluir';
         buttonExcluir.textContent = 'Excluir';
         buttonExcluir.addEventListener('click',  () => {excluirProduto(id)})

    var divButton = document.createElement('div')
        divButton.className = 'button-list-group'

    var div = document.getElementById('listapresente')

    divButton.appendChild(buttonExcluir)
    divButton.appendChild(buttonEditar)

    item.appendChild(divButton)

    div.append(item);

    //mostra o container de itens:
    setTimeout(() =>{document.getElementById('presentes-container').classList.add("show-container");}, 50);

};

// Ao clicar em editar, essa função é chamada
let itemEscolhido = null

function buscarById(id){
  loading('exibir');
  const apiUrl = `https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path=buscarbyid&local=${lista}&${new Date().getTime()}`;
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
      itemEscolhido = data;
      mostrarModalDados();
      loading('ocultar')
    })
    .catch(error => {
      console.error('Erro durante a requisição:', error);
      loading('ocultar');
      // Mostrar um modal de erro se necessário
    });

}

//Construindo modal de dados

function mostrarModalDados() {
    const modal = new bootstrap.Modal(document.getElementById('modalDados'));
    const nomeProduto = document.getElementById('inputproduto');
    const inputLink = document.getElementById('inputLink');
    const inputLinkimg = document.getElementById('inputLinkimg');
    const inputSituacao = document.getElementById('inputSituacao');
    const qtdDisponivel = document.getElementById('inputQtd');
    const gridReserva = document.getElementById('gridReserva');
    limparGrid();
   
    nomeProduto.value = itemEscolhido.Dados.Nomeproduto;
    inputLink.value = itemEscolhido.Dados.Linkproduto;
    inputLinkimg.value = itemEscolhido.Dados.Linkimagem;
    inputSituacao.selectedIndex = itemEscolhido.Dados.Situacao;
    qtdDisponivel.value = itemEscolhido.Dados.Qtd_disponivel;
    listaReservas = itemEscolhido.Dados.Reservas;

    listaReservas.forEach(convidadoReserva => {
      var htmlInserir = `<li id=${convidadoReserva.Idreserva} class="itemGrid">
      <span class="itemColumn" nome><b>Convidado</b>: ${convidadoReserva.Nomeconvidado}</span>
      <button onclick=excluirReserva(${convidadoReserva.Idreserva})>Excluir</button>
    </li>`

      gridReserva.insertAdjacentHTML('beforeend', htmlInserir)
    })

    modal.show();
  };
//---------------------------------------------------------------
function limparGrid(){
  var dadosGridReserva =  document.querySelector('#gridReserva')
    dadosGridReserva.innerHTML = ''
};

//---------------------------------------------------------------

  function loading(acao){
    var displayOpt = null
        if(acao == 'exibir'){
        displayOpt = 'flex'
        document.querySelector('body').classList.add('scroll-hide')
        }
        else{
        displayOpt = 'none';
        document.querySelector('body').classList.remove('scroll-hide')
        };
    
        document.getElementById('loading').style.display = displayOpt;
        document.getElementById('overlay').style.display = displayOpt;
    }
    
    //---------------------------------------------------------------

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

    function mostrarModalConfirmacaoExclusao() {
      return new Promise((resolve) => {
        var modal = new bootstrap.Modal(document.getElementById('modalConfirmacao'));
    
        document.getElementById('modalConfirmacaoLabel').textContent = 'Atenção!';
        document.getElementById('modalConfirmacaoBody').textContent = 'Você realmente deseja excluir esse registro?';
    
        // Adicionar eventos para lidar com os botões "Confirmar" e "Cancelar"
        var btnConfirmar = document.getElementById('modal-c-confirmar');
        var btnCancelar = document.getElementById('modal-c-cancelar');
    
        btnConfirmar.addEventListener('click', function () {
          modal.hide(); // Oculta o modal
          resolve(true); // Resolve a Promise com true
        });
    
        btnCancelar.addEventListener('click', function () {
          modal.hide(); // Oculta o modal
          resolve(false); // Resolve a Promise com false
        });
    
        modal.show();
      });
    }

//------------------------------Paginação----------------------------------

function atualizarPaginacao(evento){
  const textoColocar = `Pagina: ${paginaAtual} de ${paginasTotais}`

  document.getElementById('currentPage').textContent = textoColocar

  if(evento == 'proxima' && paginaAtual < paginasTotais){

    paginaAtual = parseInt(paginaAtual) + 1;

    limparListaPresentes();
    buscarListaDePresentes(paginaAtual, lista);
    scrollParaOInicio();
  }
  else if(evento == 'anterior' && paginaAtual > 1){

    paginaAtual = parseInt(paginaAtual) - 1;
    
    limparListaPresentes();
    buscarListaDePresentes(paginaAtual, lista);
    scrollParaOInicio();
  }
};

function limparListaPresentes(){
  const container = document.querySelector('#presentes-container');
  const listaItem = document.querySelectorAll('.list-group-item');

  container.classList.remove('show-container')
  listaItem.forEach(item => {item.remove()});
};

//------------------------------Função do botão salvar----------------------------------

function alterarProduto(){
  loading('exibir');
    const idProduto = itemEscolhido.Dados.Idproduto;
    const nomeProduto = document.getElementById('inputproduto').value;
    const inputLink = document.getElementById('inputLink').value;
    const inputLinkimg = document.getElementById('inputLinkimg').value;
    const inputSituacao = document.getElementById('inputSituacao').value;
    const qtdDisponivel = document.getElementById('inputQtd').value;

if(idProduto && nomeProduto && inputLink && inputLinkimg){
  
  const endpoint = `https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path=alterar&local=${lista}&${new Date().getTime()}`

  const body = {
    "Id":idProduto,
    "Descricao":nomeProduto,
    "Link":inputLink,
    "Linkimg":inputLinkimg,
    "Situacao":inputSituacao,
    "QtdMax":qtdDisponivel
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
      if(data.Status == 200){
      fecharModal();
      limparGrid();
      mostrarModal('Sucesso', data.Mensagem)
      loading('ocultar')
      }
      else{
        mostrarModal('Erro', data.Mensagem)
        loading('ocultar')
      }; 

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

function excluirProduto(id) {
  mostrarModalConfirmacaoExclusao()
    .then((confirmado) => {
      if (confirmado) {
        if (id) {
          loading('exibir');
          const endpoint = `https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path=excluir&local=${lista}&${new Date().getTime()}` + new Date().getTime();

          const body = {
            "Id": id,
          };

          const configuracao = {
            method: 'POST',
            body: JSON.stringify(body),
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
              mostrarModal('Sucesso', "Exclusão bem Sucedida")
              loading('ocultar');
            })
            .catch(error => {
              console.error('Erro durante a requisição:', error);
              loading('ocultar');
              mostrarModal('Erro', 'Erro durante a requisição')
            });
        } else {
          mostrarModal('Erro', `Id não enviado na requisição`)
          loading('ocultar');
        }
      } else {
        loading('ocultar');
      }
    });
}

function excluirReserva(id) {
  mostrarModalConfirmacaoExclusao()
    .then((confirmado) => {
      if (confirmado) {
        if (id) {
          loading('exibir');
          const endpoint = `https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path=excluirReserva&local=${lista}&${new Date().getTime()}` + new Date().getTime();

          const body = {
            "Id": id,
          };

          const configuracao = {
            method: 'POST',
            body: JSON.stringify(body),
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
              if(data.Status == 200){
              document.querySelector(`.itemGrid[id="${id}"]`).remove();
              mostrarModal('Sucesso', "Exclusão bem Sucedida");
              loading('ocultar');
              }
              else if(data.Status == 400){
                mostrarModal('Erro', data.Mensagem)
                loading('ocultar');
              }
              else{
                mostrarModal('Erro', 'Erro interno do servidor')
                loading('ocultar');
              }
            })
            .catch(error => {
              console.error('Erro durante a requisição:', error);
              loading('ocultar');
              mostrarModal('Erro', 'Erro durante a requisição')
            });
        } else {
          mostrarModal('Erro', `Id não enviado na requisição`)
          loading('ocultar');
        }
      } else {
        loading('ocultar');
      }
    });
}

function fecharModal(){
  const event = new Event('click')
  document.querySelector('#dadosFechar').dispatchEvent(event)
}

//----------------------------------------------------------------

function scrollParaOInicio(){
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

//------------------------------Função do Botão de Fechar do Modal informativo-------------------------

document.getElementById('modal-cancelar').addEventListener('click',  () => {limparListaPresentes();  buscarListaDePresentes(paginaAtual, lista)})
