
//ao abrir a pagina
let paginaAtual = 1
let paginasTotais = 0
let lista = null
let descricao = null
let reservado = null


setTimeout(() =>{document.getElementById('presentes-container').classList.add("show-container");}, 50);

document.querySelector('#btn-search').addEventListener('click', () => {
  lista = document.querySelector('#qualLista').selectedIndex.valueOf();
  descricao = document.querySelector('#descicao_produto').value;
  document.querySelectorAll('input[name="reserva"]').forEach(input => {if (input.checked){reservado = input.value}});

  if(lista == 0){
    rModalAbrir('Erro', 'Selecione uma lista');
    return;
  }
  
  buscarListaDePresentes(paginaAtual, lista);
})


// Função para buscar a lista de presentes ao abrir a página
let listaDePresentes = [];


function buscarListaDePresentes(page, lista) {
   loading('exibir');
   limparListaPresentes();
   
    var apiLink = `https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path=buscar&local=${lista}&${new Date().getTime()}`
    var body = {
        'Page':`${page}`,
        'Pagelength':'10',
        "Filtro": {
          "Descricao": descricao,
          "Reservado": reservado
        }
      }
    
const configuracao = {
    method: 'POST', // Método HTTP
    body: JSON.stringify(body) // Converte o objeto JavaScript para uma string JSON
  };

 
fetch(apiLink, configuracao)
    .then(response => {
      if (!response.ok) {
       loading('Ocultar');
       rModalAbrir('Erro', 'Erro na requisição');
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if(data.Status == 400){
        loading('Ocultar');
        rModalAbrir('Erro', data.Mensagem)
      }
      else if(data.Dados == ''){
        loading('Ocultar');
        rModalAbrir('Erro', 'Nenhum registro encontrado')
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
       rModalAbrir('Erro', 'Erro na requisição');
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      itemEscolhido = data;
      chamarModalDados();
      loading('ocultar')
    })
    .catch(error => {
      console.error('Erro durante a requisição:', error);
      loading('ocultar');
      // Mostrar um modal de erro se necessário
    });

}

//Construindo modal de dados

function chamarModalDados() {
    const nomeProduto = itemEscolhido.Dados.Nomeproduto;
    const inputLink = itemEscolhido.Dados.Linkproduto;
    const inputLinkimg = itemEscolhido.Dados.Linkimagem;
    const inputSituacao = itemEscolhido.Dados.Situacao;
    const qtdDisponivel = itemEscolhido.Dados.Qtd_disponivel;
    const listaReservas = itemEscolhido.Dados.Reservas;
    const idProduto = itemEscolhido.Dados.Idproduto;

    const html = `<div class="produto-modal">
    <div id="nomeproduto">
      <label for="inputproduto" class="produto-modal-label">Nome do Produto:</label>
      <input id="inputproduto" name="Produto" required class="produto-modal-input" value="${nomeProduto}"maxlength="50">
    </div>
    <div id="link">
      <label for="inputLink" class="produto-modal-label">Link:</label>
      <input id="inputLink" name="Link" required class="produto-modal-input" maxlength="1000"  value="${inputLink}">
    </div>
    <div id="Linkimg">
      <label for="inputLinkimg" class="produto-modal-label">Link da Imagem:</label>
      <input id="inputLinkimg" name="Linkimg" required class="produto-modal-input" maxlength="1000"  value="${inputLinkimg}">
    </div>
    <div id="qtd">
      <label for="inputQtd" class="produto-modal-label">Quantidade Disponível:</label>
      <input type="number" id="inputQtd" name="Qtd" required class="produto-modal-input" max="50" min="1" maxlength="3"  value="${qtdDisponivel}">
    </div>
    <div id="Situacao">
      <label for="inputSituacao" class="produto-modal-label">Situacao:</label>
      <select id="inputSituacao">
        <option value="0">Não-reservado</option>
        <option value="1">Reservado</option>
        <option value="2" selected hidden>Selecione</option>
      </select>
    </div>
    <div id="containerReserva">
      <label for="gridReserva" class="produto-modal-label">Reservas:</label>
      <div id="gridReserva" class="gridReserva">
        <!-- Dados da grid-->
      </div>						
    </div>`
    
    rModalAbrir('Dados', html, 1)

    document.querySelector('#inputSituacao').value = inputSituacao;
     
    listaReservas.forEach(convidadoReserva => {
      var htmlInserir = `<li id=${convidadoReserva.Idreserva} class="itemGrid">
      <span class="itemColumn" nome><b>Convidado</b>: ${convidadoReserva.Nomeconvidado}</span>
      <button onclick=excluirReserva(${convidadoReserva.Idreserva})>Excluir</button>
    </li>`
    
      document.getElementById('gridReserva').insertAdjacentHTML('beforeend', htmlInserir)
    });

    document.querySelector('.rmodal-primarybutton').addEventListener('click', () => {alterarProduto(idProduto)});
    loading('ocultar');
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
    
    function rModalAbrirConfirmacaoExclusao() {
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
       rModalAbrir('Erro', 'Erro na requisição');
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if(data.Status == 200){
      buscarListaDePresentes(paginaAtual, lista)
      rModalAbrir('Sucesso', data.Mensagem)
      loading('ocultar')
      }
      else{
        rModalAbrir('Erro', data.Mensagem)
        loading('ocultar')
      }; 

    })
    .catch(error => {
      console.error('Erro durante a requisição:', error);
      loading('ocultar');
      rModalAbrir('Erro', 'Erro durante a requisição:')
    });

}
else{
  let campoBranco = []

  if(idProduto == ""){campoBranco.push("Id")};
  if(nomeProduto == ""){campoBranco.push("Descricão")};
  if(inputLink == ""){campoBranco.push("Link")};
  if(inputLinkimg == ""){campoBranco.push("Link Img")};

  console.log(campoBranco)

  rModalAbrir('Erro', `Preencha os seguintes campos: ${campoBranco}`)
  loading('ocultar');
}

}

function excluirProduto(id) {
  rModalAbrirConfirmacaoExclusao()
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
                rModalAbrir('Erro', 'Erro na requisição');
                throw new Error(`Erro na requisição: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              if(data.Status == 200){
                rModalAbrir('Sucesso', "Exclusão bem Sucedida")
                loading('ocultar');
                document.querySelector(`.list-group-item[id="${id}"]`).remove();
              }
              else{
                rModalAbrir('Erro', data.Mensagem);
                loading('ocultar');
              }
            })
            .catch(error => {
              console.error('Erro durante a requisição:', error);
              loading('ocultar');
              rModalAbrir('Erro', 'Erro durante a requisição')
            });
        } else {
          rModalAbrir('Erro', `Id não enviado na requisição`)
          loading('ocultar');
        }
      } else {
        loading('ocultar');
      }
    });
}

function excluirReserva(id) {
  rModalAbrirConfirmacaoExclusao()
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
                rModalAbrir('Erro', 'Erro na requisição');
                throw new Error(`Erro na requisição: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              if(data.Status == 200){
              document.querySelector(`.itemGrid[id="${id}"]`).remove();
              rModalAbrir('Sucesso', "Exclusão bem Sucedida");
              loading('ocultar');
              }
              else if(data.Status == 400){
                rModalAbrir('Erro', data.Mensagem)
                loading('ocultar');
              }
              else{
                rModalAbrir('Erro', 'Erro interno do servidor')
                loading('ocultar');
              }
            })
            .catch(error => {
              console.error('Erro durante a requisição:', error);
              loading('ocultar');
              rModalAbrir('Erro', 'Erro durante a requisição')
            });
        } else {
          rModalAbrir('Erro', `Id não enviado na requisição`)
          loading('ocultar');
        }
      } else {
        loading('ocultar');
      }
    });
}

//----------------------------------------------------------------

function scrollParaOInicio(){
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

//------------------------------Função do Botão de Fechar do Modal informativo-------------------------

document.getElementById('modal-cancelar').addEventListener('click',  () => {limparListaPresentes();  buscarListaDePresentes(paginaAtual, lista)})