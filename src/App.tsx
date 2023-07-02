import React from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import OrderPage from "./pages/orders/orderPage";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={'/'} element={<LoginPage/>}/>
            <Route path={'/orders'} element={<OrderPage/>}/>
        </Routes>

    </div>
  );
}

export default App;
