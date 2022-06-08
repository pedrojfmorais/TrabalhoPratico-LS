import React, { useState, useEffect } from "react";
import "./control-panel.css";
import { PALAVRAS_POSSIVEIS, TEMPO_DIFICULDADE } from "../../constants";
import { initTabelaPalavras } from "../../helpers";

function ControlPanel(props) {

  const { 
    gameStarted, selectedLevel, setTituloModal, setClasseTextoModal, setTextoModal, ganhouJogo, points,
    setAbreModal, palavrasEncontradas, palavrasEmJogo, setGameStarted, setTabelaJogo, setGanhouJogo, setPoints,
    setPalavrasEmJogo, setPalavrasEncontradas, setSelectedLevel, encontrouPalavra, setEncontrouPalavra, top10, setInserirTop10
  } = props;

  const [timer, setTimer] = useState(-1);
  const gameStartedClass = gameStarted ? " gameStarted" : "";

  const [word, setWord] = useState("");
  const [btnReset, setBtnReset] = useState("Reset");
  const [userWords, setUserWords] = useState([]);
 
  const onGameStart = () => {
    if (gameStarted) {
      
      setInserirTop10(true);

      setGameStarted(false); 

      setTituloModal("Perdeu");
      setClasseTextoModal("vermelho");
      setTextoModal(["Pontuação: " + points]);
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

  const onLevelChange = (event) => {

    const { value } = event.currentTarget;
    setSelectedLevel(value);

    if(value !== '0')
      initJogo(value);
  }

  function terminouJogo(){

    if(timer === -1)
      return;

    setInserirTop10(true);

    if(ganhouJogo){
      setTituloModal("Ganhou");
      setClasseTextoModal("verde");
    }
    else{
      setTituloModal("Perdeu");
      setClasseTextoModal("vermelho");
    }
    setTextoModal(["Pontuação: " + points]);
    setAbreModal(true);
  }

  useEffect(() => { 
    
    let timerId = undefined;

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
  }, [gameStarted, timer, selectedLevel]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    
    //atualizar pontos
    if(encontrouPalavra){
      setPoints(points + (palavrasEncontradas[palavrasEncontradas.length-1].length * timer));
      setEncontrouPalavra(false);

    }

    //fim de jogo
    if(palavrasEmJogo.length === palavrasEncontradas.length && timer > 0){
      setGameStarted(false);
      setGanhouJogo(true);
      terminouJogo();
    }
  }, [encontrouPalavra]); // eslint-disable-line react-hooks/exhaustive-deps

  // cor do timer conforme o tempo que falta
  if(timer <= TEMPO_DIFICULDADE[parseInt(selectedLevel)-1] / 4)
    document.documentElement.style.setProperty('--timer-color', 'red');
  else if(timer <= TEMPO_DIFICULDADE[parseInt(selectedLevel)-1] / 2)
    document.documentElement.style.setProperty('--timer-color', 'gold');
  else
    document.documentElement.style.setProperty('--timer-color', 'grey');

  const addWord = () => {

    if(word === '')
      return;

    let currentWords = userWords;
    
    if(currentWords.includes(word.toUpperCase()) || PALAVRAS_POSSIVEIS.includes(word.toUpperCase())){
      
      setTituloModal("Erro");
      setClasseTextoModal("vermelho");
      setTextoModal(["Esta palavra já se encontra inserida!"]);
      setAbreModal(true);

      return;
    }

    currentWords.push(word.toUpperCase());

    setUserWords(currentWords);

    setWord("");
  }

  const resetWords = () => {
    
    if (btnReset === "Reset")
      setUserWords([]);
    else{
      let array = userWords;
      const index = array.indexOf(word);
      if (index > -1) {
        array.splice(index, 1);
      }
      setUserWords(array);
      setBtnReset("Reset");
    }
  };

  const onInputChange = (event) => {

    setWord(event.target.value.toUpperCase());

    if(userWords.includes(event.target.value.toUpperCase()))
      setBtnReset("Remover");
    else
      setBtnReset("Reset");
  };

  const carregouEnter = event => {
    if(event.key === 'Enter') 
      addWord(); 
  }

  const mostraPalavras = () => {

    if(userWords.length === 0){
      setTituloModal("Ainda não foram inseridas palavras");
      setClasseTextoModal("vermelho");
      setTextoModal([""]);

    }else{

        setTituloModal("Palavras Inseridas");
        setClasseTextoModal("verde");

        let texto = "";

        userWords.forEach(element => {
          texto += element + ", ";
        });

        setTextoModal([texto.substring(0, texto.length - 2)]);
    }

    setAbreModal(true);
  }

  const mostraTop10 = () => {

    let texto = [];

    setTituloModal("Top 10 Pontuações");
    setClasseTextoModal("verde");

    top10.forEach(element => {
      if(element !== undefined)
        texto.push("Nome: " + element[0] + " | Pontos: " + element[1]);
    });
    setTextoModal(texto);
    setAbreModal(true);
  }

  return (
    <section id="panel-control">
      <form className="form" onSubmit={event => event.preventDefault()}>
            <fieldset className="form-group">
              <label htmlFor="btLevel">Nível:</label>
              <select
                id="btLevel"
                defaultValue="0"
                onChange={onLevelChange}
                disabled={gameStarted}
              >
                <option value="0">Seleccione...</option>
                <option value="1">Básico (10x10, 5 palavras)</option>
                <option value="2">Intermédio (15x15, 7 palavras)</option>
                <option value="3">Avançado (20x20, 9 palavras)</option>
              </select>
            </fieldset>
            <fieldset className="form-group">
            <button
              type="button"
              id="btPlay"
              disabled={selectedLevel === "0"}
              onClick={onGameStart}
            >
              {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
            </button>
            <button id="btTop" onClick={mostraTop10}>Ver TOP 10</button>
            </fieldset>
      </form>

      {!gameStarted ? 
        <form className="form" id="addWords" onSubmit={event => event.preventDefault()}>
          <fieldset className="form-group">
            <label htmlFor="inputPalavra">Palavras:</label>
            <input 
              type="text" 
              id="inputPalavra" 
              name="inputPalavra" 
              placeholder="Adicionar/Remover Palavra" 
              onChange={onInputChange}
              onKeyDown={carregouEnter}
              value={word}
              ></input>
              <button
              type="button"
              id="btShowWords"
              onClick={mostraPalavras}
            >
              Mostrar
            </button>
          </fieldset>
          <fieldset className="form-group buttonsWords">
            <button
              type="button"
              id="btAddWord"
              onClick={addWord}
            >
              Adicionar
            </button>
            <button
              type="button"
              id="btResetWords"
              onClick={resetWords}
            >
              {btnReset}
            </button>
          </fieldset>
        </form>
      : 
        <div></div>
      }

      {gameStarted ? 
        <div className="inGameInfo">
          <dl className={`list-item left${gameStartedClass}`}>
            <dt>Tempo de Jogo:</dt>
            <dd id="gameTime">{timer}</dd>
          </dl>
          <dl className={`list-item right${gameStartedClass}`}>
            <dt>Pontuação:</dt>
            <dd id="points">{points}</dd>
          </dl>
        </div>
      :
        <div></div>
      }
    </section>
  );
}

export default ControlPanel;
