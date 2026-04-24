import { createContext, useContext, useState, useCallback } from "react";

const HabitosContext = createContext(null);

const HABITOS_INICIAIS = [
  { id: 1, nome: "Exercitar",  emoji: "🏃", feito: false, streak: 5, completedDays: [0,1,2,3,4,5] },
  { id: 2, nome: "Ler 20 min", emoji: "📚", feito: false, streak: 3, completedDays: [0,2,3,4,5,6] },
  { id: 3, nome: "Beber água", emoji: "💧", feito: false, streak: 7, completedDays: [0,1,2,3,4,5,6] },
  { id: 4, nome: "Meditar",    emoji: "🧘", feito: false, streak: 2, completedDays: [3,4,5,6] },
];

export function HabitosProvider({ children }) {
  const [habitos, setHabitos] = useState(HABITOS_INICIAIS);
  const [nextId,  setNextId]  = useState(5);

  const toggle = useCallback((id) => {
    setHabitos((prev) =>
      prev.map((h) =>
        h.id !== id
          ? h
          : { ...h, feito: !h.feito, streak: !h.feito ? h.streak + 1 : h.streak }
      )
    );
  }, []);

  const adicionar = useCallback((nome, emoji) => {
    setHabitos((prev) => [
      ...prev,
      { id: nextId, nome, emoji, feito: false, streak: 0, completedDays: [] },
    ]);
    setNextId((n) => n + 1);
  }, [nextId]);

  const remover = useCallback((id) => {
    setHabitos((prev) => prev.filter((h) => h.id !== id));
  }, []);

  return (
    <HabitosContext.Provider value={{ habitos, toggle, adicionar, remover }}>
      {children}
    </HabitosContext.Provider>
  );
}

export function useHabitos() {
  return useContext(HabitosContext);
}
