var input = document.querySelectorAll('input');
var listaCamposSelecionaveis = document.querySelectorAll('[tabindex]')


/*Clique em teclas*/
for(let i = 0; i < listaCamposSelecionaveis.length; i++){
    let idCampo = listaCamposSelecionaveis[i].id;
    let idProximoCampo = 0
    if(i + 1 >= listaCamposSelecionaveis.length){
        idProximoCampo = listaCamposSelecionaveis[listaCamposSelecionaveis.length - 1].id
    }
    else{
        idProximoCampo = listaCamposSelecionaveis[i + 1].id
    }
    
    listaCamposSelecionaveis[i].addEventListener('keydown', (e) => {teclaPressionada(e, idCampo)})
    }

    //Definir Atalhos

    document.addEventListener('keydown', (e) => {teclaPressionada(e)})

    function teclaPressionada(e, idCampo) {
        var tecla = e.key;
        switch(tecla){
            case 'Enter':
                diretivaTabindex(e, idCampo) ;
                break
            case 'Escape' :
                if(idUltimoModalAberto =! '')
                {rModalFechar__Atalho()};
                break   
        }
    }

    function diretivaTabindex(e, idCampo){
        var tabIndex = idCampo ? document.querySelector(`#${idCampo}`).tabIndex : false;
        var proximoCampo = document.querySelector(`[tabIndex="${tabIndex + 1}"]`)
        
          const campoSelecionado = idCampo ? document.getElementById(idCampo): false;
            if(campoSelecionado.nodeName == ('INPUT' || 'SELECT')){
                e.preventDefault();
                proximoCampo.focus();
            }    
    }
 
    var contadorCamposEmBranco = 0

    function verificaCampoObrigatorio() {
        const camposObrigatorios = document.querySelectorAll('[required]');

        camposObrigatorios.forEach(campo => {
            const campoValor = campo.value;
            const selectValor = document.querySelector('#selectLista').options.selectedIndex;
            const campoTipo = campo.nodeName;
            const mensagemExiste = document.querySelectorAll(`.mensagemVermelha[for="${campo.id}"]`);
    
            if (campoTipo === 'INPUT' && campoValor === '' && mensagemExiste.length === 0) {
                campo.style.borderColor = 'red';
                campo.parentElement.insertAdjacentHTML('beforeend', `<p class="mensagemVermelha" for="${campo.id}">Obrigatório*</p>`);
                campo.addEventListener('input', tirarMensagemVermelha);
                contadorCamposEmBranco ++
            }
            // ...
            else if (campoTipo === 'SELECT' && selectValor === 0 && mensagemExiste.length === 0) {
                campo.style.borderColor = 'red';
                campo.parentElement.insertAdjacentHTML('beforeend', `<p class="mensagemVermelha" for="${campo.id}">Obrigatório*</p>`);
                campo.addEventListener('input', tirarMensagemVermelha);
                contadorCamposEmBranco ++
            }
        });

        if(contadorCamposEmBranco == 0){
            cadastrarProduto();
        }
    };
    
    // Função para remover mensagem vermelha e event listener
    function tirarMensagemVermelha(event) {
        let mensagem = document.querySelector(`.mensagemVermelha[for="${event.target.id}"`) ;
        let inputTirar = document.querySelector(`#${event.target.id}`);
    
        if (mensagem) {
            mensagem.remove();
            inputTirar.removeAttribute('style');
            inputTirar.removeEventListener('input', tirarMensagemVermelha);
            contadorCamposEmBranco --
        }
    };
    

    /*Ocultar container Cadastro ao sair da página, para quando voltar, fazer a animação*/

    const buttonPresentes = document.querySelectorAll('nav-link');
        buttonPresentes.forEach(item => {item.addEventListener('click', () => {document.querySelector('#cadastro-container').classList.remove('show-container')})});
    