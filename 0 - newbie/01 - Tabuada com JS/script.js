                                    
    /////// Exercício 16 - CONTAGEM COM JAVASCRIPT
    
    function contando() {
    let iniciof = document.querySelector(`input#iniciotxt`), inicio = Number(iniciof.value);
    let fimf = document.querySelector(`input#fimtxt`), fim = Number(fimf.value);
    let passof = document.querySelector(`input#passotxt`), passo = Number(passof.value);
    let res = document.querySelector(`p#res`)
    let contagem = ` `;
    while (inicio <= fim && inicio !== ` `) {
        // alerta de passo ausente
        if (passo == ` ` || passo == 0) {
            window.alert(`Passo inváliddo. Considerando Passo 1`);
            passo = 1;
        // Alerta de início ausente
        } else if (inicio == ` `) {
            window.alert(`ERRO - Início inváliddo. Verifique`);
            break
        }
        // Montando a contagem
        else {
            contagem = contagem + `${inicio} &rarr; `
            inicio = inicio + passo;
        }
        // Display da contagem
        res.innerHTML = `${contagem} &#127937`
    } 
} 

// Consegui resolver e implementar as principais partes do desafio. Durante o vídeo da resolução, vi que era necessário contar de trás pra frente também, e isso eu não fiz. 
// Pontos fortes da minha resolução: declaração de variáveis. 
// Pontos fracos: repetições e uso while. Fazer com o for fica mais elegante. 
// Nota: usar atalhos de operadores ++, +=, etc. 

/////// Exercício 17 - TABUADA COM JAVASCRIPT

// Tentativa 1  
/* function tabuada() {
    let numerof = document.querySelector(`input#numerotxt`), numero = Number(numerof.value);
    let base = 1;
    let total = numero * base;
    let selecionar = document.querySelector(`select#selecttxt`)
    opcao.setAttribute(`value`, `${numero} multiplicado por ${base} é igual a ${total}`);
    if (numero == ` `) {
        window.alert(`Por favor, escolha um número.`)
    }
    if (numero = 7) {
        selecionar.appendChild(`option`) // Depois da resolução, vi que essas aspas estavam me matando. 

    }
} */

// Tentativa 2
/* let res = document.getElementById(`#res`)
function tabuada() {
    switch(multiplicacao) {
        case 0: 
            res.innerHTML = `O que acontece aqui?`
            res.appendChild = `<p>paragrafo</p>`
            break
       case 1: 
            console.log(`Segunda-feira`)
            break
         case 2: 
            console.log(`Terça-feira`)
            break
        case 3: 
            console.log(`Quarta-feira`)
            break
        case 4: 
            console.log(`Quinta-feira`)
            break
        case 5: 
            console.log(`Sexta-feira`)
            break
        case 6: 
            console.log(`Sábado`)
            break
        default:
            console.log(`[Erro] Dia inválido`)
            break 
    }
}*/

// Tentativa 3
/* function tabuada() {
    let numf = document.getElementById(`numerotxt`), num = Number(numf.value)
    let res = document.getElementById(`#res`)
    let opcao = document.createElement(`option`)
    opcao.setAttribute(`value`, `testedovalor`)
    res.appendChild(`option`)
} */

// A tentativa 3 ficou quase no mesmo lugar da tentativa 1, ou seja, não consegui testar a inserção de itens dentro do select. PS - Agora eu vi as aspas no option.

// Resolução

function tabuada() {
    let num = document.getElementById(`txtn`), n = Number(num.value) 
    let tab = document.getElementById(`seltab`)
    if (num.value.length == 0) {
    // o .value.length dispara o aviso se não tiver número. Faz a tabuada de 0 funcionar.
        window.alert(`Por favor, digite um número`)
    } else {
        
        // Código com while
        /*let c = 1;
        tab.innerHTML = ``; // Serve para limpar as opções do select gerado.
        
         while (c <= 10) {
            let item = document.createElement(`option`)
            item.text = `${n} x ${c} = ${n * c}` // interessante a multiplicação dentro dos {}.
            item.value = `res${c}`
            tab.appendChild(item) // errei bastante aqui, pois coloquei o item entre crases. O console mostrava problema com o appendChild, mas não vi esse detalhe.
            c++
        } */

        // Código com for
        tab.innerHTML = ``;
        for (let contador = 1; contador <= 10; contador++) {
            let opcoes = document.createElement(`option`)
            opcoes.text = `${n} x ${contador} = ${n * contador}` // interessante a multiplicação dentro dos {}.
            opcoes.value = `res${contador}` //garante que o form pegue as informações
            tab.appendChild(opcoes)
        }
    }

}


// O que vou fazer é inserir um option dentro daquele select e ver se ele aparece. 
// let img = document.createElement(`img`)
// img.setAttribute(`src`, `imagens/crianca-h.png`)
// res.appendChild(img)