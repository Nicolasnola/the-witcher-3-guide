import React from 'react';
import { Trophy, Sparkles, RefreshCw, Download, Upload, CheckSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeroProgress({
  expansionInfo,
  trophies,
  completedTrophies,
  onReset,
  onMarkAll,
  onExport,
  onImport,
}) {
  const totalCount = trophies.length;
  const completedCount = completedTrophies.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Trigger confetti when 100% completed
  React.useEffect(() => {
    if (percentage === 100 && totalCount > 0) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: [expansionInfo.accentColor || '#c8a84e', '#e74c3c', '#ffffff', '#ffd700'],
      });
    }
  }, [percentage, totalCount, expansionInfo.accentColor]);

  // Breakdown by rarity
  const rarityStats = {
    PLATINUM: { total: 0, completed: 0, label: 'Platina', icon: '💎', color: '#68d8d6' },
    GOLD: { total: 0, completed: 0, label: 'Ouro', icon: '🥇', color: '#f5b041' },
    SILVER: { total: 0, completed: 0, label: 'Prata', icon: '🥈', color: '#bdc3c7' },
    BRONZE: { total: 0, completed: 0, label: 'Bronze', icon: '🥉', color: '#d35400' },
  };

  trophies.forEach((t) => {
    const key = Object.keys(rarityStats).find(
      (k) => rarityStats[k].label.toLowerCase() === t.rarity.label.toLowerCase()
    );
    if (key) {
      rarityStats[key].total += 1;
      if (completedTrophies.includes(t.id)) {
        rarityStats[key].completed += 1;
      }
    }
  });

  // Filter out rarities with 0 total trophies for cleaner DLC view
  const activeRarities = Object.values(rarityStats).filter((r) => r.total > 0);

  // Missable stats
  const missables = trophies.filter((t) => t.missable);
  const missablesCompleted = missables.filter((t) => completedTrophies.includes(t.id)).length;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border shadow-2xl p-5 md:p-8 mb-8 transition-all duration-500"
      style={{
        borderColor: expansionInfo.borderColor || '#3a2e1d',
        background: `linear-gradient(to bottom, #141217, #0d0b10, #08070a)`,
      }}
    >
      {/* Background Hero Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none transition-all duration-700">
        <img
          src={expansionInfo.banner}
          alt={expansionInfo.title}
          className="w-full h-full object-cover object-center filter saturate-150"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08070a] via-[#08070a]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#08070a] via-transparent to-[#08070a]"></div>
      </div>

      <div className="relative z-10">
        {/* Top Badges & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#26201a]">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl p-0.5 shadow-lg flex items-center justify-center transition-all flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${expansionInfo.accentColor || '#c8a84e'}, #3d2410)`,
                boxShadow: `0 4px 14px ${expansionInfo.accentColor || '#c8a84e'}44`,
              }}
            >
              <div className="w-full h-full bg-[#0d0b10] rounded-[10px] flex items-center justify-center">
                <Trophy
                  className="w-6 h-6 animate-pulse"
                  style={{ color: expansionInfo.accentColor || '#c8a84e' }}
                />
              </div>
            </div>
            <div>
              <span
                className="text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center gap-1.5"
                style={{ color: expansionInfo.accentColor || '#c8a84e' }}
              >
                <Sparkles className="w-4 h-4 flex-shrink-0" /> {expansionInfo.badge} • 100% Guia
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#f3ede2] font-['Cinzel',serif]">
                {expansionInfo.title}
              </h1>
              <span className="text-xs sm:text-sm text-[#9e9180] hidden sm:block -mt-0.5">
                {expansionInfo.subtitle}
              </span>
            </div>
          </div>

          {/* Action buttons - Mobile Touch Friendly Grid */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onMarkAll}
              title="Marcar todos desta expansão como conquistados"
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#1e1a16] hover:bg-[#2c241c] text-[#d6c7b2] border border-[#4a3b2c] transition-all hover:scale-102 active:scale-95 min-h-[40px]"
            >
              <CheckSquare className="w-4 h-4 text-[#c8a84e] flex-shrink-0" />
              <span>Marcar Todos</span>
            </button>
            <button
              onClick={onReset}
              title="Zerar progresso desta expansão"
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#1e1414] hover:bg-[#341818] text-[#e74c3c] border border-[#522020] transition-all hover:scale-102 active:scale-95 min-h-[40px]"
            >
              <RefreshCw className="w-4 h-4 flex-shrink-0" />
              <span>Zerar Nível</span>
            </button>
            <button
              onClick={onExport}
              title="Exportar progresso geral (JSON)"
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#131b1d] hover:bg-[#1a282c] text-[#68d8d6] border border-[#1e464c] transition-all hover:scale-102 active:scale-95 min-h-[40px]"
            >
              <Download className="w-4 h-4 flex-shrink-0" />
              <span>Exportar</span>
            </button>
            <label
              title="Importar progresso geral (JSON)"
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#171422] hover:bg-[#241d38] text-[#b39ddb] border border-[#3e305e] transition-all hover:scale-102 active:scale-95 cursor-pointer min-h-[40px]"
            >
              <Upload className="w-4 h-4 flex-shrink-0" />
              <span>Importar</span>
              <input type="file" accept=".json" onChange={onImport} className="hidden" />
            </label>
          </div>
        </div>

        {/* Big Progress Meter */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 flex items-center gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-[#1d1916]"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="transition-all duration-700 ease-out"
                  style={{ stroke: expansionInfo.accentColor || '#c8a84e' }}
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * percentage) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black text-[#f3ede2] font-mono leading-none">
                  {percentage}%
                </span>
                <span className="text-xs uppercase tracking-wider text-[#a89b88] mt-1 font-semibold">
                  Feito
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg sm:text-xl font-bold text-[#f3ede2]">
                  {completedCount}{' '}
                  <span className="text-sm font-normal text-[#8e8270]">/ {totalCount} Troféus</span>
                </span>
                {percentage === 100 && (
                  <span
                    className="px-2 py-0.5 rounded text-xs font-bold text-[#08070a] shadow-lg"
                    style={{ backgroundColor: expansionInfo.accentColor || '#c8a84e' }}
                  >
                    100% PLATINADO!
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#a89b88] mt-1.5">
                ⚠️ Perdíveis: <span className="text-[#e74c3c] font-bold">{missablesCompleted}/{missables.length}</span>
              </p>
              <p className="text-xs text-[#706657] mt-0.5">
                Salvo automaticamente no navegador
              </p>
            </div>
          </div>

          {/* Rarity Counter Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {activeRarities.map((r) => (
              <div
                key={r.label}
                className="bg-[#121015]/80 border border-[#2b241c] hover:border-[#4a3e2c] p-3 sm:p-3.5 rounded-xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl">{r.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#8a7f72]">{r.label}</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-[#f3ede2]" style={{ color: r.color }}>
                    {r.completed}
                  </span>
                  <span className="text-xs sm:text-sm text-[#7a6f62]">/ {r.total}</span>
                </div>
                <div className="w-full bg-[#1e1a16] h-2 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: r.color,
                      width: `${r.total > 0 ? (r.completed / r.total) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Progress Bar Bar */}
        <div className="mt-6 w-full bg-[#181412] h-2.5 rounded-full overflow-hidden border border-[#332a20] p-0.5">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${expansionInfo.accentColor || '#c8a84e'}88, ${expansionInfo.accentColor || '#c8a84e'}, #fff3d1)`,
              boxShadow: `0 0 10px ${expansionInfo.accentColor || '#c8a84e'}44`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
