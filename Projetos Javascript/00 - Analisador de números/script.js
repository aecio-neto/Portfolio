let listanum = []
function adicionar() {
    let numf = document.getElementById(`txtn`), num = Number(numf.value);
    let tab = document.getElementById(`seltab`)
    let chave = num
    let added = listanum.indexOf(chave)
    // Evita a inclusão de números repetidos
    if (added >= 0 && added < listanum.length) {
    window.alert(`Número já cadastrado`)
    }
    // Evita a inclusão de números fora do intervalo estabelecido. 
    else if (num == 0 || num < 1 || num > 100) {
        window.alert(`Por favor, escolha um número entre 1 e 100`)
    } else {
        listanum.push(num)
        let item = document.createElement(`option`)
        item.text = `Valor ${num} adicionado.`
        // item.value = `` garante que o form pegue esse valor
        tab.appendChild(item)
    }
}

function analisar() {
    // Garante que o array será classificado em ordem crescente. 
    listanum.sort(function(a, b) {return a - b})
    let maior = listanum[listanum.length - 1]
    let menor = listanum[0]
    let total = 0
    for (i = 0; i < listanum.length; i++) {
        total += listanum[i]
    }
    let media = total / listanum.length
    let res = document.getElementById(`res`)
    //res.innerHTML = `Ao todo, temos ${listanum.length} números cadastrados.`
    res.innerHTML = `Ao todo, temos ${listanum.length} números cadastrados.<br>
                    O maior valor informado foi ${maior}.<br>
                    O menor valor informado foi ${menor}.<br>
                    A soma de todos os valores é igual a ${total}.<br>
                    A média dos valores informados é ${media}.`
} 

// Ao todo, temos X números cadastrados. 
// O Maior valor informado foi X.
// O menor valor informado foi X. 
// Somando todos os valores temos X. 
// A média dos valores digitados é X. 

//////////////////////////        Consegui fazer! Aeeeeeeee          /////////////////////////////

// APÓS ASSISTIR A RESOLUÇÃO

/* 

I) Vi que no final da primeira função posso colocar:
num.value = ``
num.focus()
Isso ajuda a adicionar valores de forma mais fácil na lista. 

II) Esqueci de colocar um aviso quando o usuário clica em analisar sem ter colocado valores no array.

III) Posso usar operadores de atribuição =+ para concatenar innerHTML. E também inserir tags <p> para cada frase. 

IV) O Guanabara gastou 64 linhas de código. Eu fiz em 40. Faltaram alguns detalhes. De toda forma, achei a minha solução mais elegante. 

 */


/* 

                            PRÓXIMOS PASSOS - Segundo o Guanabara

I) Finalizar o curso de HTML5 e CSS. 
II) Estudar muito as funções
 => arrow functions
 => callback
 => funções anônimas
 => iifes
 => javascript funcional

 III) Estudar objetos

 IV) Modularização - deixar códigos em arquivos separados. Reutilizar códigos. 

 V) Expressões regulares RegEx - funciona bem para validação de dados. 

 Vi) JSON

 VII) AJAX - rolagem infinita de páginas, (parece um carregamento de páginas e conteúdo a partir de ventos. Como a rolagem da página, por exemplo)

VIII) NodeJS


*/