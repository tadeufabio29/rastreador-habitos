import { useState, useEffect } from "react";
import { useHabitos } from "../context/HabitosContext.jsx";

export default function Home() {
  const { habitos, toggle } = useHabitos();

  const [hoje] = useState(() =>
    new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  );
  const [frase, setFrase] = useState("");

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((r) => r.json())
      .then((data) => {
        const en = data.slip.advice;
        return fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(en)}&langpair=en|pt-BR`
        );
      })
      .then((r) => r.json())
      .then((data) => setFrase(data.responseData.translatedText))
      .catch(() => setFrase("Continue firme nos seus hábitos!"));
  }, []);

  const feitos = habitos.filter((h) => h.feito).length;
  const score  = habitos.length
    ? Math.round((feitos / habitos.length) * 100)
    : 0;

  return (
    <>
      <div className="header">
        <div className="header-tag">Hoje</div>
        <div className="header-title">Seus<br />Hábitos</div>
        <div className="header-sub">{hoje}</div>
      </div>

      <div className="screen">
        <div className="greeting-card">
          <div className="greeting-label">Progresso de hoje</div>
          <div className="greeting-score">{score}%</div>
          <div className="greeting-msg">
            {score === 100
              ? "🎉 Perfeito! Todos completos!"
              : "Continue assim, você consegue!"}
          </div>
        </div>

        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${score}%` }} />
        </div>
        <div className="progress-text">
          <span>{feitos} de {habitos.length} hábitos</span>
          <span>{score}%</span>
        </div>

        {frase && (
          <div className="greeting-card" style={{ marginTop: 16 }}>
            <div className="greeting-label">💡 Conselho do dia</div>
            <div className="greeting-msg">{frase}</div>
          </div>
        )}

        <div style={{ marginTop: 28 }}>
          <div className="section-label">Check-in diário</div>
          <div className="today-list">
            {habitos.map((h) => (
              <button
                key={h.id}
                className="habit-chip"
                onClick={() => toggle(h.id)}
              >
                <div className={`check${h.feito ? " done" : ""}`}>
                  {h.feito ? "✓" : ""}
                </div>
                <span className="chip-emoji">{h.emoji}</span>
                <span className="chip-name">{h.nome}</span>
                <span className="chip-streak">🔥 {h.streak}d</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
