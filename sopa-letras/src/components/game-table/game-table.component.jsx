import React from "react";

function GameTable(props) {

  let { gameStarted, tabelaJogo, palavrasEmJogo, onPalavraSelecionada } = props;

  //Se não tiver palavras em jogo não coloca as tabelas
  if(Object.keys(palavrasEmJogo).length === 0)
    return (<div></div>);

  let mouseDown = false;
  let palavraSelecionada = "";
  const selectedCell = (event) => {
    
    if(gameStarted && mouseDown && !event.currentTarget.classList.contains("highlighted")){
      event.currentTarget.className += " highlighted";
      palavraSelecionada += event.currentTarget.innerText;
    }
  }

  const onMouseDown = () => {
    mouseDown=true;
  }
  const onMouseUp = () => {
    mouseDown=false;
    onPalavraSelecionada(palavraSelecionada);
    palavraSelecionada = "";
  }

  return (
    <div>
      <div>
      <table className="palavrasPossiveis">
          <thead>
          </thead>
          <tbody>
            <tr className="palavrasPossiveis">
            {palavrasEmJogo.map((item, index) => {
            return (
              <td className="palavrasPossiveis" key={item}>
                {item + ' '}
              </td>
            );
          })}
            </tr>   
          </tbody>
        </table>
      </div>
      <br></br>
      <div>
        <table className="tabelaJogo" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
          <thead>
          </thead>
          <tbody>
            {tabelaJogo.map((items, index_linha) => {
              return (
                <tr key={index_linha}>
                  {items.map((item, index) => {
                    return (<td key={index_linha + ' ' + index} onMouseMove={selectedCell}>{item}</td>);
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br></br>
    </div>
  );
}
export default GameTable;