import React, {useState} from "react";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
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
            <form onSubmit={newDeckSubmitHandler}>
                <div className="form-group">
                <label htmlFor='deck-name'>Name</label>
                <input className="form-control" id="deck-name" placeholder="Deck Name" type='text' name='name' value={newDeck.name} onChange={deckChangeHandler}/>
                </div>
                <div className="form-group">
                    <label htmlFor="deck-description">Description</label>
                    <textarea className="form-control" name="description" id="deck-description" type='text' placeholder="Brief description of the deck" value={newDeck.description} onChange={deckChangeHandler} />
                </div>
                <button type='button' className="btn btn-secondary" onClick={() => history.push("/")}>Cancel</button>
                <button type='submit' className="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}