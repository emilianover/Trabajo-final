import { useEffect, useState } from "react";
import "./App.css";
import IsNotAdmin from "./pages/Admin/isNotAdmin"
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Success from "./pages/Success/Success";
import Login from "./componentes/Login/Login";
import Confirm from "./pages/Confirm/Confirm"
import peek from "./utils/peek"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/admin" element = { <IsNotAdmin /> } />
          <Route path='/register' element= {<Register />} />
          <Route path='/confirm' element= {<Confirm />} />
          <Route path='/success' element= {<Success />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
