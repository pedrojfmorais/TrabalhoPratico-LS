import { useRef } from "react";
import "./modal-panel.css";

function ModalPanel(props) {

    let { classeTextoModal, tituloModal, textoModal, abreModal, setAbreModal} = props;
    const ref = useRef();

    const closeModal = () => {
        setAbreModal(false);
    };

    window.onclick = function(event) {
        if (event.target === ref.current) {
            setAbreModal(false);
        }
    }
    
    return (
        <div>
        {abreModal ? 
            (
                <div className="modal" ref={ref}>
                    <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <p className={"modalTitulo " + classeTextoModal}>{tituloModal}</p>
                    <p className="modalTexto">{textoModal}</p>
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