import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import BreadCrumb from "./BreadCrumb";
import CardForm from "./CardForm";
export default function CreateCards() {
    const {deckId} = useParams();
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
        <CardForm handleChange={newCardChangeHandler} handleSubmit={newCardSubmitHandler} card={newCard} />
        </>
    )
}
