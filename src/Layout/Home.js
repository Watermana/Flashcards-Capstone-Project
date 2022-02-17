import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import { listDecks } from "../utils/api";
export default function Home() {
    const history = useHistory();
    const [ decks, setDecks ] = useState([]);
    useEffect(() => {
        const abortController = new AbortController();
        async function TestfetchDecks() {
            
            const data = await listDecks(abortController.signal);
            setDecks(data);
        }
  
        TestfetchDecks();
        return () => abortController.abort();
    }, [])

    return (
        <div>
            <Link className="btn btn-secondary" to="/decks/new" name="create-deck">Create a new Deck</Link>
            
           <ul className="list-group">
               {decks.map(deck => (
                   <li key={deck.id} className="list-group-item">
                       <div className="d-flex flex-row justify-content-between">
                       <h3>{deck.name}</h3>
                       <p>{deck.cards ? deck.cards.length : 0} cards</p>
                       </div>
                       
                       <p>{deck.description}</p>
                       <Link className="btn btn-secondary" to={`/decks/${deck.id}`} name="view"><span className="oi oi-eye"></span>View</Link>
                       <Link className="btn btn-primary" to={`/decks/${deck.id}/study`} name="study"><span className="oi oi-book"></span>Study</Link>
                       <button type='button' className="btn btn-danger" onClick={() => {deleteDeck(deck.id); history.go(0);}} name="delete"><span className="oi oi-trash"></span></button>
                   </li>
               ))}
           </ul>
        </div>
    );


}