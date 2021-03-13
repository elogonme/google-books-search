import React, { useState } from "react";
import Saved from "./pages/Saved";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import { StoreProvider } from "./utils/GlobalState";
import API from "./utils/API";
import UpdateMessage from "./components/UpdateMessage";

function App() {
  const [savedUpdate, setSavedUpdate] = useState(
    {
      favorite: "",
      isVisible: false
    });
  
  API.subscribeToUpdates(null, (response) => {
    setSavedUpdate(
      {
        favorite: response,
        isVisible: true
      });
    setTimeout(() => setSavedUpdate(
      {
        favorite: "",
        isVisible: false
      }), 4000);
  });
  
  return (
    <BrowserRouter>
    <div>
      <UpdateMessage savedUpdate={savedUpdate}/>
      <StoreProvider>
        <PageHeader/>
        <Nav />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route component={NoMatch} />
        </Switch>
      </StoreProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
