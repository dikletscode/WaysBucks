import React from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header/fullHeader";
import Login from "./components/modal/auth/login";
import Signup from "./components/modal/auth/signup";
import HomePage from "./components/pages/home/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route component={HomePage} path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
