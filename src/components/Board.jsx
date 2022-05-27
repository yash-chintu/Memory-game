import './css/Board.css'
import Card from './Card'

function Board({ cards, handleChoice ,one,two,disabled}) {
    
    return (
        <div className="board">
            {cards.map(card => (
                <Card key={card.id} card={card} handleChoice={handleChoice} disabled={disabled} flipped={ card=== one || card === two ||card.matched }/>
            ))}
        </div>
)
}

export default Board