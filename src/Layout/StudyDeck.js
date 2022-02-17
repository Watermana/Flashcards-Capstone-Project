import React, {useEffect, useState} from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import BreadCrumb from "./BreadCrumb";

export default function StudyDeck() {
    const history = useHistory();
    const {deckId} = useParams();
    const [ deck, setDeck ] = useState({id: 1, name:'', cards: [], description:''})
    const [ currentCard, setCurrentCard] = useState({id:1, front:'', back:''})
    const [ cardFace, setCardFace ] = useState(true);
    const [ cardIndex , setCardIndex] = useState(0)

    useEffect(() => {
        const abortController = new AbortController();
        async function setTargetDeck() {
            const data = await readDeck(deckId)
            setDeck(data);
        }

        setTargetDeck();

        return () => abortController.abort();
    }, [deckId])


    useEffect(() => {
        if(deck.name) {
            setCurrentCard(deck.cards[cardIndex])
            setCardFace(true)
        }
            
    }, [deck, cardIndex])

    useEffect(() => {    
        if(!cardFace && cardIndex === deck.cards.length -1) {
        setTimeout (
            () =>
            window.confirm("Restart Cards?") ? setCardIndex(0) : history.push("/"),
            1000
        )
    }
    }, [cardFace])


    return (
        <>
            <BreadCrumb deck={deck} subname="Study"/>
        <div className="border">
            <h2>{`Study: ${deck.name}`}</h2>
            {deck.cards.length > 2 ? (<div>
               <h5>Card {cardIndex +1} of {deck.cards.length} </h5>
               <p>{cardFace ? currentCard.front : currentCard.back}</p>
               <button className="btn btn-secondary" type="button" onClick={() => setCardFace(!cardFace)} name="flip">Flip</button>
               {!cardFace && cardIndex !== deck.cards.length - 1 ? (
               <button className="btn btn-primary" type="button" onClick={() => setCardIndex(cardIndex + 1)} name="next-card">next</button>
               ) : (null)}
               
            </div>) : (
                <>
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
                <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}><span className="oi oi-plus"></span>Add Cards</Link>
                </>
            )}
        </div>
        </>
    )
}