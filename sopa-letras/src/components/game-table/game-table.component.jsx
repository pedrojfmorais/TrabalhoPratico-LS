import React from "react";
function GameTable() {

    const palavrasPossiveis = ['REACT', 'JAVASCRIPT', 'HTML', 'CSS', 'BACKBONE', 'ANGULAR', 'SVELTE', 'EMBER', 'BOOTSTRAP', 'VUE', 'JAVA', 'PYTHON', 'SQL']; 
    
    const nPalavrasDificuldade = [5, 7, 9];
    const nLinhasDificuldade = [10, 15, 20];
    let tabelaJogo = [[]];
    let palavrasEmJogo = [];
  
    const dificuldadeAtual = 1; //debug

    function getRandomNumber(max){
      return Math.floor(Math.random() * max);
    }
  
    function generateRandomLetter() {
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return characters.charAt(getRandomNumber(characters.length));
    }
    
    function getRandomWord() {
      return palavrasPossiveis[getRandomNumber(palavrasPossiveis.length)];
    }
    
    function preencheTabelaJogoComLetrasRandom(){
      tabelaJogo = [[]];
      tabelaJogo = Array(nLinhasDificuldade[dificuldadeAtual-1]).fill(0).map( 
        () => new Array(nLinhasDificuldade[dificuldadeAtual-1]).fill(0).map( 
          () => generateRandomLetter()
          )
        );
    }
  
    function geraPalavrasRandom(){

      let palavras = [];

      let novaPalavra = true;

      for (let i = 0; i < nPalavrasDificuldade[dificuldadeAtual-1]; i++) {
        let palavra = getRandomWord();

        while(true){
          novaPalavra = true;
          for (let index = 0; index < palavras.length; index++)
            if(palavras[index] === palavra || palavra.length > nLinhasDificuldade[dificuldadeAtual-1]){
              novaPalavra = false;
              palavra = getRandomWord();
              break;
            }
            
          if(novaPalavra)
            break;
          
        }

        palavras.push(palavra);
      }
      return palavras;
    }

    
    function geraComoColocarNaTabela(palavras){

      let palavrasEmJogoDados = [];
      let celulasOcupadas = [];

      palavras.forEach(palavra => {

        const nLinhas = nLinhasDificuldade[dificuldadeAtual-1];

        let linha = getRandomNumber(nLinhas);
        let coluna = getRandomNumber(nLinhas);
        
        let orientacao = getRandomNumber(8);

        while (true) {
          
          let conseguiuColocar = true;
          let celulasOcupadasParaEste = [];
      
          linha = getRandomNumber(nLinhas);
          coluna = getRandomNumber(nLinhas);
          
          orientacao = getRandomNumber(8);
      
          if(orientacao % 2 === 0)
            palavra = palavra.split("").reverse().join("");

          orientacao = Math.floor(orientacao / 2);
          
          switch (orientacao) {
            case 1:
              // cima baixo

              if(linha + palavra.length >= nLinhasDificuldade[dificuldadeAtual-1])
                linha = nLinhasDificuldade[dificuldadeAtual-1] - palavra.length;

              for (let index = 0; index < palavra.length; index++)
                celulasOcupadasParaEste.push([linha+index, coluna]);
              break;

            case 2:
              // diagonal esquerda cima -> direita baixo

              if(linha + palavra.length >= nLinhasDificuldade[dificuldadeAtual-1])
                linha = nLinhasDificuldade[dificuldadeAtual-1] - palavra.length;

              if(coluna + palavra.length >= nLinhasDificuldade[dificuldadeAtual-1])
                coluna = nLinhasDificuldade[dificuldadeAtual-1] - palavra.length;
                
              for (let index = 0; index < palavra.length; index++)
                celulasOcupadasParaEste.push([linha+index, coluna+index]);
              break;

            case 3:
              // diagonal esquerda baixo -> direita cima
              
              if(linha - palavra.length <= -1)
                linha = palavra.length - 1; // porque o index começa em 0

              if(coluna + palavra.length >= nLinhasDificuldade[dificuldadeAtual-1])
                coluna = nLinhasDificuldade[dificuldadeAtual-1] - palavra.length;

                  
              for (let index = 0; index < palavra.length; index++) 
                celulasOcupadasParaEste.push([linha-index, coluna+index]);
              break;

            default:
              // esquerda direita

              if(coluna + palavra.length >= nLinhasDificuldade[dificuldadeAtual-1])
                coluna = nLinhasDificuldade[dificuldadeAtual-1] - palavra.length;

              for (let index = 0; index < palavra.length; index++)
                celulasOcupadasParaEste.push([linha, coluna+index]);
              break;
          }
        
          for (let index_palavra = 0; index_palavra < celulasOcupadas.length; index_palavra++) {
            for (let index = 0; index < celulasOcupadas[index_palavra].length; index++) {
              for (let index_celulas_este = 0; index_celulas_este < celulasOcupadasParaEste.length; index_celulas_este++) {
                
                if(celulasOcupadas[index_palavra][index][0] === celulasOcupadasParaEste[index_celulas_este][0] &&
                    celulasOcupadas[index_palavra][index][1] === celulasOcupadasParaEste[index_celulas_este][1]){
                  conseguiuColocar = false;
                  break;
                }
              }
              if(conseguiuColocar === false)
               break;
            }
            if(conseguiuColocar === false)
             break;
          }
          if(conseguiuColocar === true){
            celulasOcupadas.push(celulasOcupadasParaEste);
            palavrasEmJogoDados.push([linha, coluna, orientacao]);
            break;
          }
        }
      });
      return palavrasEmJogoDados;
    }

    function colocaPalavraTabelaJogo(dados){

      const [linha, coluna, orientacao, palavra] = dados;

      switch (orientacao) {
        case 1:
          // cima baixo
          for (let index = 0; index < palavra.length; index++)
            tabelaJogo[linha+index][coluna] = palavra[index];
          break;
        case 2:
          // diagonal esquerda cima -> direita baixo
          for (let index = 0; index < palavra.length; index++)
            tabelaJogo[linha+index][coluna+index] = palavra[index];
          break;

        case 3:
          // diagonal esquerda baixo -> direita cima
          for (let index = 0; index < palavra.length; index++) 
            tabelaJogo[linha-index][coluna+index] = palavra[index];
          break;

          default:
            // esquerda direita
            for (let index = 0; index < palavra.length; index++)
              tabelaJogo[linha][coluna+index] = palavra[index];
            break;
      }

    }

    function colocaPalavrasTabelaJogo(){
      
      preencheTabelaJogoComLetrasRandom();

      palavrasEmJogo = geraPalavrasRandom();
      palavrasEmJogo = palavrasEmJogo.sort((a, b) => b.length - a.length);

      let comoColocarPalavrasTabela = geraComoColocarNaTabela(palavrasEmJogo);

      for (let index = 0; index < palavrasEmJogo.length; index++) {
        comoColocarPalavrasTabela[index].push(palavrasEmJogo[index]);
        colocaPalavraTabelaJogo(comoColocarPalavrasTabela[index]);
      }
    }
    
    colocaPalavrasTabelaJogo();

    return (
      <div>
        <div>
            <table>
          <thead>
          </thead>
          <tbody>
            {tabelaJogo.map((items, index) => {
              return (
                <tr>
                  {items.map((item, index) => {
                    return (<td>{item}</td>);
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        <div>
          {palavrasEmJogo.map((item, index) => {
              return (
                <p>
                  {item}
                </p>
              );
            })}
        </div>
      </div>
    );
}
export default GameTable;