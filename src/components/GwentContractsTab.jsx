import React, { useState } from 'react';
import { Award, CheckCircle2, Circle, Swords, BookOpen, AlertCircle, Compass, Sparkles, Target } from 'lucide-react';
import { witcherContracts } from '../data';

export default function GwentContractsTab({ completedContracts, onToggleContract, completedTrophies, onToggleTrophy }) {
  const [subTab, setSubTab] = useState('contracts'); // 'contracts', 'gwent', 'devils_pit'

  const completedContractsCount = completedContracts.length;
  const isProfessionalDone = completedTrophies.includes('geralt-profissional');

  return (
    <div className="space-y-6">
      {/* Subtab Toggle Buttons */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#100e13] border border-[#2e261e] rounded-xl">
        <button
          onClick={() => setSubTab('contracts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
            subTab === 'contracts'
              ? 'bg-[#c8a84e] text-[#08070a] shadow-md shadow-[#c8a84e]/20'
              : 'text-[#9c8e7e] hover:bg-[#1a161f] hover:text-[#f0e6d6]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Contratos de Bruxo ({completedContractsCount}/{witcherContracts.length})</span>
        </button>

        <button
          onClick={() => setSubTab('gwent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
            subTab === 'gwent'
              ? 'bg-[#c8a84e] text-[#08070a] shadow-md shadow-[#c8a84e]/20'
              : 'text-[#9c8e7e] hover:bg-[#1a161f] hover:text-[#f0e6d6]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Guia Mestre de Gwent</span>
        </button>

        <button
          onClick={() => setSubTab('devils_pit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
            subTab === 'devils_pit'
              ? 'bg-[#c8a84e] text-[#08070a] shadow-md shadow-[#c8a84e]/20'
              : 'text-[#9c8e7e] hover:bg-[#1a161f] hover:text-[#f0e6d6]'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Farm Fosso do Diabo (Devil's Pit)</span>
        </button>
      </div>

      {/* VIEW 1: WITCHER CONTRACTS CHECKLIST */}
      {subTab === 'contracts' && (
        <div className="space-y-4">
          <div className="bg-[#110f14] border border-[#2e261e] rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#c8a84e] font-bold">
                  Troféu de Prata
                </span>
                <span className="text-xs text-[#8a7f72]">•</span>
                <span className="text-xs text-[#8a7f72]">Todos os 22 Contratos Oficiais</span>
              </div>
              <h3 className="text-lg font-bold text-[#f5ede0] font-['Cinzel',serif] mt-0.5">
                Geralt: O Profissional (Geralt: The Professional)
              </h3>
              <p className="text-xs text-[#b2a493] mt-1">
                Marque cada monstro de contrato eliminado para rastrear seu progresso até o troféu.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-sm font-bold text-[#f5ede0]">
                  {completedContractsCount} de {witcherContracts.length} concluídos
                </span>
                <div className="w-32 bg-[#1e1916] h-2 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-[#c8a84e] transition-all duration-300"
                    style={{ width: `${(completedContractsCount / witcherContracts.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => onToggleTrophy('geralt-profissional')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isProfessionalDone
                    ? 'bg-[#15271a] text-[#2ecc71] border-[#22502c]'
                    : 'bg-[#211a14] text-[#c8a84e] border-[#423321] hover:border-[#c8a84e]'
                }`}
              >
                {isProfessionalDone ? '✓ Troféu Desbloqueado' : '○ Sincronizar Troféu'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {witcherContracts.map((contract) => {
              const isChecked = completedContracts.includes(contract.id);

              return (
                <div
                  key={contract.id}
                  onClick={() => onToggleContract(contract.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer select-none transition-all ${
                    isChecked
                      ? 'bg-[#0f1712] border-[#22502c] opacity-75'
                      : 'bg-[#121015] border-[#2e261e] hover:border-[#4d3d29]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button className="flex-shrink-0">
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
                    <div>
                      <h4 className={`text-sm font-bold ${isChecked ? 'line-through text-[#6e8574]' : 'text-[#f5ede0]'}`}>
                        {contract.name}
                      </h4>
                      <p className="text-xs text-[#9c8e7e]">
                        {contract.region} • <span className="text-[#c8a84e] font-semibold">Nível {contract.level}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-xs px-2 py-0.5 rounded bg-[#1e1916] text-[#b8a998] border border-[#362b20] flex-shrink-0">
                    {contract.monster}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: GWENT MASTER GUIDE */}
      {subTab === 'gwent' && (
        <div className="space-y-5">
          <div className="bg-[#110f14] border border-[#2e261e] rounded-xl p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c8a84e]">
                Guia Estratégico Oficial
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#f5ede0] font-['Cinzel',serif]">
              COMO CONQUISTAR TODAS AS CARTAS E O TORNEIO DA PASSIFLORA
            </h3>
            <p className="text-xs md:text-sm text-[#b2a493] leading-relaxed">
              O troféu <strong>Colecionador de cartas</strong> exige coletar todas as 120 cartas únicas do jogo base. O segredo para nunca perder uma partida é o <strong>Baralho dos Reinos do Norte (Northern Realms)</strong> focado em Espiões, Manequins de Treino e Queimadura.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
              <div className="bg-[#17141b] border border-[#33281e] p-4 rounded-xl">
                <h4 className="text-sm font-bold text-[#c8a84e] mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> 1. O Combo dos Espiões
                </h4>
                <p className="text-xs text-[#b8a998] leading-relaxed">
                  Adicione Dijkstra, Príncipe Stennis, Thaler e o Elfo Misterioso ao seu deck. No primeiro turno, jogue todos os espiões no campo do inimigo para comprar 2 cartas extras por cada um, terminando a rodada com vantagem esmagadora de cartas.
                </p>
              </div>

              <div className="bg-[#17141b] border border-[#33281e] p-4 rounded-xl">
                <h4 className="text-sm font-bold text-[#c8a84e] mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> 2. Manequins de Treino
                </h4>
                <p className="text-xs text-[#b8a998] leading-relaxed">
                  Use os Decoys (Manequins) para roubar os espiões que o oponente jogar no seu campo e devolvê-los para comprar ainda mais cartas, ou para resgatar cartas médicas e reutilizá-las na rodada final.
                </p>
              </div>

              <div className="bg-[#17141b] border border-[#33281e] p-4 rounded-xl">
                <h4 className="text-sm font-bold text-[#c8a84e] mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> 3. Torneio Passiflora
                </h4>
                <p className="text-xs text-[#b8a998] leading-relaxed">
                  Exige 1000 coroas e baralho forte. Salve manualmente antes de pagar e antes de cada oponente: Bernard Tulle (Reinos do Norte), Madame Sasha (Nilfgaard), Finneas (Scoia'tael) e Tybalt (Monstros). Nunca recuse apostar!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: DEVIL'S PIT FARMING */}
      {subTab === 'devils_pit' && (
        <div className="space-y-5">
          <div className="bg-[#110f14] border border-[#2e261e] rounded-xl p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#e74c3c]">
                Área de Treinamento Supremo
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#f5ede0] font-['Cinzel',serif]">
              FOSSO DO DIABO (DEVIL'S PIT) — O PARAÍSO DOS TROFÉUS DE COMBATE
            </h3>
            <p className="text-xs md:text-sm text-[#b2a493] leading-relaxed">
              Localizado a sudeste da Aldeia de Mulbrydale em Velen, esta enorme pedreira de madeira é o local ideal para desbloquear todos os troféus de combate que exigem contagens repetidas sem risco de morte:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#161318] border border-[#382b1f] p-4 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#f5ede0]">🎯 Atirador de Elite</span>
                  <span className="text-xs text-[#c8a84e]">50 Headshots</span>
                </div>
                <p className="text-xs text-[#a89b88]">
                  Atraia os bandidos até o portão de madeira da entrada (eles não conseguem ultrapassá-lo). Lance Axii para deixá-los imóveis, mire com calma na cabeça e dispare. Quando a tela tremer, o headshot foi contabilizado.
                </p>
              </div>

              <div className="bg-[#161318] border border-[#382b1f] p-4 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#f5ede0]">💨 Sai de Baixo</span>
                  <span className="text-xs text-[#c8a84e]">10 Quedas Mortais</span>
                </div>
                <p className="text-xs text-[#a89b88]">
                  Suba nas plataformas de madeira suspensas no centro do Fosso do Diabo. Espere os bandidos subirem a escada e arremesse-os para o abismo usando o Sinal Aard.
                </p>
              </div>

              <div className="bg-[#161318] border border-[#382b1f] p-4 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#f5ede0]">🩸 Exagero (Overkill)</span>
                  <span className="text-xs text-[#c8a84e]">10x Três Efeitos</span>
                </div>
                <p className="text-xs text-[#a89b88]">
                  Dispare flechas de ponta larga (Broadhead Bolts) para sangramento 100%, em seguida jogue a bomba Beijo do Diabo / Igni (queimadura) e a bomba Fungo do Diabo (envenenamento).
                </p>
              </div>

              <div className="bg-[#161318] border border-[#382b1f] p-4 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#f5ede0]">🔄 Como Resetar os Bandidos</span>
                  <span className="text-xs text-[#2ecc71]">Respawn Infinito</span>
                </div>
                <p className="text-xs text-[#a89b88]">
                  Depois de eliminar a maioria dos bandidos, viaje rapidamente para o Palácio Real de Vizima pelo poste de sinalização e retorne ao Fosso do Diabo. Todos os bandidos estarão vivos novamente!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
