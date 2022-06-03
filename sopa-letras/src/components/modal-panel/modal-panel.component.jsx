import { useRef } from "react";

function ModalPanel(props) {

    let { classeTextoModal, textoModal, points, abreModal, setAbreModal} = props;
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
                    <p className={classeTextoModal}>{textoModal}</p>
                    <p className="modalTexto">Pontuação: {points}</p>
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