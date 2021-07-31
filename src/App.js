import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css";
// import AuthRoute from "./components/AuthRoute";
import BlogPage from "./components/BlogPage/BlogPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/blogpage/:id" component={BlogPage} />
      </Switch>
    </Router>
  );
}

export default App;
