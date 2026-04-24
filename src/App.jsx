import { useState } from "react";
import { HabitosProvider } from "./context/HabitosContext.jsx";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Habitos from "./pages/Habitos.jsx";
import Estatisticas from "./pages/Estatisticas.jsx";
import "./styles/global.css";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <HabitosProvider>
      <div className="app">
        {page === "home"         && <Home />}
        {page === "habitos"      && <Habitos />}
        {page === "estatisticas" && <Estatisticas />}
        <Nav page={page} setPage={setPage} />
      </div>
    </HabitosProvider>
  );
}
