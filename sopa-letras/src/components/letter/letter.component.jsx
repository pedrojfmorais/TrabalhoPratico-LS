function Letter(props) {
    const {index_linha, index, selectedCell, item} = props;
    const classLetter = item.isHighlighted ? "highlighted" : (item.isCorrect ? "palavraCerta" : " ");
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
