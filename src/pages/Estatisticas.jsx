import { useHabitos } from "../context/HabitosContext.jsx";

const DIAS = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

export default function Estatisticas() {
  const { habitos } = useHabitos();
  const today = new Date().getDay();

  const feitos = habitos.filter((h) => h.feito).length;
  const longestStreak = habitos.length
    ? Math.max(...habitos.map((h) => h.streak))
    : 0;
  const avgComplete = habitos.length
    ? Math.round(
        (habitos.reduce((a, h) => a + h.completedDays.length, 0) /
          (habitos.length * 7)) * 100
      )
    : 0;

  const weekData = DIAS.map((d, i) => {
    const done = habitos.filter((h) => h.completedDays.includes(i)).length;
    const pct  = habitos.length ? done / habitos.length : 0;
    return { d, pct, done };
  });

  const getPct = (h) => Math.round((h.completedDays.length / 7) * 100);

  const dotClass = (w, i) => {
    let c = "day-dot";
    if (w.pct === 1)    c += " full";
    else if (w.pct > 0) c += " partial";
    else                c += " empty";
    if (i === today)    c += " today-d";
    return c;
  };

  return (
    <>
      <div className="header">
        <div className="header-tag">Visão geral</div>
        <div className="header-title">Esta-<br />tísticas</div>
        <div className="header-sub">Últimos 7 dias</div>
      </div>

      <div className="screen">
        <div className="stats-grid">
          <div className="stat-card accent">
            <div className="sv">{longestStreak}</div>
            <div className="sl">Maior sequência</div>
          </div>
          <div className="stat-card">
            <div className="sv">{avgComplete}%</div>
            <div className="sl">Média semanal</div>
          </div>
          <div className="stat-card">
            <div className="sv">{habitos.length}</div>
            <div className="sl">Hábitos ativos</div>
          </div>
          <div className="stat-card">
            <div className="sv">{feitos}</div>
            <div className="sl">Hoje completos</div>
          </div>
        </div>

        <div className="section-label" style={{ margin: "24px 0 14px" }}>Semana</div>
        <div className="week-grid">
          {weekData.map((w, i) => (
            <div key={i} className="day-col">
              <div className="day-label">{w.d}</div>
              <div className={dotClass(w, i)}>{w.done}</div>
            </div>
          ))}
        </div>

        <div className="section-label" style={{ margin: "24px 0 14px" }}>Por hábito</div>
        {habitos.map((h) => (
          <div key={h.id} className="habit-stat-row">
            <span style={{ fontSize: 18 }}>{h.emoji}</span>
            <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{h.nome}</span>
            <div className="hs-bar-wrap">
              <div className="hs-bar" style={{ width: `${getPct(h)}%` }} />
            </div>
            <span className="hs-pct">{getPct(h)}%</span>
          </div>
        ))}
      </div>
    </>
  );
}
