import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Landing from "./Landing";
import Home from "./Home";
import "./index.css"; // Tailwind

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
   <Landing />
   <Home />
    </>
  );
}

export default App;
