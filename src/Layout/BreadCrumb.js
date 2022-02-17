import React from "react";
import { Link } from "react-router-dom";

export default function BreadCrumb({deck, subname}) {

    return (
<nav aria-label="breadcrumb">
    <ol className="breadcrumb">
    {!subname ? (
        <>
        <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span>Home</Link></li>
        <li className="breadcrumb-item">{deck.name}</li>
        </>
    ) : (
        <>
        <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span>Home</Link></li>
        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
        <li className="breadcrumb-item active" aria-current="page">{subname}</li>
        </>
    )}
    </ol>
    </nav>
      );
}


/*
<nav aria-label="breadcrumb">
    <ol className="breadcrumb">
    {!subname ? (
        <>
        <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span>Home</Link></li>
        <li className="breadcrumb-item">{deck.name}</li>
        </>
    ) : (
        <>
        <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span>Home</Link></li>
        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
        <li className="breadcrumb-item active" aria-current="page">{subname}</li>
        </>
    )}
    </ol>
    </nav>
      );
*/