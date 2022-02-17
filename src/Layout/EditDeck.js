import React, {useState, useEffect} from "react";
import { useParams, useHistory} from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import BreadCrumb from "./BreadCrumb";

export default function EditDeck() {
    const {deckId} = useParams();
    const history = useHistory();

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
             <form onSubmit={deckEditSubmitHandler} >
                 <div className="form-group">
                 <label htmlFor="name">Name</label>
                 <input className="form-control" type="text" id="name" name='name' value={deckEdit.name} onChange={deckEditChangeHandler}/>
                 </div>
                 <div className="form-group">
                 <label htmlFor="description">Description</label>
                 <textarea className="form-control" id="description" name='description' value={deckEdit.description} onChange={deckEditChangeHandler}/>
                 </div>
                 <div>
                     <button type='button' className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
                     <button type='submit' className="btn btn-primary">Submit</button>
                 </div>
             </form>
         </div>
     )
}