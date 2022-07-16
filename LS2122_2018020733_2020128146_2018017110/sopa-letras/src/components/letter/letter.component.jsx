function Letter(props) {
    const {index_linha, index, selectedCell, item} = props;

    let classLetter = (item.isCorrect ? "palavraCerta" : (item.isHighlighted ? "highlighted" : "none"));

    return (
    <td 
        id={index_linha + ' ' + index}  
        onMouseMove={selectedCell}
        className={classLetter}
    >
            {item.letra}
    </td>
    );            
}

export default Letter;
