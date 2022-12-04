// keyCode aparece como deprecado no arquivo separado. E a função não funciona. 

window.addEventListener('keydown', function(e) {
    const audio = document.querySelector(`audio[data-letra="${e.keyCode}"]`);
    const tecla = document.querySelector(`.tecla[data-letra="${e.keyCode}"]`);
    // console.log(e.keyCode); //  mostra o código da tecla no console. 
    if (!audio) return;
    audio.currentTime = 0;     
    audio.play();
    tecla.classList.add(`tocando`);

    window.addEventListener('keyup', function(e) {
    if (!audio) return;
    tecla.classList.remove(`tocando`);
    })
});

