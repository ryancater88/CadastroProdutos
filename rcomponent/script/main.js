function rModalFechar(idModal){
 document.querySelector(`.rmodal-overlay[id="${idModal}"]`).remove();
}

function rModalAbrir(title, bodycontent, havePrimaryButton){
    const page = document.querySelector('body');
    var minimo = 1;
    var maximo = 1000;
    var numeroIntervalo = Math.random() * (maximo - minimo) + minimo;

    page.insertAdjacentHTML('beforeend', 
        `
        <div class="rmodal-overlay" id="${numeroIntervalo}">
		<div class="rmodal" id="${numeroIntervalo}">
			<div class="rmodal-container" id="${numeroIntervalo}">
				<div class="rmodal-header" id="${numeroIntervalo}">
					<span class="rmodal-title" id="${numeroIntervalo}">${title}</span>
					<div class="rmodal-closeBut"id="${numeroIntervalo}">
						<button class="rmodal-closebutton" id="${numeroIntervalo}">X</button>
					</div>
				</div>
				<div class="rmodal-body" id="${numeroIntervalo}">
					${bodycontent}
				</div>
				<div class="rmodal-footer" id="${numeroIntervalo}">
					<div class="rmodal-groupbutton" id="${numeroIntervalo}">
						<button class="rmodal-primarybutton" id="${numeroIntervalo}">Salvar</button>
						<button class="rmodal-secondarybutton" id="${numeroIntervalo}">Fechar</button>
					</div>
				</div>
			</div>
		</div>
	</div>
        `
    )

    const buttonClose = document.querySelector(`.rmodal-closebutton[id="${numeroIntervalo}"]`);
	const buttonPrimary = document.querySelector(`.rmodal-primarybutton[id="${numeroIntervalo}"]`);
    const buttonSecondary = document.querySelector(`.rmodal-secondarybutton[id="${numeroIntervalo}"]`);

	if(!havePrimaryButton){
		buttonPrimary.remove();
	}

    buttonClose.addEventListener('click', () => {rModalFechar(numeroIntervalo)});
    buttonSecondary.addEventListener('click', () => {rModalFechar(numeroIntervalo)});
};