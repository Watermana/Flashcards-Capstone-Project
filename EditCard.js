import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import BreadCrumb from "./BreadCrumb";
import CardForm from "./CardForm";

export default function EditCard() {
    const {deckId, cardId} = useParams();
    const [cardEdit, setCardEdit] = useState({front:'', back:''})
    const [deck , setDeck] = useState({})
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        async function fetchDeckAndCard() {
            const deckToSet = await readDeck(deckId, abortController.signal)
            const resp = await readCard(cardId, abortController.signal)
            setCardEdit(resp);
            setDeck(deckToSet)
        }
        fetchDeckAndCard();
        return () => abortController.abort();

    }, [deckId, cardId])

    
    function cardEditChangeHandler({target}) {
        const data = target.value;
        setCardEdit({
            ...cardEdit,
            [target.name]: data
        })
    }
    
    async function cardEditSubmitHandler(e) {
        const abortController = new AbortController();
        e.preventDefault();
        await updateCard(cardEdit, abortController.signal)
        history.goBack('/')
    }
    
    return (
        <div>
            <BreadCrumb deck={deck} subname={`Edit Card ${cardEdit.id}`}/>
            <h1>Edit Card</h1>
            <CardForm handleChange={cardEditChangeHandler} handleSubmit={cardEditSubmitHandler} card={cardEdit}/>
        </div>
    )
}