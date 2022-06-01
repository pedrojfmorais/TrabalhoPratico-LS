import "./assets/styles/app.css"
import { useState, useEffect } from "react";

import {
  Header,
  Footer,
  ControlPanel,
  GameTable,
} from "./components";

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [tabelaJogo, setTabelaJogo] = useState([[]]);
  const [palavrasEmJogo, setPalavrasEmJogo] = useState([]);
  const [timer, setTimer] = useState(20);

  useEffect(() => { 
    
  let timerId = undefined;
  let tempoDificuldade = [20, 40, 60]
  
    if (gameStarted) { 
      timerId = setInterval(() => { 
        setTimer(timer-1); 
        let nextTimer = timer - 1; 
        if (nextTimer === 0) { 
          setGameStarted(false); 
        } 
      }, 1000); 
    } else if (timer !== tempoDificuldade[parseInt(selectedLevel)-1]) { 
      setTimer(tempoDificuldade[parseInt(selectedLevel)-1]); 
    } 
    return () => { 
      if (timerId) { 
        clearInterval(timerId); 
      } 
    }; 
  }, [gameStarted, timer, selectedLevel]);

  const handleGameStart = () => {
    if (gameStarted) {
      console.log("Termina Jogo");
      setGameStarted(false);
    } else {
      console.log("Inicia Jogo");
      setGameStarted(true);
    }
  };

  const handleLevelChange = (event) => {

    const { value } = event.currentTarget;
    setSelectedLevel(value);

    const dificuldadeAtual = parseInt(value);

    const palavrasPossiveis = ['REACT', 'JAVASCRIPT', 'HTML', 'CSS', 'BACKBONE', 'ANGULAR', 'SVELTE', 'EMBER', 'BOOTSTRAP', 'VUE', 'JAVA', 'PYTHON', 'SQL']; 
    
    const nPalavrasDificuldade = [5, 7, 9];
    const nLinhasDificuldade = [10, 15, 20];
    let tabelaJogoTemp = [[]];
    let palavrasEmJogo = [];

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
      tabelaJogoTemp = [[]];
      tabelaJogoTemp = Array(nLinhasDificuldade[dificuldadeAtual-1]).fill(0).map( 
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

    }

    function colocaPalavrasTabelaJogo(){
      
      if (dificuldadeAtual === 0)
        return;

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

    setTabelaJogo(tabelaJogoTemp);
    setPalavrasEmJogo(palavrasEmJogo);
  }

  return (
    <div id="container">
      <Header />
      <main className="main-content">
        <ControlPanel
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          selectedLevel={selectedLevel}
          onLevelChange={handleLevelChange}
          timer={timer}
        />
        <GameTable 
          tabelaJogo={tabelaJogo}
          palavrasEmJogo={palavrasEmJogo}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
