import React from 'react';
import {Route, Routes} from "react-router-dom";

import LoginPage from "./pages/login/loginPage";
import OrderPage from "./pages/orders/orderPage";
import NotFound from "./pages/NotFound/NotFound";

import './App.css';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={'/'} element={<LoginPage/>}/>
            <Route path={'/orders'} element={<OrderPage/>}/>
            <Route path={'*'} element={<NotFound/>}/>
        </Routes>

    </div>
  );
}

export default App;
