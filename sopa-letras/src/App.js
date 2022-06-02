import "./assets/styles/app.css"
import { useState, useEffect } from "react";
import initTabelaPalavras from "./components/game-table/initTabelaPalavras";

import {
  Header,
  Footer,
  ControlPanel,
  GameWords,
  GameTable,
} from "./components";

import { TEMPO_DIFICULDADE } from "./constants";

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [tabelaJogo, setTabelaJogo] = useState([[]]);
  const [palavrasEmJogo, setPalavrasEmJogo] = useState([]);
  const [palavrasEncontradas, setPalavrasEncontradas] = useState([]);
  const [encontrouPalavra, setEncontrouPalavra] = useState(false);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(20);

  useEffect(() => { 
    
    let timerId = undefined;
    
    //atualizar pontos
    if(encontrouPalavra){
      setPoints(points + (palavrasEncontradas[palavrasEncontradas.length-1].length * timer));
      setEncontrouPalavra(false);
    }

    //deteta fim do jogo
    if(palavrasEmJogo.length === palavrasEncontradas.length){
      setGameStarted(false);
    }
    
    if (gameStarted) { 
      timerId = setInterval(() => { 
        setTimer(timer-1); 
        let nextTimer = timer - 1; 
        if (nextTimer === 0) { 
          setGameStarted(false); 
        } 
      }, 1000); 
    } else if (timer !== TEMPO_DIFICULDADE[parseInt(selectedLevel)-1]) { 
      setTimer(TEMPO_DIFICULDADE[parseInt(selectedLevel)-1]); 
    } 
    return () => { 
      if (timerId) { 
        clearInterval(timerId); 
      } 
    }; 
  }, [gameStarted, timer, points, selectedLevel, palavrasEmJogo, palavrasEncontradas, encontrouPalavra ]);

  const handleGameStart = () => {
    if (gameStarted) {
      setGameStarted(false);
    } else {
      setGameStarted(true);
      initJogo(selectedLevel);
    }
  };

  function initJogo(dificuldadeAtual){

    let tabelaJogo = [[]];
    let palavrasEmJogo = [];

    [tabelaJogo, palavrasEmJogo] = initTabelaPalavras(parseInt(dificuldadeAtual));
    
    setTabelaJogo(tabelaJogo);
    setPalavrasEmJogo(palavrasEmJogo);
    setPalavrasEncontradas([]);

  }

  const handleLevelChange = (event) => {

    const { value } = event.currentTarget;
    setSelectedLevel(value);

    initJogo(value);
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
          points={points}
        />
        <GameWords 
          palavrasEmJogo={palavrasEmJogo}
          palavrasEncontradas={palavrasEncontradas}
        />
        <GameTable 
          gameStarted={gameStarted}
          tabelaJogo={tabelaJogo}
          palavrasEmJogo={palavrasEmJogo}
          setPalavrasEncontradas={setPalavrasEncontradas}
          setEncontrouPalavra={setEncontrouPalavra}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
