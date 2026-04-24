export default function Nav({ page, setPage }) {
  const items = [
    { id: "home",         icon: "◎", label: "Hoje"    },
    { id: "habitos",      icon: "✦", label: "Hábitos" },
    { id: "estatisticas", icon: "▲", label: "Stats"   },
  ];

  return (
    <nav className="nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={`nav-btn${page === item.id ? " active" : ""}`}
          onClick={() => setPage(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
          <div className="nav-dot" />
        </button>
      ))}
    </nav>
  );
}
