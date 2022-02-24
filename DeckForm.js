import React from "react";
import { useHistory } from "react-router-dom";

export default function DeckForm({handleChange, handleSubmit, deck}) {
    const history = useHistory();
    return (
        <form onSubmit={handleSubmit} >
        <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" type="text" id="name" name='name' placeholder="Deck Name" value={deck.name} onChange={handleChange}/>
        </div>
        <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea className="form-control" id="description" name='description' placeholder="Brief description of the deck" value={deck.description} onChange={handleChange}/>
        </div>
        <div>
            <button type='button' className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
            <button type='submit' className="btn btn-primary">Submit</button>
        </div>
    </form>
    )
}