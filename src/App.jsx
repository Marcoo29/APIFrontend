import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navigation from "./Navigation";
import Landing from "./Landing";
import Home from "./Home";
import "./index.css"; // Tailwind

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Navigation />
   <Landing />
   <Home />
    </>
  );
}

export default App;
