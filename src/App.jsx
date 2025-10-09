import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navigation from "./Navigation";
import Landing from "./Landing";
import Home from "./Home";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import "./index.css"; // Tailwind

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Navigation />
   <Landing />
   <Home />
    <Register />
    <Footer />
   
    </>

  );
}

export default App;
