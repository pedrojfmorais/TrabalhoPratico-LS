import "./game-panel.css"

function GameWords(props) {

    let { palavrasEmJogo, palavrasEncontradas, selectedLevel} = props;

    return(
      <div>
        {/* só mostra a tabela se estiver algum nivel selecionado */}
        {selectedLevel !== '0' ?
          <table className="palavrasPossiveis">
            <thead>
            </thead>
            <tbody>
              <tr className="palavrasPossiveis">
              {palavrasEmJogo.map((item, index) => {
                let classes = "palavrasPossiveis ";
                palavrasEncontradas.forEach(element => {
                  if(element === item)
                    classes += "wordFound";
                });
              return (
                <td className={classes} key={item}>
                  {item + ' '}
                </td>
              );
            })}
              </tr>   
            </tbody>
          </table>
        : 
          <div></div>
        }
      </div>
    );
}

export default GameWords;