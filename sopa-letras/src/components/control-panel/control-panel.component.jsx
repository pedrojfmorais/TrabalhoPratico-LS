import React from "react";
import "./control-panel.css";

function ControlPanel(props) {
  const { gameStarted, selectedLevel, onGameStart, onLevelChange, timer, points, addWord, resetWords } = props;
  const gameStartedClass = gameStarted ? " gameStarted" : "";

  return (
    <section id="panel-control">
      <form className="form">
            <fieldset className="form-group">
              <label htmlFor="btLevel">Nível:</label>
              <select
                id="btLevel"
                defaultValue="0"
                onChange={onLevelChange}
                disabled={gameStarted}
              >
                <option value="0">Seleccione...</option>
                <option value="1">Básico (10x10 5 palavras)</option>
                <option value="2">Intermédio (15x15 7 palavras)</option>
                <option value="3">Avançado (20x20 9 palavras)</option>
              </select>
            </fieldset>
            <button
              type="button"
              id="btPlay"
              disabled={selectedLevel === "0"}
              onClick={onGameStart}
            >
              {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
            </button>
      </form>

      {!gameStarted ? 
        <form className="form" id="addWords">
          <fieldset className="form-group">
            <label htmlFor="inputPalavra">Palavras:</label>
            <input type="text" id="inputPalavra" name="inputPalavra" placeholder="Adicionar Palavra"></input>
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
              Reset
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
