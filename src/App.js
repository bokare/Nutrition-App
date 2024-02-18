import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Notfound from "./Components/Notfound";
import Track from "./Components/Track";

import Private from "./Components/Private";

import { UserContext } from "./contexts/UserContext";
import { useEffect, useState } from "react";
import Diet from "./Components/Diet";
import Header from "./Components/Header";
import Home from "./Components/Home";

function App() {
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("nutrify-user")));
  
  return (
    <>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/track" element={<Private Component={Track} />} />
            <Route path="/diet" element={<Private Component={Diet} />} />

            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
