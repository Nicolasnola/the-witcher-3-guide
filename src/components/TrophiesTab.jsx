import React, { useState, useMemo } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, Circle, Award, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { TROPHY_CATEGORIES, CATEGORY_INFO, RARITY } from '../data';

export default function TrophiesTab({ trophies, completedTrophies, onToggleTrophy }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // all, completed, pending
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [sortBy, setSortBy] = useState('default'); // default, name, rarity, category
  const [expandedTips, setExpandedTips] = useState({});

  const toggleTip = (id) => {
    setExpandedTips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllTips = () => {
    const all = {};
    trophies.forEach((t) => (all[t.id] = true));
    setExpandedTips(all);
  };

  const collapseAllTips = () => {
    setExpandedTips({});
  };

  const filteredTrophies = useMemo(() => {
    return trophies
      .filter((t) => {
        // Search filter
        const matchSearch =
          searchTerm.trim() === '' ||
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.tip.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter
        const matchCategory =
          selectedCategory === 'all' ||
          (selectedCategory === 'missable' && t.missable) ||
          t.category === selectedCategory;

        // Status filter
        const isDone = completedTrophies.includes(t.id);
        const matchStatus =
          selectedStatus === 'all' ||
          (selectedStatus === 'completed' && isDone) ||
          (selectedStatus === 'pending' && !isDone);

        // Rarity filter
        const matchRarity =
          selectedRarity === 'all' ||
          t.rarity.label.toLowerCase() === selectedRarity.toLowerCase();

        return matchSearch && matchCategory && matchStatus && matchRarity;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'rarity') return b.rarity.points - a.rarity.points;
        if (sortBy === 'category') return a.category.localeCompare(b.category);
        return 0; // default order
      });
  }, [trophies, searchTerm, selectedCategory, selectedStatus, selectedRarity, sortBy, completedTrophies]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Control Panel */}
      <div className="bg-[#100e13] border border-[#2e261e] rounded-xl p-4 md:p-6 shadow-xl space-y-4">
        {/* Row 1: Search & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="relative md:col-span-8">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b7e6d]" />
            <input
              type="text"
              placeholder="Buscar por nome, descrição, monstro ou dica..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0a080c] border border-[#3b3024] rounded-lg text-sm text-[#f1eae0] placeholder-[#6b6051] search-input transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#a0927f] hover:text-[#fff]"
              >
                Limpar
              </button>
            )}
          </div>

          <div className="md:col-span-4 flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0a080c] border border-[#3b3024] rounded-lg text-sm text-[#d6c9b6] cursor-pointer"
            >
              <option value="default">Ordenação Padrão</option>
              <option value="name">Nome (A - Z)</option>
              <option value="rarity">Raridade (Maior p/ Menor)</option>
              <option value="category">Por Categoria</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#201a14]">
          <span className="text-xs text-[#807362] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Categoria:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#c8a84e] text-[#08070a] shadow-sm'
                : 'bg-[#18141a] text-[#a49683] hover:bg-[#251e27] border border-[#362b20]'
            }`}
          >
            Todos ({trophies.length})
          </button>
          <button
            onClick={() => setSelectedCategory('missable')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
              selectedCategory === 'missable'
                ? 'bg-[#e74c3c] text-white shadow-sm'
                : 'bg-[#221314] text-[#e74c3c] hover:bg-[#341618] border border-[#522020]'
            }`}
          >
            <AlertTriangle className="w-3 h-3" /> Perdíveis ({trophies.filter((t) => t.missable).length})
          </button>
          {Object.entries(CATEGORY_INFO).map(([catKey, info]) => {
            if (catKey === TROPHY_CATEGORIES.MISSABLE) return null;
            const count = trophies.filter((t) => t.category === catKey).length;
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === catKey
                    ? 'bg-[#c8a84e] text-[#08070a] shadow-sm'
                    : 'bg-[#18141a] text-[#a49683] hover:bg-[#251e27] border border-[#362b20]'
                }`}
              >
                {info.badge} ({count})
              </button>
            );
          })}
        </div>

        {/* Row 3: Status & Rarity Filters + Expand All */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#201a14] text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[#807362]">Status:</span>
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-2 py-0.5 rounded ${selectedStatus === 'all' ? 'text-[#c8a84e] font-bold' : 'text-[#8a7e6e] hover:text-[#e0d6c7]'}`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedStatus('pending')}
                className={`px-2 py-0.5 rounded ${selectedStatus === 'pending' ? 'text-[#c8a84e] font-bold' : 'text-[#8a7e6e] hover:text-[#e0d6c7]'}`}
              >
                Pendentes
              </button>
              <button
                onClick={() => setSelectedStatus('completed')}
                className={`px-2 py-0.5 rounded ${selectedStatus === 'completed' ? 'text-[#2ecc71] font-bold' : 'text-[#8a7e6e] hover:text-[#e0d6c7]'}`}
              >
                Conquistados
              </button>
            </div>

            <div className="h-3 w-[1px] bg-[#332b21] hidden sm:block"></div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#807362]">Raridade:</span>
              <button
                onClick={() => setSelectedRarity('all')}
                className={`px-1.5 py-0.5 ${selectedRarity === 'all' ? 'text-[#c8a84e] font-bold' : 'text-[#8a7e6e]'}`}
              >
                Todas
              </button>
              {Object.values(RARITY).map((r) => (
                <button
                  key={r.label}
                  onClick={() => setSelectedRarity(r.label)}
                  className={`px-1.5 py-0.5 flex items-center gap-0.5 ${
                    selectedRarity.toLowerCase() === r.label.toLowerCase() ? 'font-bold underline' : 'text-[#8a7e6e]'
                  }`}
                  style={{ color: selectedRarity.toLowerCase() === r.label.toLowerCase() ? r.color : undefined }}
                >
                  {r.icon} {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAllTips}
              className="text-[#c8a84e] hover:underline flex items-center gap-1"
            >
              Expandir Todas Dicas
            </button>
            <span className="text-[#4b3f30]">|</span>
            <button
              onClick={collapseAllTips}
              className="text-[#8a7e6e] hover:text-[#fff]"
            >
              Recolher
            </button>
          </div>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-[#8a7e6e] px-1">
        <span>
          Exibindo <strong className="text-[#e3d7c5]">{filteredTrophies.length}</strong> de {trophies.length} troféus
        </span>
        {filteredTrophies.length === 0 && (
          <span className="text-[#e74c3c]">Nenhum troféu corresponde aos filtros selecionados.</span>
        )}
      </div>

      {/* Trophy Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTrophies.map((trophy) => {
          const isDone = completedTrophies.includes(trophy.id);
          const isExpanded = expandedTips[trophy.id] || false;
          const catInfo = CATEGORY_INFO[trophy.category] || CATEGORY_INFO[TROPHY_CATEGORIES.STORY];

          return (
            <div
              key={trophy.id}
              className={`rounded-xl border transition-all duration-300 overflow-hidden trophy-card ${
                isDone
                  ? 'bg-[#0d120f]/80 border-[#1d3d2a] opacity-80'
                  : trophy.missable
                  ? 'bg-[#130f11]/90 border-[#4a2424] hover:border-[#8b3535]'
                  : 'bg-[#110f14]/90 border-[#2e261e] hover:border-[#52412e]'
              }`}
            >
              <div className="p-4 md:p-5 flex items-start gap-4">
                {/* Interactive Checkbox */}
                <button
                  onClick={() => onToggleTrophy(trophy.id)}
                  title={isDone ? 'Marcar como não conquistado' : 'Marcar como conquistado'}
                  className="mt-0.5 flex-shrink-0 transition-transform active:scale-90"
                >
                  {isDone ? (
                    <div className="w-6 h-6 rounded bg-[#2ecc71] flex items-center justify-center text-[#08070a] shadow-lg shadow-[#2ecc71]/20">
                      <CheckCircle className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded border-2 border-[#544331] hover:border-[#c8a84e] bg-[#08070a] flex items-center justify-center transition-colors">
                      <Circle className="w-3 h-3 text-transparent hover:text-[#c8a84e]/30" />
                    </div>
                  )}
                </button>

                {/* Trophy Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    {/* Rarity Tag */}
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border"
                      style={{
                        color: trophy.rarity.color,
                        borderColor: `${trophy.rarity.color}33`,
                        backgroundColor: `${trophy.rarity.color}15`,
                      }}
                    >
                      {trophy.rarity.icon} {trophy.rarity.label}
                    </span>

                    {/* Missable Tag */}
                    {trophy.missable && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold text-[#e74c3c] bg-[#3a1515] border border-[#6b2525] animate-pulse">
                        <AlertTriangle className="w-3 h-3" /> PERDÍVEL
                      </span>
                    )}

                    {/* Category Tag */}
                    <span
                      className="px-2 py-0.5 rounded text-[11px] border"
                      style={{
                        color: catInfo.color,
                        backgroundColor: catInfo.bg,
                        borderColor: catInfo.border,
                      }}
                    >
                      {catInfo.badge}
                    </span>
                  </div>

                  {/* Title & Official Description */}
                  <h3
                    className={`text-lg font-bold tracking-wide font-['Cinzel',serif] ${
                      isDone ? 'line-through text-[#6e8574]' : 'text-[#f5ede0]'
                    }`}
                  >
                    {trophy.name}
                  </h3>
                  <p className="text-sm text-[#b2a493] mt-0.5 leading-relaxed">
                    {trophy.description}
                  </p>

                  {/* Collapsible Platinum Walkthrough Strategy Tip */}
                  <div className="mt-3">
                    <button
                      onClick={() => toggleTip(trophy.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#c8a84e] hover:text-[#ebd696] transition-colors py-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isExpanded ? 'Ocultar Dica do Bruxo' : 'Ver Dica Detalhada de Platina'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 p-3.5 rounded-lg bg-[#08070a]/90 border border-[#3b3021] text-xs text-[#d6c9b6] leading-relaxed space-y-1.5 animate-slide-down shadow-inner">
                        <div className="flex items-center gap-1.5 font-bold text-[#c8a84e] uppercase tracking-wider text-[10px]">
                          <Sparkles className="w-3 h-3" /> Estratégia Recomendada (GameBlast):
                        </div>
                        <p>{trophy.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
