import React, { memo } from "react";

const GameTable = memo((props) => {

  let { gameStarted, tabelaJogo, palavrasEmJogo, setPalavrasEncontradas, setEncontrouPalavra } = props;

  //Se não tiver palavras em jogo não coloca a tabela
  if(Object.keys(palavrasEmJogo).length === 0)
    return (<div></div>);

  let mouseDown = false;
  let palavraSelecionada = "";
  let palavrasEncontradas = [];
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

  const onPalavraSelecionada = (palavra) => {

    let palavraCerta = false;
    let inversa = palavra.split("").reverse().join("");

    for (const element of palavrasEmJogo) {
      
      if(palavra === element || inversa === element){
        palavraCerta = true;

        //caso ela esteja invertida fica direita
        palavra = element;

        break;
      }
    }
    
    let elements=document.getElementsByClassName("highlighted");

    if(palavraCerta){
      for (let index = 0; index < elements.length; index++) {
        elements[index].classList.add("palavraCerta");
      }
      palavrasEncontradas.push(palavra);
      setPalavrasEncontradas(palavrasEncontradas);
      setEncontrouPalavra(true);
    }

    Array.from(document.querySelectorAll('.highlighted')).forEach((el) => el.classList.remove('highlighted'));

    //TODO: 
    // verificar direção da seleção
    //  modal no fim do jogo
    //   utilizador inserir a palavras a procurar
  }

  return (
    <div>
      <div>
      
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
});
export default GameTable;