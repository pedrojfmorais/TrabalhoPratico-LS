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
  const [ganhouJogo, setGanhouJogo] = useState(false);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(-1);
  const [textoModal, setTextoModal] = useState("");
  const [classeTextoModal, setClasseTextoModal] = useState("");

  useEffect(() => { 
    
    let timerId = undefined;
    
    function terminouJogo(){

      if(timer === -1)
        return;

      if(ganhouJogo){
        setTextoModal("Ganhou");
        setClasseTextoModal("modalTitulo ganhou");
      }
      else{
        setTextoModal("Perdeu");
        setClasseTextoModal("modalTitulo perdeu");
      }
      
      var modal = document.getElementById("myModal");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      modal.style.display = "block";

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }

      }
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
  }, [gameStarted, timer, points, selectedLevel, palavrasEmJogo, palavrasEncontradas, encontrouPalavra, ganhouJogo ]);

  const handleGameStart = () => {
    if (gameStarted) {
      setGameStarted(false);
    } else {
      setGameStarted(true);
      setGanhouJogo(false);
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
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <p className={classeTextoModal}>{textoModal}</p>
            <p className="modalTexto">Pontuação: {points}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
