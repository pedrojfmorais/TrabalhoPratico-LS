import "./assets/styles/app.css"
import { useState, useEffect } from "react";
import { initTabelaPalavras } from "./helpers";

import {
  Header,
  Footer,
  ControlPanel,
  GameWords,
  GameTable,
  ModalPanel,
} from "./components";

import { TEMPO_DIFICULDADE } from "./constants";

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [tabelaJogo, setTabelaJogo] = useState([[]]);
  const [palavrasEmJogo, setPalavrasEmJogo] = useState([]);
  const [palavrasEncontradas, setPalavrasEncontradas] = useState([]);
  const [encontrouPalavra, setEncontrouPalavra] = useState(false);
  const [ganhouJogo, setGanhouJogo] = useState(false);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(-1);
  const [tituloModal, setTituloModal] = useState("");
  const [textoModal, setTextoModal] = useState("");
  const [classeTextoModal, setClasseTextoModal] = useState("");
  const [abreModal, setAbreModal] = useState(false);
  const [userWords, setUserWords] = useState([]);
/*
  useEffect(() => { 
    
    let timerId = undefined;
    
    function terminouJogo(){

      if(timer === -1)
        return;

      if(ganhouJogo){
        setTituloModal("Ganhou");
        setClasseTextoModal("verde");
      }
      else{
        setTituloModal("Perdeu");
        setClasseTextoModal("vermelho");
      }
      setTextoModal("Pontuação: " + points);
      setAbreModal(true);
    }

    //atualizar pontos
    if(encontrouPalavra){
      setPoints(points + (palavrasEncontradas[palavrasEncontradas.length-1].length * timer));
      setEncontrouPalavra(false);
    }

    //deteta fim do jogo
    if(palavrasEmJogo.length === palavrasEncontradas.length && timer > 0){
      setGameStarted(false);
      setGanhouJogo(true);
      terminouJogo();
    }
    
    if (gameStarted) { 
      timerId = setInterval(() => { 
        setTimer(timer-1); 
        let nextTimer = timer - 1; 
        if (nextTimer === 0) { 
          setGameStarted(false); 
          setGanhouJogo(false);
          terminouJogo();
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
  }, [gameStarted, timer, points, selectedLevel, palavrasEmJogo, palavrasEncontradas, encontrouPalavra, ganhouJogo]);
*/
  const handleGameStart = () => {
    if (gameStarted) {
      setGameStarted(false); 

      setTituloModal("Perdeu");
      setClasseTextoModal("vermelho");
      setTextoModal("Pontuação: " + points);
      setAbreModal(true);
      
    } else {
      setGameStarted(true);
      setGanhouJogo(false);
      initJogo(selectedLevel);
    }
  };

  function initJogo(dificuldadeAtual){

    let tabelaJogo = [[]];
    let palavrasEmJogo = [];

    [tabelaJogo, palavrasEmJogo] = initTabelaPalavras(parseInt(dificuldadeAtual), userWords);
    
    setTabelaJogo(tabelaJogo);
    setPalavrasEmJogo(palavrasEmJogo);
    setPalavrasEncontradas([]);
    setPoints(0);

  }

  const handleLevelChange = (event) => {

    const { value } = event.currentTarget;
    setSelectedLevel(value);

    if(value !== '0')
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
          userWords={userWords}
          setUserWords={setUserWords}
          setTituloModal={setTituloModal}
          setClasseTextoModal={setClasseTextoModal}
          setTextoModal={setTextoModal}
          setAbreModal={setAbreModal}
        />
        <GameWords 
          palavrasEmJogo={palavrasEmJogo}
          palavrasEncontradas={palavrasEncontradas}
          selectedLevel={selectedLevel}
        />
        <GameTable 
          gameStarted={gameStarted}
          tabelaJogo={tabelaJogo}
          palavrasEmJogo={palavrasEmJogo}
          setPalavrasEncontradas={setPalavrasEncontradas}
          setEncontrouPalavra={setEncontrouPalavra}
          selectedLevel={selectedLevel}
        />
        <ModalPanel 
          classeTextoModal={classeTextoModal}
          tituloModal={tituloModal}  
          textoModal={textoModal}
          abreModal={abreModal}
          setAbreModal={setAbreModal}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
