import './App.css'
import {useState , useEffect} from 'react'
// import Board from './components/Board'
import Count from './components/Count'
import Card from './components/Card'

const cardsList = [
  { src: "img/helmet-1.png",matched:false },
  { src: "img/potion-1.png",matched:false },
  { src: "img/ring-1.png",matched:false },
  { src: "img/scroll-1.png",matched:false },
  { src: "img/shield-1.png",matched:false },
  { src: "img/sword-1.png",matched:false}
]


function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [one, setOne] = useState(null);
  const [two, setTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffle = () => {
    const shuffledCards = [...cardsList,...cardsList].sort(() => Math.random() - 0.5).map((card)=>({...card,id: Math.random()}))
    
    setCards(shuffledCards);
    setOne(null);
    setTwo(null); 
    setTurns(0);
  }


  const handleChoice = (card)=>{
    if (one === null) {
      setOne(card);
    }
    else {
      setTwo(card);
    }
  }

  useEffect(() => {
    if (one && two) {
      setDisabled(true);
      if (one.src === two.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === one.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
      updateTurns();
      }
    else {
      setTimeout(() => updateTurns(), 1000)
      }
    }
    
  },[one,two])

  console.log(cards);


  const updateTurns = () => {
    setOne(null);
    setTwo(null);
    setTurns(prevTurns => { return turns + 1 });
    setDisabled(false);
  }

  useEffect(() => {
    shuffle();
  }, [])


  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffle}>New Game</button>
      <div className="board">
            {cards.map(card => (
                <Card key={card.id} card={card} handleChoice={handleChoice} disabled={disabled} flipped={ card=== one || card === two ||card.matched }/>
            ))}
      </div>
      {/* <Board key={Math.random()} cards={cards} handleChoice={handleChoice} one={one} two={two} disabled={disabled}/> */}
      <Count count={ turns}/>
    </div>
  );
}

export default App