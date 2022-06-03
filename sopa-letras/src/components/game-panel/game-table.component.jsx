import React, { memo } from "react";

const GameTable = memo((props) => {

  let { gameStarted, tabelaJogo, palavrasEmJogo, setPalavrasEncontradas, setEncontrouPalavra } = props;

  //Se não tiver palavras em jogo não coloca a tabela
  if(Object.keys(palavrasEmJogo).length === 0)
    return (<div></div>);

  let mouseDown = false;
  let palavraSelecionada = "";
  let letrasSelecionadas = [];
  let palavrasEncontradas = [];
  let direcaoAtual = 0;
  let direcaoSelecao = 0;

  function selecionaLetra(event) {
    event.currentTarget.className += " highlighted";
    palavraSelecionada += event.currentTarget.innerText;
  }

  const selectedCell = (event) => {
    
    if(gameStarted && mouseDown && !event.currentTarget.classList.contains("highlighted")){

      let linha = parseInt(event.currentTarget.id[0]);
      let coluna = parseInt(event.currentTarget.id[2]);

      if(letrasSelecionadas.length === 0){
        letrasSelecionadas.push([linha, coluna]);
        selecionaLetra(event);
      
      } else {

        // verifica se está na horizontal, vertical ou diagonal (variável direcaoAtual valores (1, 2, 3) respetivamente)
        //  depois verifica para qual lado está a andar esquerda/cima ou direita/baixo (variável direcaoSelecao valores (1, 2) respetivamente)
        if(linha === letrasSelecionadas[0][0] && (direcaoAtual === 0 || direcaoAtual === 1)){

          direcaoAtual = 1;

          if(direcaoSelecao === 0){
            if(coluna-1 === letrasSelecionadas[0][1])
              direcaoSelecao = 1;
        
            else if(coluna+1 === letrasSelecionadas[0][1])
              direcaoSelecao = 2;

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

        } else if((letrasSelecionadas[0][0] - linha) === (letrasSelecionadas[0][1] - coluna) && (direcaoAtual === 0 || direcaoAtual === 3)){
          
          direcaoAtual = 3;
          
          if(direcaoSelecao === 0){
            if(linha-1 === letrasSelecionadas[0][0] && coluna-1 === letrasSelecionadas[0][1])
              direcaoSelecao = 1;
            else if(linha+1 === letrasSelecionadas[0][0] && coluna+1 === letrasSelecionadas[0][1])
              direcaoSelecao = 2;

          } else {
            if(linha-1 === letrasSelecionadas[letrasSelecionadas.length-1][0] && coluna-1 === letrasSelecionadas[letrasSelecionadas.length-1][1] && direcaoSelecao === 1){
              letrasSelecionadas.push([linha, coluna]);
              selecionaLetra(event);
            }
            else if(linha+1 === letrasSelecionadas[letrasSelecionadas.length-1][0] && coluna+1 === letrasSelecionadas[letrasSelecionadas.length-1][1] && direcaoSelecao === 2){
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
  }
  const onMouseUp = () => {
    mouseDown=false;
    onPalavraSelecionada(palavraSelecionada);
    palavraSelecionada = "";
    letrasSelecionadas = [];
    direcaoAtual = 0;
    direcaoSelecao = 0;
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
    // utilizador inserir a palavras a procurar
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
                    return (<td id={index_linha + ' ' + index} key={index_linha + ' ' + index} onMouseMove={selectedCell}>{item}</td>);
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