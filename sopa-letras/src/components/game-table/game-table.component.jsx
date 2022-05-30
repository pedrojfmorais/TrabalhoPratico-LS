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
  
    function colocaPalavraTabelaJogo(){
      const nLinhas = nLinhasDificuldade[dificuldadeAtual-1];
  
      let linha = getRandomNumber(nLinhas);
      let coluna = getRandomNumber(nLinhas);
  
      let novaPalavra = true;
      let palavra = "";

      while(true){
        palavra = getRandomWord();

        for (let index = 0; index < palavrasEmJogo.length; index++)
          if(palavrasEmJogo[index][0] === palavra){
            novaPalavra = false;
            break;
          }
          
        if(novaPalavra)
          break;
      }
      const orientacao = getRandomNumber(8);

      palavrasEmJogo.push([palavra, linha, coluna, orientacao]);
  
      switch (orientacao) {
        case 0:
          // esquerda direita
          for (let index = 0; index < palavra.length; index++) {
            tabelaJogo[linha][coluna+index] = palavra[index];
          }
          break;
        case 1:
          // direita esquerda
          for (let index = 0; index < palavra.length; index++) {
            if(coluna-palavra.length <= 0)
              coluna = palavra.length;
            tabelaJogo[linha][coluna-index] = palavra[index];
          }
          break;
        case 2:
          // cima baixo
          for (let index = 0; index < palavra.length; index++) {
            tabelaJogo[linha+index][coluna] = palavra[index];
          }
          break;
        case 3:
          // baixo cima
          for (let index = 0; index < palavra.length; index++) {
            if(linha-palavra.length <= 0)
              linha = palavra.length;
            tabelaJogo[linha-index][coluna] = palavra[index];
          }
          break;
        case 4:
          // diagonal esquerda cima -> direita baixo
          for (let index = 0; index < palavra.length; index++) {
            tabelaJogo[linha+index][coluna+index] = palavra[index];
          }
          break;
        case 5:
          // diagonal direita baixo -> esquerda cima
          for (let index = 0; index < palavra.length; index++) {
            
            if(linha-palavra.length <= 0)
              linha = palavra.length;

            if(coluna-palavra.length <= 0)
              coluna = palavra.length;

            tabelaJogo[linha-index][coluna-index] = palavra[index];
          }
          break;
        case 6:
          // diagonal direita cima -> esquerda baixo
          for (let index = 0; index < palavra.length; index++) {
            
            if(coluna-palavra.length <= 0)
              coluna = palavra.length;

            tabelaJogo[linha+index][coluna-index] = palavra[index];
          }
          break;
        case 7:
          // diagonal esquerda baixo -> direita cima
          for (let index = 0; index < palavra.length; index++) {
            
            if(linha-palavra.length <= 0)
              linha = palavra.length;

            tabelaJogo[linha-index][coluna+index] = palavra[index];
          }
          break;
          default:
            // esquerda direita
            for (let index = 0; index < palavra.length; index++) {
              tabelaJogo[linha][coluna+index] = palavra[index];
            }
      }

    }

    function colocaPalavrasTabelaJogo(){
      
      palavrasEmJogo = [];
      preencheTabelaJogoComLetrasRandom();

      for (let index = 0; index < nPalavrasDificuldade[dificuldadeAtual-1]; index++) {
        colocaPalavraTabelaJogo();
      }
    }
    
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