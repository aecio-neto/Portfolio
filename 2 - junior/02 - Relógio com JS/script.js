// atribuindo a hora aos ponteiros
const ponteiroSeg = document.querySelector(`.ponteiro-seg`);
const ponteiroMin = document.querySelector(`.ponteiro-min`);
const ponteiroHr = document.querySelector(`.ponteiro-hr`);
function setDate() {
    const agora = new Date();
    const seg = agora.getSeconds();
    const grausSeg = ((seg / 60) * 360) + 90;
    ponteiroSeg.style.transform =  `rotate(${grausSeg}deg)`;
    //console.log(seg)

    const min = agora.getMinutes();
    const grausMin = ((min / 60) * 360) + 90;
    ponteiroMin.style.transform = `rotate(${grausMin}deg)`
    
    const hr = agora.getHours();
    const grausHr = ((hr / 12) * 360) + 90;
    ponteiroHr.style.transform = `rotate(${grausHr}deg)`
    console.log(hr, min, seg)

    if (grausMin == 360) {
        return grausMin = rotate(`2deg`);
    }
}

setInterval(setDate, 1000);
setDate(); // o relógio aparece junto com o carregamento da página. 