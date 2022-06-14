import "./assets/styles/app.css"
import { useState, useEffect } from "react";

import {
  Header,
  Footer,
  ControlPanel,
  GameWords,
  GameTable,
  ModalPanel,
} from "./components";

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [tabelaJogo, setTabelaJogo] = useState([[]]);
  const [palavrasEmJogo, setPalavrasEmJogo] = useState([]);
  const [palavrasEncontradas, setPalavrasEncontradas] = useState([]);
  const [encontrouPalavra, setEncontrouPalavra] = useState(false);
  const [tituloModal, setTituloModal] = useState("");
  const [textoModal, setTextoModal] = useState("");
  const [classeTextoModal, setClasseTextoModal] = useState("");
  const [abreModal, setAbreModal] = useState(false);
  const [top10, setTop10] = useState([]);
  const [ganhouJogo, setGanhouJogo] = useState(false);
  const [points, setPoints] = useState(0);
  const [inserirTop10, setInserirTop10] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('top10'));

    let temp = [];

    items.forEach(element => {
      if(element !== null){
        temp = [...temp, element];
      }
    });

    setTop10(temp);
    
  }, []);

  return (
    <div id="container">
      <Header />
      <main className="main-content">
        <ControlPanel
          gameStarted={gameStarted}
          selectedLevel={selectedLevel}
          setTituloModal={setTituloModal}
          setClasseTextoModal={setClasseTextoModal}
          setTextoModal={setTextoModal}
          setAbreModal={setAbreModal}
          palavrasEncontradas={palavrasEncontradas}
          setEncontrouPalavra={setEncontrouPalavra}
          palavrasEmJogo={palavrasEmJogo}
          setGameStarted={setGameStarted}
          setTabelaJogo={setTabelaJogo}
          setPalavrasEmJogo={setPalavrasEmJogo}
          setPalavrasEncontradas={setPalavrasEncontradas}
          setSelectedLevel={setSelectedLevel}
          encontrouPalavra={encontrouPalavra}
          ganhouJogo={ganhouJogo}
          setGanhouJogo={setGanhouJogo}
          points={points}
          setPoints={setPoints}
          top10={top10}
          setInserirTop10={setInserirTop10}
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
          palavrasEncontradas={palavrasEncontradas}
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
          top10={top10}
          setTop10={setTop10}
          points={points}
          inserirTop10={inserirTop10}
          setInserirTop10={setInserirTop10}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
