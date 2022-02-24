import React from "react";
import { useHistory } from "react-router-dom";

export default function CardForm({handleChange, handleSubmit, card}) {
    const history = useHistory();
    return (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="front">Front</label>
            <textarea className="form-control" id="front" name='front' placeholder="Front side of card" value={card.front} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea className="form-control" id="back" name="back" placeholder="Back side of card" value={card.back} onChange={handleChange} />
        </div>
        <div>
            <button className="btn btn-secondary" type="button" onClick={() => history.goBack()}>Done</button>
            <button className="btn btn-primary" type="submit">Submit</button>
        </div>
    </form>
    )
}