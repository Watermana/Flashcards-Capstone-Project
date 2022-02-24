import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import BreadCrumb from "./BreadCrumb";
import DeckForm from "./DeckForm";

export default function EditDeck() {
    const {deckId} = useParams();

    const [ deckEdit, setDeckEdit] = useState({name:'', description:''})

    useEffect(() => {
        const abortController = new AbortController();
        async function fetchDeck() {
            const data = await readDeck(deckId, abortController.signal)
            setDeckEdit(data)
        }
        fetchDeck();
        return () => abortController.abort();
    }, [deckId])

    function deckEditChangeHandler({target}) {
        const data = target.value;
        setDeckEdit({
            ...deckEdit,
            [target.name]: data
        })
    }

    async function deckEditSubmitHandler(e) {
        const abortController = new AbortController();
        e.preventDefault();
        await updateDeck(deckEdit, abortController.signal);
    }

     return (
         <div>
            <BreadCrumb deck={deckEdit} subname="Edit Deck"/>
            <h1>Edit Deck</h1>
            <DeckForm handleChange={deckEditChangeHandler} handleSubmit={deckEditSubmitHandler} deck={deckEdit} />
         </div>
     )
}