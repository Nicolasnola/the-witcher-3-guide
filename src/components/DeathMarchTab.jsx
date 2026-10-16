import React, { useState } from 'react';
import { Shield, Sparkles, Flame, CheckCircle2, Circle, AlertCircle, Compass, Zap } from 'lucide-react';
import { deathMarchTips } from '../data';

export default function DeathMarchTab({ completedTrophies, onToggleTrophy }) {
  const [visitedPlaces, setVisitedPlaces] = useState(() => {
    try {
      const saved = localStorage.getItem('witcher3_places_of_power');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const togglePlace = (id) => {
    setVisitedPlaces((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      localStorage.setItem('witcher3_places_of_power', JSON.stringify(next));
      return next;
    });
  };

  const placesOfPowerWhiteOrchard = [
    { id: 'pop-1', sign: 'Aard', location: 'Ao norte do Cemitério de Pomar Branco (perto da aparição)', desc: 'Concede bônus de intensidade de Aard e +1 ponto de habilidade.' },
    { id: 'pop-2', sign: 'Igni', location: 'Dentro do Cemitério de Pomar Branco, ao lado da capela', desc: 'Concede bônus de intensidade de Igni e +1 ponto de habilidade.' },
    { id: 'pop-3', sign: 'Yrden', location: 'Ao sul da aldeia abandonada, perto de um ninho de carniçais', desc: 'Concede bônus de intensidade de Yrden e +1 ponto de habilidade.' },
    { id: 'pop-4', sign: 'Quen', location: 'A leste da ponte de Pomar Branco, em uma clareira na floresta', desc: 'Concede bônus de intensidade de Quen e +1 ponto de habilidade.' },
    { id: 'pop-5', sign: 'Axii', location: 'Ao sul do acampamento de bandidos na encosta oeste', desc: 'Concede bônus de intensidade de Axii e +1 ponto de habilidade.' },
    { id: 'pop-6', sign: 'Quen (Extra)', location: 'Ao norte do campo de batalha desolado', desc: 'Mais um ponto de habilidade para fechar 6 pontos no nível 1!' },
  ];

  const isDeathMarchDone = completedTrophies.includes('andou-pelo-caminho');
  const isPowerDone = completedTrophies.includes('poder-dar-vender');

  return (
    <div className="space-y-6">
      {/* Death March Warning & Trophy Tracker */}
      <div className="bg-gradient-to-r from-[#17130f] via-[#1f1912] to-[#17130f] border-2 border-[#594225] rounded-xl p-5 md:p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f5b041]">
              Troféu de Ouro: Andou pelo Caminho
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#f5ede0] font-['Cinzel',serif] mt-1">
            MANUAL DE SOBREVIVÊNCIA NA MARCHA DA MORTE
          </h2>
          <p className="text-xs md:text-sm text-[#c8baaa] mt-1 max-w-2xl">
            A dificuldade Marcha da Morte pune qualquer erro de posicionamento e desativa a regeneração de vida ao meditar. Com as estratégias abaixo, Geralt se torna invencível desde as primeiras horas de jogo.
          </p>
        </div>

        <button
          onClick={() => onToggleTrophy('andou-pelo-caminho')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold border transition-all ${
            isDeathMarchDone
              ? 'bg-[#162f1c] text-[#2ecc71] border-[#22502c]'
              : 'bg-[#291e12] text-[#c8a84e] border-[#5e4523] hover:border-[#c8a84e]'
          }`}
        >
          {isDeathMarchDone ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Marcha da Morte Concluída!
            </>
          ) : (
            <>
              <Circle className="w-4 h-4" />
              Marcar Marcha da Morte como Concluída
            </>
          )}
        </button>
      </div>

      {/* 6 Core Survival Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deathMarchTips.map((tip, idx) => (
          <div
            key={idx}
            className="bg-[#121015] border border-[#2e261e] hover:border-[#4d3d29] p-5 rounded-xl transition-all space-y-2 shadow-lg"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{tip.icon}</span>
              <h3 className="text-sm md:text-base font-bold text-[#f5ede0] font-['Cinzel',serif]">
                {tip.title}
              </h3>
            </div>
            <p className="text-xs text-[#b8a998] leading-relaxed">
              {tip.content}
            </p>
          </div>
        ))}
      </div>

      {/* Places of Power in White Orchard Section */}
      <div className="bg-[#110f14] border border-[#2e261e] rounded-xl p-5 md:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#241d17]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c8a84e]">
                Início Turbo • 6 Pontos de Habilidade Grátis
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#f5ede0] font-['Cinzel',serif] mt-0.5">
              Locais de Poder em Pomar Branco (Troféu "Poder para dar e vender")
            </h3>
            <p className="text-xs text-[#b2a493] mt-0.5">
              Ative os 5 sinais diferentes em sequência para desbloquear o troféu de bronze.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#b8a998]">
              {visitedPlaces.length} de {placesOfPowerWhiteOrchard.length} descobertos
            </span>
            <button
              onClick={() => onToggleTrophy('poder-dar-vender')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isPowerDone
                  ? 'bg-[#15271a] text-[#2ecc71] border-[#22502c]'
                  : 'bg-[#211a14] text-[#c8a84e] border-[#423321] hover:border-[#c8a84e]'
              }`}
            >
              {isPowerDone ? '✓ Troféu Conquistado' : '○ Sincronizar Troféu'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {placesOfPowerWhiteOrchard.map((pop) => {
            const isChecked = visitedPlaces.includes(pop.id);

            return (
              <div
                key={pop.id}
                onClick={() => togglePlace(pop.id)}
                className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'bg-[#0f1712] border-[#22502c]'
                    : 'bg-[#141217] border-[#2a221b] hover:border-[#4d3d29]'
                }`}
              >
                <button className="mt-0.5 flex-shrink-0">
                  {isChecked ? (
                    <div className="w-5 h-5 rounded bg-[#2ecc71] flex items-center justify-center text-[#08070a]">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded border-2 border-[#544331] hover:border-[#c8a84e] bg-[#08070a] flex items-center justify-center">
                      <Circle className="w-2.5 h-2.5 text-transparent hover:text-[#c8a84e]/30" />
                    </div>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#c8a84e]">Sinal {pop.sign}</span>
                    <span className="text-[10px] text-[#7d7060]">• +1 Ponto</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#f0e6d6] mt-0.5">
                    {pop.location}
                  </h4>
                  <p className="text-[11px] text-[#9c8e7e] mt-1">
                    {pop.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
