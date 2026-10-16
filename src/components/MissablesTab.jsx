import React from 'react';
import { ShieldAlert, CheckCircle2, Circle, ArrowRight, Skull } from 'lucide-react';
import { missablesData as defaultMissables } from '../data';

export default function MissablesTab({
  missables = defaultMissables,
  completedTrophies,
  onToggleTrophy,
}) {
  return (
    <div className="space-y-6">
      {/* Alert Header Banner */}
      <div className="bg-gradient-to-r from-[#221010] via-[#1a0e10] to-[#120a0d] border-2 border-[#6d2525] rounded-xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-start gap-3.5 sm:gap-4 relative z-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#4a1818] border border-[#8b2d2d] flex items-center justify-center flex-shrink-0 text-[#e74c3c]">
            <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e74c3c] flex items-center gap-1.5">
              <Skull className="w-3.5 h-3.5" /> Atenção Redobrada: Pontos Críticos de Bloqueio
            </span>
            <h2 className="text-lg sm:text-2xl font-bold text-[#f5ede0] font-['Cinzel',serif] mt-1">
              CENTRAL DE TROFÉUS PERDÍVEIS & PONTOS SEM VOLTA
            </h2>
            <p className="text-xs sm:text-sm text-[#c9b7a7] mt-1.5 leading-relaxed">
              Certas decisões de diálogos, escolhas em leilões, ordem de missões e finais antagônicos bloqueiam permanentemente troféus essenciais. Siga rigorosamente as instruções abaixo para evitar perder progresso.
            </p>
          </div>
        </div>
      </div>

      {/* Missables Cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5">
        {missables.map((item) => {
          const isDone = item.trophyId ? completedTrophies.includes(item.trophyId) : false;

          return (
            <div
              key={item.id}
              className={`rounded-xl border p-4 sm:p-6 transition-all duration-300 ${
                isDone
                  ? 'bg-[#0f1712] border-[#22502c]'
                  : 'bg-[#120e12] border-[#3d2424] hover:border-[#6d3030]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#291c1c]">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                      item.severity === 'Crítica' || item.severity === 'Extrema'
                        ? 'bg-[#521919] text-[#e74c3c] border border-[#852a2a]'
                        : 'bg-[#3b2a1a] text-[#f5b041] border border-[#6b4c29]'
                    }`}
                  >
                    Urgência: {item.severity}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#f5ede0] font-['Cinzel',serif]">
                    {item.title}
                  </h3>
                </div>

                {item.trophyId && (
                  <button
                    onClick={() => onToggleTrophy(item.trophyId)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-all touch-manipulation ${
                      isDone
                        ? 'bg-[#162f1c] text-[#2ecc71] border-[#276b36]'
                        : 'bg-[#291818] text-[#e74c3c] border-[#5a2323] hover:border-[#8b3535]'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Troféu Conquistado
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4" />
                        Marcar como Conquistado
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm font-semibold text-[#e0cfbb] mt-3 leading-relaxed">
                {item.summary}
              </p>

              {/* Step by step details */}
              <div className="mt-3.5 space-y-2">
                {item.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#b8a998] leading-relaxed">
                    <ArrowRight className="w-4 h-4 text-[#c8a84e] flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
