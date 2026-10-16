import React, { useState } from 'react';
import { MapPin, CheckCircle, Circle, AlertTriangle, ChevronRight, CheckSquare, Sparkles, BookOpen } from 'lucide-react';

export default function RoadmapTab({
  guideSteps,
  completedSteps,
  onToggleStep,
  onCompleteSection,
  onToggleTrophy,
  completedTrophies,
}) {
  const [activeRegion, setActiveRegion] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    intro: true,
    white_orchard: true,
    velen: true,
    novigrad: true,
    skellige: true,
    kaer_morhen: true,
    act2_3: true,
    cleanup: true,
  });

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredSections = activeRegion === 'all'
    ? guideSteps
    : guideSteps.filter((sec) => sec.id === activeRegion);

  return (
    <div className="space-y-6">
      {/* Region Fast Jump Navigation */}
      <div className="bg-[#100e13] border border-[#2e261e] rounded-xl p-4 shadow-xl">
        <div className="text-xs font-semibold text-[#8a7f72] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#c8a84e]" /> Navegar por Região / Capítulo:
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveRegion('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeRegion === 'all'
                ? 'bg-[#c8a84e] text-[#08070a] font-bold shadow-md shadow-[#c8a84e]/20'
                : 'bg-[#18141b] text-[#a89b88] hover:bg-[#261f2c] border border-[#382c20]'
            }`}
          >
            Todas as Regiões ({guideSteps.length})
          </button>
          {guideSteps.map((sec) => {
            const total = sec.steps.length;
            const done = sec.steps.filter((s) => completedSteps.includes(s.id)).length;
            const isAllDone = total > 0 && done === total;

            return (
              <button
                key={sec.id}
                onClick={() => setActiveRegion(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeRegion === sec.id
                    ? 'bg-[#c8a84e] text-[#08070a] font-bold shadow-md shadow-[#c8a84e]/20'
                    : isAllDone
                    ? 'bg-[#121c15] text-[#2ecc71] border border-[#1e4828]'
                    : 'bg-[#18141b] text-[#a89b88] hover:bg-[#261f2c] border border-[#382c20]'
                }`}
              >
                <span>{sec.region}</span>
                <span className="text-[10px] opacity-75">
                  ({done}/{total})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-6">
        {filteredSections.map((section) => {
          const total = section.steps.length;
          const done = section.steps.filter((s) => completedSteps.includes(s.id)).length;
          const percent = total > 0 ? Math.round((done / total) * 100) : 0;
          const isExpanded = expandedSections[section.id] !== false;

          return (
            <div
              key={section.id}
              className="bg-[#110f14] border border-[#2e261e] rounded-xl overflow-hidden shadow-lg transition-all"
            >
              {/* Section Header */}
              <div className="p-4 md:p-5 bg-gradient-to-r from-[#17141b] via-[#120f16] to-[#17141b] border-b border-[#241d17] flex flex-wrap items-center justify-between gap-3">
                <div
                  className="flex items-center gap-3 cursor-pointer select-none flex-1 min-w-[200px]"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className={`p-1.5 rounded-lg bg-[#221c16] text-[#c8a84e] transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider text-[#c8a84e] font-bold">
                        {section.region}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs bg-[#292018] text-[#c0b2a2] border border-[#443324] font-medium">
                        {section.badge}
                      </span>
                    </div>
                    <h2 className="text-base md:text-lg font-bold text-[#f5ede0] font-['Cinzel',serif] mt-0.5">
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Progress & Section Actions */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#e0d6c7]">
                      {done} / {total} passos
                    </span>
                    <div className="w-20 sm:w-24 bg-[#1e1916] h-2 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-[#c8a84e] transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => onCompleteSection(section.id, section.steps.map((s) => s.id))}
                    title="Marcar todos os passos desta seção"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#1f1a16] hover:bg-[#2d241c] text-[#c8a84e] border border-[#3e3020] transition-all font-semibold"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">Completar Seção</span>
                  </button>
                </div>
              </div>

              {/* Steps List */}
              {isExpanded && (
                <div className="p-4 md:p-5 divide-y divide-[#1e1814] space-y-4">
                  {section.steps.map((step, idx) => {
                    const isStepDone = completedSteps.includes(step.id);
                    const isTrophyDone = step.trophyRef && completedTrophies.includes(step.trophyRef);

                    return (
                      <div
                        key={step.id}
                        className={`pt-4 first:pt-0 flex items-start gap-3 sm:gap-3.5 transition-all ${
                          isStepDone ? 'opacity-60' : ''
                        }`}
                      >
                        {/* Step Checkbox - Enhanced touch target on mobile */}
                        <button
                          onClick={() => onToggleStep(step.id)}
                          className="mt-0.5 flex-shrink-0 transition-transform active:scale-90 p-1 -m-1 touch-manipulation focus:outline-none"
                          title={isStepDone ? 'Desmarcar passo' : 'Marcar passo como concluído'}
                        >
                          {isStepDone ? (
                            <div className="w-6 h-6 sm:w-5 sm:h-5 rounded-md bg-[#2ecc71] flex items-center justify-center text-[#08070a] shadow-md shadow-[#2ecc71]/20">
                              <CheckCircle className="w-4 h-4 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 sm:w-5 sm:h-5 rounded-md border-2 border-[#544331] hover:border-[#c8a84e] bg-[#08070a] flex items-center justify-center">
                              <Circle className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-transparent hover:text-[#c8a84e]/30" />
                            </div>
                          )}
                        </button>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                            <span className="text-xs font-mono text-[#9e9182] font-semibold">
                              Passo {idx + 1}
                            </span>
                            {step.missable && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold text-[#e74c3c] bg-[#361313] border border-[#582121]">
                                <AlertTriangle className="w-3.5 h-3.5" /> PERDÍVEL CRÍTICO
                              </span>
                            )}
                            {step.trophyRef && (
                              <button
                                onClick={() => onToggleTrophy(step.trophyRef)}
                                title="Clique para sincronizar o status deste troféu"
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                                  isTrophyDone
                                    ? 'bg-[#142618] text-[#2ecc71] border-[#22502c]'
                                    : 'bg-[#211a14] text-[#c8a84e] border-[#423321] hover:border-[#c8a84e]'
                                }`}
                              >
                                🏆 Troféu Vinculado: {isTrophyDone ? '✓ Conquistado' : '○ Pendente'}
                              </button>
                            )}
                          </div>

                          <h3
                            className={`text-sm md:text-base font-bold text-[#f5ede0] ${
                              isStepDone ? 'line-through text-[#6e8574]' : ''
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#b8a998] mt-1 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
