import React from "react";

function GameTable(props) {

  const { tabelaJogo, palavrasEmJogo } = props;

  //Se não tiver palavras em jogo não coloca as tabelas
  if(Object.keys(palavrasEmJogo).length === 0)
    return (<div></div>);

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
        <table className="tabelaJogo">
          <thead>
          </thead>
          <tbody>
            {tabelaJogo.map((items, index_linha) => {
              return (
                <tr key={index_linha}>
                  {items.map((item, index) => {
                    return (<td key={index_linha + ' ' + index}>{item}</td>);
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