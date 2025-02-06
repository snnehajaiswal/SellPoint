import React from "react";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home"
import HomeScreen from "./components/HomeScreen";
import { Routes , Route } from "react-router-dom";

const App=()=>{
  return(
    <>
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Registration/>}/>
    </Routes>
    </>
  )
}
export default App;
