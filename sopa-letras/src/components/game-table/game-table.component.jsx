import React from "react";

function GameTable(props) {

  const { tabelaJogo, palavrasEmJogo } = props;

  return (
    <div>
      <div>
          <table>
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
      <div>
        {palavrasEmJogo.map((item, index) => {
            return (
              <p key={item}>
                {item}
              </p>
            );
          })}
      </div>
    </div>
  );
}
export default GameTable;