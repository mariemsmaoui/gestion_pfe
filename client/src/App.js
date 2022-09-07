//import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Screens/Home";

import LoginScreen from "./Components/Screens/Login";
import RegisterScreen from "./Components/Screens/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route path="/home" element={<Home/>} />


        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
