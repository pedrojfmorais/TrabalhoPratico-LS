import { NUMERO_LINHAS_DIFICULDADE, NUMERO_PALAVRAS_DIFICULDADE, PALAVRAS_POSSIVEIS } from "../constants";

function getRandomNumber(max){
    return Math.floor(Math.random() * max);
}

function generateRandomLetter() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return characters.charAt(getRandomNumber(characters.length));
}

function getRandomWord(palavrasUtilizador) {
    palavrasUtilizador = palavrasUtilizador.concat(PALAVRAS_POSSIVEIS);
    return palavrasUtilizador[getRandomNumber(palavrasUtilizador.length)];
}

function preencheTabelaJogoEspacos(tabelaJogoTemp, dificuldadeAtual){
    
    tabelaJogoTemp = [[]];

    tabelaJogoTemp = Array(NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1]).fill(0).map( 
        () => new Array(NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1]).fill(' '));

    return tabelaJogoTemp;
}


function preencheTabelaJogoComLetrasRandom(tabelaJogoTemp, dificuldadeAtual){
    
    for (let linha = 0; linha < NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1]; linha++) {
        for (let coluna = 0; coluna < NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1]; coluna++) {
            if(tabelaJogoTemp[linha][coluna] === " ")
                tabelaJogoTemp[linha][coluna] = generateRandomLetter();
        }
    }
    return tabelaJogoTemp;
}

function geraPalavrasRandom(dificuldadeAtual, palavrasUtilizador){

    let palavras = [];

    let novaPalavra = true;

    for (let i = 0; i < NUMERO_PALAVRAS_DIFICULDADE[dificuldadeAtual-1]; i++) {
        let palavra = getRandomWord(palavrasUtilizador);

        while(true){
            novaPalavra = true;
            for (let index = 0; index < palavras.length; index++)
                if(palavras[index] === palavra || palavra.length > NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1]){
                novaPalavra = false;
                palavra = getRandomWord(palavrasUtilizador);
                break;
                }
                
            if(novaPalavra)
                break;
        }

        palavras.push(palavra);
    }
    return palavras;
}

function colocaPalavraTabelaJogo(dados, tabelaJogoTemp){

    const [linha, coluna, orientacao, palavra] = dados;

    switch (orientacao) {
        case 1:
        // cima baixo
        for (let index = 0; index < palavra.length; index++)
            tabelaJogoTemp[linha+index][coluna] = palavra[index];
        break;
        case 2:
        // diagonal esquerda cima -> direita baixo
        for (let index = 0; index < palavra.length; index++)
            tabelaJogoTemp[linha+index][coluna+index] = palavra[index];
        break;

        case 3:
        // diagonal esquerda baixo -> direita cima
        for (let index = 0; index < palavra.length; index++) 
            tabelaJogoTemp[linha-index][coluna+index] = palavra[index];
        break;

        default:
            // esquerda direita
            for (let index = 0; index < palavra.length; index++)
                tabelaJogoTemp[linha][coluna+index] = palavra[index];
            break;
    }
    return tabelaJogoTemp;
}

function geraComoColocarNaTabela(tabelaJogoTemp, palavras, dificuldadeAtual){

    let palavrasComNovaOrdem = [];

    palavras.forEach(palavra => {

        const nLinhas = NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1];

        let linha = getRandomNumber(nLinhas);
        let coluna = getRandomNumber(nLinhas);
        
        let orientacao = getRandomNumber(2);
        
        if(orientacao % 2 === 1)
            palavrasComNovaOrdem.push(palavra.split("").reverse().join(""));
        else
            palavrasComNovaOrdem.push(palavra);

        while (true) {
        
            let conseguiuColocar = true;
            let celulasOcupadasParaEste = [];

            linha = getRandomNumber(nLinhas);
            coluna = getRandomNumber(nLinhas);
            
            orientacao = getRandomNumber(4);
            
            switch (orientacao) {
                case 1:
                // cima baixo

                if(linha + palavra.length >= NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1])
                    linha = NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1] - palavra.length;

                for (let index = 0; index < palavra.length; index++)
                    celulasOcupadasParaEste.push([linha+index, coluna]);
                break;

                case 2:
                // diagonal esquerda cima -> direita baixo

                if(linha + palavra.length >= NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1])
                    linha = NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1] - palavra.length;

                if(coluna + palavra.length >= NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1])
                    coluna = NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1] - palavra.length;
                    
                for (let index = 0; index < palavra.length; index++)
                    celulasOcupadasParaEste.push([linha+index, coluna+index]);
                break;

                case 3:
                // diagonal esquerda baixo -> direita cima
                
                if(linha - palavra.length <= -1)
                    linha = palavra.length - 1; // porque o index começa em 0

                if(coluna + palavra.length >= NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1])
                    coluna = NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1] - palavra.length;

                    
                for (let index = 0; index < palavra.length; index++) 
                    celulasOcupadasParaEste.push([linha-index, coluna+index]);
                break;

                default:
                // esquerda direita

                if(coluna + palavra.length >= NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1])
                    coluna = NUMERO_LINHAS_DIFICULDADE[dificuldadeAtual-1] - palavra.length;

                for (let index = 0; index < palavra.length; index++)
                    celulasOcupadasParaEste.push([linha, coluna+index]);
                break;
            }
            for (let letra = 0; letra < celulasOcupadasParaEste.length; letra++) {
                if(tabelaJogoTemp[celulasOcupadasParaEste[letra][0]][celulasOcupadasParaEste[letra][1]] !== ' '){
                    conseguiuColocar = false;
                    break;
                }
            }
            if(conseguiuColocar === true){
                tabelaJogoTemp = colocaPalavraTabelaJogo([linha, coluna, orientacao, palavra], tabelaJogoTemp);
                break;
            }
        }
    });
    return tabelaJogoTemp;
}

function trocaLetraPorObjeto(tabelaJogoTemp){

    tabelaJogoTemp = tabelaJogoTemp.map((linha, index_linha) => (
        linha.map((coluna, index_coluna) => (
            {
                letra: coluna,
                isHighlighted: false,
                isCorrect: false
            }
        ))
    ));
    return tabelaJogoTemp;
}

function colocaPalavrasTabelaJogo(dificuldadeAtual, tabelaJogoTemp, palavrasEmJogo, palavrasUtilizador){

    if (dificuldadeAtual === 0)
        return;

    tabelaJogoTemp = preencheTabelaJogoEspacos(tabelaJogoTemp, dificuldadeAtual);

    palavrasEmJogo = geraPalavrasRandom(dificuldadeAtual, palavrasUtilizador);
    palavrasEmJogo = palavrasEmJogo.sort((a, b) => b.length - a.length);

    tabelaJogoTemp = geraComoColocarNaTabela(tabelaJogoTemp, palavrasEmJogo, dificuldadeAtual);

    tabelaJogoTemp = preencheTabelaJogoComLetrasRandom(tabelaJogoTemp, dificuldadeAtual);

    tabelaJogoTemp = trocaLetraPorObjeto(tabelaJogoTemp);

    return [tabelaJogoTemp, palavrasEmJogo];
}

function initTabelaPalavras(dificuldadeAtual, palavrasUtilizador){

    let tabelaJogoTemp = [[]];
    let palavrasEmJogo = [];  

    [tabelaJogoTemp, palavrasEmJogo] = colocaPalavrasTabelaJogo(dificuldadeAtual, tabelaJogoTemp, palavrasEmJogo, palavrasUtilizador);
    
    return [tabelaJogoTemp, palavrasEmJogo];
}

export default initTabelaPalavras;