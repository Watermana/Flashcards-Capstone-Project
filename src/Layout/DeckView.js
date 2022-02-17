import React, {useState, useEffect} from 'react';
import {useHistory, useParams, useRouteMatch, Link} from "react-router-dom";
import { deleteCard, readDeck, deleteDeck } from '../utils/api';
import BreadCrumb from './BreadCrumb';
export default function DeckView() {
    const history = useHistory();
    const { url } = useRouteMatch();
    const {deckId} = useParams();
    const [ deck, setdeck] = useState({id: 1, name:'', cards: [], description:''});


    useEffect(() => {
        const abortController = new AbortController();
        async function setTargetDeck() {
            const data = await readDeck(deckId)
            setdeck(data);
        }

        setTargetDeck();
        return () => abortController.abort();
    }, [deckId])


    return (
        <div>
            <BreadCrumb deck={deck} />
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <div className='d-flex'>
            <Link to={`${url}/edit`} className="btn btn-secondary"><span className="oi oi-pencil"></span>Edit</Link>
            <Link to={`${url}/study`} className="btn btn-secondary"><span className="oi oi-book"></span>Study this Deck</Link>
            <Link to={`${url}/cards/new`}className='btn btn-primary'><span className="oi oi-plus"></span>Add Cards</Link>
            <button className='btn btn-danger ml-auto' type='button' onClick={() => {deleteDeck(deck.id); history.push("/");}}><span className="oi oi-trash"></span></button>
            </div>
            <ul className='list-group mt-3'>
                {deck.cards.map((card, index) => (
                    <li key={index} className="list-group-item d-flex flex-row">
                        <div className='d-flex flex-column w-50 mr-2'>
                            <div>{card.front}</div>
                        </div>
                        <div className='d-flex flex-column w-50'>
                            <div>{card.back}</div>
                            <div className='text-right'><Link className='btn btn-secondary mr-2' to={`${url}/cards/${card.id}/edit`}><span className="oi oi-pencil"></span>Edit</Link>
                            <button className='btn btn-danger' type="button" onClick={() => {
                                if(window.confirm("Delete this card? \n\nYou will not be able to recover it"))
                                deleteCard(card.id)
                                history.go(0)
                            }}><span className="oi oi-trash"></span></button></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
