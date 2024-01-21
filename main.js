var input = document.querySelectorAll('input');

/*Digitar em qualquer input*/
for(let i = 0; i < input.length; i++){
let idCampo = input[i].id
input[i].addEventListener('input', () => {tirarMensagemVermelha(idCampo)})
}

/*Clique em teclas*/
for(let i = 0; i < input.length; i++){
    let idCampo = input[i].id;
    let idProximoCampo = 0
    if(i + 1 >= input.length){
        idProximoCampo = input[input.length - 1].id
    }
    else{
        idProximoCampo = input[i + 1].id
    }
    
    input[i].addEventListener('keydown', (e) => {teclaPressionada(e, idCampo)})
    }