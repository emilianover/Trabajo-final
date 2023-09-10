import { useEffect, useState } from "react";
import "./App.css";
import Login from "./componentes/Login";
import { Product } from "./componentes/Product";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path="/products" component={Product}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
