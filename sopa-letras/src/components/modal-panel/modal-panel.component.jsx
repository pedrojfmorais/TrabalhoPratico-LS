import { useRef, useState } from "react";
import "./modal-panel.css";

function ModalPanel(props) {

    let { classeTextoModal, tituloModal, textoModal, abreModal, setAbreModal, top10, setTop10, points, inserirTop10, setInserirTop10} = props;
    const ref = useRef();
    const [nome, setNome] = useState("");

    const closeModal = () => {
        setAbreModal(false);
    };

    window.onclick = function(event) {
        if (event.target === ref.current) {
            setAbreModal(false);
        }
    }

    const addToTop10 = () => {
        
        setInserirTop10(false);

        let novo = true;

        top10.forEach(element => {
            if(element !== undefined && element[0] === nome)
                novo = false;
        });

        let temp = [];

        if(novo)
            temp = [...top10, [nome, points]];
        else{
            temp = top10;
            temp.forEach(element => {
                if(element !== undefined && element[0] === nome && element[1] < points)
                    element[1] = points;
            });
        }
        setNome("");

        temp.sort(function(a, b) {
            return b[1] - a[1];
        });
        
        temp.length = 10;

        setTop10(temp);

        closeModal();
    }

    const onInputChange = (event) => setNome(event.target.value);

    const canEnterTop10 = () => {
        if(top10[9] === undefined || top10[9][1] < points)
            return true;
        return false;
    }
    
    return (
        <div>
        {abreModal ? 
            (
                <div className="modal" ref={ref}>
                    <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <p className={"modalTitulo " + classeTextoModal}>{tituloModal}</p>
                    {textoModal.map((element, index) => {
                        return(<p className="modalTexto">{element}</p>);
                    })}                    
                    {canEnterTop10() && points > 0 && inserirTop10 ?
                        <div>
                            <form className="form" id="addTop10" onSubmit={(event) =>  event.preventDefault()}>
                                <fieldset className="form-group">
                                    <label htmlFor="inputNome">Insira o seu nome:</label>
                                    <input 
                                    type="text" 
                                    id="inputNome" 
                                    name="inputNome" 
                                    placeholder="Nome" 
                                    onChange={onInputChange}
                                    onKeyDown={(event) => {if(event.key === 'Enter') addToTop10(); }}
                                    value={nome}
                                    ></input>
                                    <button
                                    type="button"
                                    id="btAddNome"
                                    onClick={() => addToTop10()}
                                    >
                                    Adicionar
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    :
                        <div></div>
                    }
                    </div>
                </div>
            ) : (
                <div></div>
            )
        }
        </div>     
    );
}
export default ModalPanel;