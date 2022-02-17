import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import BreadCrumb from "./BreadCrumb";
export default function CreateCards() {
    const {deckId} = useParams();
    const history = useHistory();
    const [ newCard, setNewCard] = useState({front:'', back:''})
    const [ deck, setDeck] = useState({})

    useEffect(() => {
        async function fetchDeck() {
            const getDeck = await readDeck(deckId);
            setDeck(getDeck)
        }
        fetchDeck();
    }, [deckId])

    async function newCardSubmitHandler(e) {
        e.preventDefault();
        const abortController = new AbortController();;
        await createCard(deckId, newCard, abortController.signal)
        setNewCard({front:'', back:''})
    }

    function newCardChangeHandler({target}) {
        const data = target.value;
        setNewCard({
            ...newCard,
            [target.name]: data
        })
    }

    return (
        <>
        <BreadCrumb deck={deck} subname ="Add Card"/>
        <h2><span>{deck.name}</span>: <span>Add Card</span></h2>
        <form onSubmit={newCardSubmitHandler}>
            <div className="form-group">
            <label htmlFor="front">Front</label>
            <textarea className="form-control" id="front" name="front" placeholder="Front side of card" value={newCard.front} onChange={newCardChangeHandler} />
            </div>
            <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea className="form-control" id="back" name="back" placeholder="Back side of card" value={newCard.back} onChange={newCardChangeHandler} />
            </div>
            <div>
            <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Done</button>
            <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>
        </>
    )
}