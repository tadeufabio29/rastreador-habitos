import { useState, useCallback } from "react";
import { useHabitos } from "../context/HabitosContext.jsx";

const EMOJIS = ["🏃","📚","💧","🧘","🎵","✅","🍎","😴","💪","🌿"];

export default function Habitos() {
  const { habitos, adicionar, remover } = useHabitos();
  const [novoNome, setNovoNome] = useState("");
  const [selEmoji, setSelEmoji] = useState("🏃");

  const handleAdicionar = useCallback(() => {
    if (!novoNome.trim()) return;
    adicionar(novoNome.trim(), selEmoji);
    setNovoNome("");
  }, [novoNome, selEmoji, adicionar]);

  return (
    <>
      <div className="header">
        <div className="header-tag">Gerenciar</div>
        <div className="header-title">Meus<br />Hábitos</div>
        <div className="header-sub">{habitos.length} hábitos ativos</div>
      </div>

      <div className="screen">
        <div className="emojis">
          {EMOJIS.map((e) => (
            <div
              key={e}
              className={`emoji-opt${selEmoji === e ? " sel" : ""}`}
              onClick={() => setSelEmoji(e)}
            >
              {e}
            </div>
          ))}
        </div>

        <div className="add-row">
          <input
            className="add-input"
            placeholder="Nome do novo hábito..."
            value={novoNome}
            onChange={(ev) => setNovoNome(ev.target.value)}
            onKeyDown={(ev) => ev.key === "Enter" && handleAdicionar()}
          />
          <button className="add-btn" onClick={handleAdicionar}>+</button>
        </div>

        {habitos.map((h) => (
          <div key={h.id} className="habit-row">
            <div className="habit-emoji">{h.emoji}</div>
            <div className="habit-info">
              <div className="hname">{h.nome}</div>
              <div className="hstreak">🔥 {h.streak} dias seguidos</div>
            </div>
            <button className="del-btn" onClick={() => remover(h.id)}>✕</button>
          </div>
        ))}
      </div>
    </>
  );
}
