import React from 'react';
import { Sparkles, Shield, Flame, Sword, Award, Coins, Home, Zap, Compass, CheckCircle2 } from 'lucide-react';

export default function DlcSpecialTab({ activeExpansion }) {
  if (activeExpansion === 'hos') {
    return (
      <div className="space-y-6">
        {/* Runewright Section */}
        <div className="bg-[#130f14] border border-[#3d2618] rounded-xl p-5 md:p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e67e22] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Mecânica Exclusiva de Hearts of Stone
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#f5ede0] font-['Cinzel',serif]">
            O ENCANTADOR DE PALAVRAS E RUNAS (RUNEWRIGHT)
          </h3>
          <p className="text-xs md:text-sm text-[#b2a493] leading-relaxed">
            Localizado em <strong>Upper Mill</strong> (ao norte de Novigrad), o artesão de Ofier pode gravar palavras mágicas permanentes que combinam os 3 slots de runas das suas espadas e armaduras em efeitos lendários:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#19141e] border border-[#3b2b1d] p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#e67e22]">Nível 1 (Básico)</span>
                <span className="text-xs text-[#a89b88]">5.000 Moedas</span>
              </div>
              <p className="text-xs text-[#b8a998] leading-relaxed">
                <strong>Desvio (Deflection):</strong> A armadura reflete todas as flechas e projéteis inimigos automaticamente sem precisar bloquear!
              </p>
            </div>

            <div className="bg-[#19141e] border border-[#3b2b1d] p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#e67e22]">Nível 2 (Avançado)</span>
                <span className="text-xs text-[#a89b88]">+10.000 Moedas</span>
              </div>
              <p className="text-xs text-[#b8a998] leading-relaxed">
                <strong>Ruptura (Severance):</strong> Aumenta o alcance do ataque giratório Remoinho (Whirl) em 1.1m e do golpe pesado Rend em 1.9m. O melhor encantamento do jogo para espadas!
              </p>
            </div>

            <div className="bg-[#19141e] border border-[#3b2b1d] p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#e67e22]">Nível 3 (Mestre)</span>
                <span className="text-xs text-[#a89b88]">+15.000 Moedas</span>
              </div>
              <p className="text-xs text-[#b8a998] leading-relaxed">
                <strong>Proteção (Protection):</strong> Ao entrar em combate, conjura automaticamente um escudo Quen sem custo de vigor.
              </p>
            </div>
          </div>
        </div>

        {/* 8 Fallen Rose Camps & 187 Gwent Score */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#121015] border border-[#3d2618] p-5 rounded-xl space-y-3">
            <h4 className="text-base font-bold text-[#f5ede0] font-['Cinzel',serif] flex items-center gap-2">
              <Sword className="w-4 h-4 text-[#e67e22]" /> Acampamentos da Rosa Caída ("Rosa sem espinhos")
            </h4>
            <p className="text-xs text-[#b2a493] leading-relaxed">
              Todos os 8 acampamentos ficam no território recém-adicionado a nordeste de Velen e arredores do lago de Oxenfurt.
            </p>
            <div className="p-3 bg-[#1a120e] border border-[#4d2d17] rounded-lg text-xs text-[#d6c7b2]">
              ⚠️ <strong>Regra de Ouro:</strong> Elimine os cavaleiros renegados E OBRIGATORIAMENTE abra o baú vermelho com o diagrama em cada um dos 8 acampamentos.
            </div>
          </div>

          <div className="bg-[#121015] border border-[#3d2618] p-5 rounded-xl space-y-3">
            <h4 className="text-base font-bold text-[#f5ede0] font-['Cinzel',serif] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#e67e22]" /> Troféu "Arrebentou" (187+ Pontos no Gwent)
            </h4>
            <p className="text-xs text-[#b2a493] leading-relaxed">
              Vença qualquer partida amigável com um mercador acumulando 187 pontos em uma única rodada:
            </p>
            <ul className="text-xs text-[#b2a493] space-y-1 list-disc list-inside">
              <li>Use o Baralho dos Reinos do Norte com Foltest o Senhor do Norte.</li>
              <li>Jogue espiões na Rodada 1 até comprar quase o baralho inteiro.</li>
              <li>Na Rodada 2, jogue 3 Comandos das Listras Azuis (36 pts) + 2 Catapultas (32 pts) + Heróis + Corneta do Comandante.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Blood & Wine Special Tab
  return (
    <div className="space-y-6">
      {/* 5 Virtues Guide for Aerondight */}
      <div className="bg-[#140e11] border border-[#4d1f22] rounded-xl p-5 md:p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c0392b] flex items-center gap-1.5">
            <Sword className="w-3.5 h-3.5" /> A Espada Mais Poderosa do Jogo
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#f5ede0] font-['Cinzel',serif]">
          AS CINCO VIRTUDES CAVALHEIRESCAS DE TOUSSAINT (AERONDIGHT)
        </h3>
        <p className="text-xs md:text-sm text-[#b2a493] leading-relaxed">
          No Lago Celavy, a Dama do Lago só entregará a espada mágica de prata <strong>Aerondight</strong> se Geralt provar que vive segundo o código dos cavaleiros em missões de Toussaint:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div className="bg-[#1a1114] border border-[#3d191d] p-3.5 sm:p-4 rounded-xl space-y-1.5">
            <span className="text-xs font-bold text-[#c0392b] uppercase tracking-wide">1. Compaixão</span>
            <p className="text-xs sm:text-sm text-[#d6c7b2] leading-relaxed">
              Poupe a vida do Shaelmaar no Coliseu de Beauclair após derrotá-lo.
            </p>
          </div>

          <div className="bg-[#1a1114] border border-[#3d191d] p-3.5 sm:p-4 rounded-xl space-y-1.5">
            <span className="text-xs font-bold text-[#c0392b] uppercase tracking-wide">2. Generosidade</span>
            <p className="text-xs sm:text-sm text-[#d6c7b2] leading-relaxed">
              Dê uma gorjeta de 5 moedas ao garoto que entrega a carta de Yennefer em Beauclair.
            </p>
          </div>

          <div className="bg-[#1a1114] border border-[#3d191d] p-3.5 sm:p-4 rounded-xl space-y-1.5">
            <span className="text-xs font-bold text-[#c0392b] uppercase tracking-wide">3. Honra</span>
            <p className="text-xs sm:text-sm text-[#d6c7b2] leading-relaxed">
              No Torneio dos Cavaleiros, aceite o duelo montado a cavalo contra o nobre Tailles.
            </p>
          </div>

          <div className="bg-[#1a1114] border border-[#3d191d] p-3.5 sm:p-4 rounded-xl space-y-1.5">
            <span className="text-xs font-bold text-[#c0392b] uppercase tracking-wide">4. Sabedoria</span>
            <p className="text-xs sm:text-sm text-[#d6c7b2] leading-relaxed">
              Resolva corretamente o enigma no piquenique com Anna Henrietta (A Fênix/Unicórnio).
            </p>
          </div>

          <div className="bg-[#1a1114] border border-[#3d191d] p-3.5 sm:p-4 rounded-xl space-y-1.5">
            <span className="text-xs font-bold text-[#c0392b] uppercase tracking-wide">5. Valentia</span>
            <p className="text-xs sm:text-sm text-[#d6c7b2] leading-relaxed">
              Vença a arena final do Torneio dos Cavaleiros ou mate o monstro do cemitério.
            </p>
          </div>
        </div>
      </div>

      {/* Corvo Bianco & Mutations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#120f14] border border-[#3a1d22] p-5 rounded-xl space-y-3">
          <h4 className="text-base font-bold text-[#f5ede0] font-['Cinzel',serif] flex items-center gap-2">
            <Home className="w-4 h-4 text-[#c0392b]" /> Vinhedo de Corvo Bianco ("Dono de casa")
          </h4>
          <p className="text-xs text-[#b2a493] leading-relaxed">
            Converse com seu mordomo Barnabas-Basil e compre todas as reformas para desbloquear o troféu:
          </p>
          <ul className="text-xs text-[#b2a493] space-y-1 list-disc list-inside">
            <li>Reforma geral da residência (5.000 moedas)</li>
            <li>Reforma dos estábulos do Carpeado (+vigor)</li>
            <li>Estufa de plantas alquímicas raras</li>
            <li>Mesa de armeiro e afiador de espadas (+dano e armadura por 1 hora)</li>
            <li>Cama refinada (+bônus de XP ao dormir)</li>
          </ul>
        </div>

        <div className="bg-[#120f14] border border-[#3a1d22] p-5 rounded-xl space-y-3">
          <h4 className="text-base font-bold text-[#f5ede0] font-['Cinzel',serif] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#c0392b]" /> Mutações do Prof. Moreau ("Arma W")
          </h4>
          <p className="text-xs text-[#b2a493] leading-relaxed">
            A missão secundária "Transformação" libera a câmara secreta de mutações genéticas:
          </p>
          <ul className="text-xs text-[#b2a493] space-y-1 list-disc list-inside">
            <li>Desbloqueia <strong>4 slots extras de habilidades</strong> na árvore de Geralt.</li>
            <li>Permite mutações lendárias como <em>Gelo Perfurante (Piercing Cold)</em> que faz o sinal Aard congelar e explodir inimigos instantaneamente!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
