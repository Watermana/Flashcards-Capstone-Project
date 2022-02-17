import React from "react";
import { Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import DeckView from "./DeckView";
import CreateDeck from "./CreateDeck";
import StudyDeck from "./StudyDeck";
import CreateCards from "./CreateCards";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";


function Layout() {


  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path='/decks/:deckId'>
                <DeckView/>
            </Route>
          <Route path='/decks/:deckId/study'>
            <StudyDeck />
          </Route>
            <Route path="/decks/:deckId/edit">
                <EditDeck />
            </Route>
            <Route exact path="/decks/:deckId/cards/new">
                <CreateCards />
            </Route>
            <Route  path="/decks/:deckId/cards/:cardId/edit">
                <EditCard />
            </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
