import React from "react";
function GameTable() {

    const palavrasPossiveis = ['REACT', 'JAVASCRIPT', 'HTML', 'CSS', 'BACKBONE', 'ANGULAR', 'SVELTE', 'EMBER', 'BOOTSTRAP', 'VUE', 'JAVA', 'PYTHON', 'SQL']; 
    
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
  
    const nPalavrasDificuldade = [5, 7, 9];
    const nLinhasDificuldade = [10, 15, 20];
    let tabelaJogo = [[]];
    let palavrasEmJogo = [];
  
    const dificuldadeAtual = 1;
  
    function preencheTabelaJogoComLetrasRandom(){
      tabelaJogo = [[]];
      tabelaJogo = Array(nLinhasDificuldade[dificuldadeAtual-1]).fill(0).map( 
        () => new Array(nLinhasDificuldade[dificuldadeAtual-1]).fill(0).map( 
          () => generateRandomLetter()
          )
        );
    }
  
    function colocaPalavrasTabelaJogo(){
      
      function colocaPalavraTabelaJogo(){
        const nLinhas = nLinhasDificuldade[dificuldadeAtual-1];
    
        const linha = getRandomNumber(nLinhas);
        const coluna = getRandomNumber(nLinhas);
    
        const palavra = getRandomWord();
        const orientacao = 1;
  
        palavrasEmJogo.push([palavra, linha, coluna, orientacao]);
    
        for (let index = 0; index < palavra.length; index++) {
          tabelaJogo[linha][coluna+index] = palavra[index];
        }
      }
  
      palavrasEmJogo = [];
  
      for (let index = 0; index < nPalavrasDificuldade[dificuldadeAtual-1]; index++) {
        colocaPalavraTabelaJogo();
      }
    }
    
  
    preencheTabelaJogoComLetrasRandom();
    colocaPalavrasTabelaJogo();

    //TODO: algoritmo meter palavras no mapa de jogo
 
    console.log(palavrasEmJogo);

    return (
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
    );
}
export default GameTable;