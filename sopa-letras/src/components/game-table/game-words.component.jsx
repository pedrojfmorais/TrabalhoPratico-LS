function GameWords(props) {

    let { palavrasEmJogo, palavrasEncontradas} = props;
    //Se não tiver palavras em jogo não coloca a tabela
    if(Object.keys(palavrasEmJogo).length === 0)
        return (<div></div>);

    return(
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
    );
}

export default GameWords;