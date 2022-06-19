import React from "react";
import "./game-panel.css"
import Letter from "../letter/letter.component";

function GameTable(props) {

  let { gameStarted, tabelaJogo, setTabelaJogo, palavrasEmJogo, palavrasEncontradas, setPalavrasEncontradas, setEncontrouPalavra, selectedLevel } = props;

  let mouseDown = false;
  let palavraSelecionada = "";
  let letrasSelecionadas = [];
  let direcaoAtual = 0;
  let direcaoSelecao = 0;
  let tabelaJogoTemp = tabelaJogo;

  function selecionaLetra(event) {
    event.currentTarget.className = "highlighted";
    tabelaJogoTemp = tabelaJogoTemp.map((linha, index_linha) => {
      return linha.map((coluna, index_coluna) => {
        let id = index_linha + " " + index_coluna;
        if(id === event.currentTarget.id){
          coluna.isHighlighted = true;
        }
        return coluna;
      });
    });
    palavraSelecionada += event.currentTarget.innerText;
  }

  const selectedCell = (event) => {
    
    if(gameStarted && mouseDown && !event.currentTarget.classList.contains("highlighted")){

      let posicoes = event.currentTarget.id.split(' ');
      let linha = parseInt(posicoes[0]);
      let coluna = parseInt(posicoes[1]);

      if(letrasSelecionadas.length === 0){
        letrasSelecionadas.push([linha, coluna]);
        selecionaLetra(event);
      
      } else {
        // verifica se está na horizontal, vertical ou diagonal (variável direcaoAtual valores (1, 2, 3) respetivamente)
        //  depois verifica para qual lado está a andar (variável direcaoSelecao)
          // horizontal - direita ou esquerda valores (1, 2) respetivamente
          // vertical - baixo ou cima valores (1, 2) respetivamente
          // diagonal - baixo e direita, baixo e esquerda, cima e direita ou cima e esquerda valores (1, 2, 3, 4) respetivamente
        if(linha === letrasSelecionadas[0][0] && (direcaoAtual === 0 || direcaoAtual === 1)){

          direcaoAtual = 1;
          if(direcaoSelecao === 0){
            if(coluna-1 === letrasSelecionadas[0][1])
              direcaoSelecao = 1;
        
            else if(coluna+1 === letrasSelecionadas[0][1])
              direcaoSelecao = 2;

              letrasSelecionadas.push([linha, coluna]);
              selecionaLetra(event);

          } else {
            if(coluna-1 === letrasSelecionadas[letrasSelecionadas.length-1][1] && direcaoSelecao === 1){
              letrasSelecionadas.push([linha, coluna]);
              selecionaLetra(event);
            }
            else if(coluna+1 === letrasSelecionadas[letrasSelecionadas.length-1][1] && direcaoSelecao === 2){
              letrasSelecionadas.push([linha, coluna]);
              selecionaLetra(event);
            }
          }

        } else if (coluna === letrasSelecionadas[0][1] && (direcaoAtual === 0 || direcaoAtual === 2)){

          direcaoAtual = 2;
          
          if(direcaoSelecao === 0){
            if(linha-1 === letrasSelecionadas[0][0])
              direcaoSelecao = 1;
            else if(linha+1 === letrasSelecionadas[0][0])
              direcaoSelecao = 2;

            letrasSelecionadas.push([linha, coluna]);
            selecionaLetra(event);

          } else {
            if(linha-1 === letrasSelecionadas[letrasSelecionadas.length-1][0] && direcaoSelecao === 1){
              letrasSelecionadas.push([linha, coluna]);
              selecionaLetra(event);
            }
            else if(linha+1 === letrasSelecionadas[letrasSelecionadas.length-1][0] && direcaoSelecao === 2){
              letrasSelecionadas.push([linha, coluna]);
              selecionaLetra(event);
            }
          }

        } else if(
          (
            (letrasSelecionadas[0][0] - linha) === (letrasSelecionadas[0][1] - coluna) || 
            (letrasSelecionadas[0][0] - linha) * - 1 === (letrasSelecionadas[0][1] - coluna)
          ) && (direcaoAtual === 0 || direcaoAtual === 3)){
          
          direcaoAtual = 3;
          if(direcaoSelecao === 0){
            if(linha-1 === letrasSelecionadas[0][0] && coluna-1 === letrasSelecionadas[0][1])
              direcaoSelecao = 1;
            else if(linha-1 === letrasSelecionadas[0][0] && coluna+1 === letrasSelecionadas[0][1])
              direcaoSelecao = 2;
            else if(linha+1 === letrasSelecionadas[0][0] && coluna-1 === letrasSelecionadas[0][1])
              direcaoSelecao = 3;
            else if(linha+1 === letrasSelecionadas[0][0] && coluna+1 === letrasSelecionadas[0][1])
              direcaoSelecao = 4;

            letrasSelecionadas.push([linha, coluna]);
            selecionaLetra(event);

          } else {
            if(linha-1 === letrasSelecionadas[letrasSelecionadas.length-1][0] && coluna-1 === letrasSelecionadas[letrasSelecionadas.length-1][1] && direcaoSelecao === 1){
              letrasSelecionadas.push([linha, coluna]);
              selecionaLetra(event);
            }
            else if(linha-1 === letrasSelecionadas[letrasSelecionadas.length-1][0] && coluna+1 === letrasSelecionadas[letrasSelecionadas.length-1][1] && direcaoSelecao === 2){
              letrasSelecionadas.push([linha, coluna]);
              selecionaLetra(event);
            }
            else if(linha+1 === letrasSelecionadas[letrasSelecionadas.length-1][0] && coluna-1 === letrasSelecionadas[letrasSelecionadas.length-1][1] && direcaoSelecao === 3){
              letrasSelecionadas.push([linha, coluna]);
              selecionaLetra(event);
            }
            else if(linha+1 === letrasSelecionadas[letrasSelecionadas.length-1][0] && coluna+1 === letrasSelecionadas[letrasSelecionadas.length-1][1] && direcaoSelecao === 4){
              letrasSelecionadas.push([linha, coluna]);
              selecionaLetra(event);
            }
          }
        }
      }
    }
  }

  const onMouseDown = () => {
    mouseDown=true;
    tabelaJogoTemp = tabelaJogoTemp.map((linha, index_linha) => (
      linha.map((coluna, index_coluna) => {
        coluna.isHighlighted = false;
        return coluna;
      })
    ));
  }
  const onMouseUp = () => {
    mouseDown=false;
    onPalavraSelecionada(palavraSelecionada);
    palavraSelecionada = "";
    letrasSelecionadas = [];
    direcaoAtual = 0;
    direcaoSelecao = 0;
    setTabelaJogo(tabelaJogoTemp);
  }

  const onPalavraSelecionada = (palavra) => {

    let palavraCerta = false;
    let inversa = palavra.split("").reverse().join("");

    for (const element of palavrasEmJogo) {
      
      if(palavra === element || inversa === element){
        palavraCerta = true;

        //caso a palavra esteja invertida fica direita
        palavra = element;

        break;
      }
    }
    
    tabelaJogoTemp = tabelaJogoTemp.map((linha, index_linha) => (
      linha.map((coluna, index_coluna) => {
        if(palavraCerta && coluna.isHighlighted){
          coluna.isCorrect = true;
          setPalavrasEncontradas([...palavrasEncontradas, palavra]);
          setEncontrouPalavra(true);
        }
        return coluna;
      })
    ));
    setTabelaJogo(tabelaJogoTemp);
  }
  
  return (
    <div>
      {/* só mostra a tabela se estiver algum nivel selecionado */}
      {selectedLevel !== '0' ?
        <div>
          <br></br>
          <table className="tabelaJogo" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
            <thead>
            </thead>
            <tbody>
              {tabelaJogo.map((items, index_linha) => {
                return (
                  <tr key={index_linha}>
                    {items.map((item, index) => (
                      <Letter 
                        key={index_linha + ' ' + index}
                        index_linha={index_linha}
                        index={index}
                        selectedCell={selectedCell}
                        item={item}
                      />
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br></br>
        </div>
      : 
        <div></div>
      }
    </div>
  );
}
export default GameTable;