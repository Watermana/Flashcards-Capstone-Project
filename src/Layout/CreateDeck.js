import React, {useState} from "react";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import DeckForm from "./DeckForm";
export default function CreateDeck() {
    const history = useHistory();
    const [newDeck, setNewDeck] = useState({name:'', description:'', cards:[]})

    function deckChangeHandler({target}) {
        const data = target.value;
        setNewDeck({
            ...newDeck,
            [target.name]: data
        })
    }

    async function newDeckSubmitHandler(e) {
        e.preventDefault()
        const abortController = new AbortController()
        await createDeck(newDeck, abortController.signal)
        setNewDeck({name:'', description:'', cards:[]})
        history.push("/")
        window.location.reload(false);
    }

    return (

        <div>
            <BreadCrumb deck={{name:'Create Deck'}}/>
            <h2>Create Deck</h2>
            <DeckForm handleChange={deckChangeHandler} handleSubmit={newDeckSubmitHandler} deck={newDeck}/>
        </div>

    )
}