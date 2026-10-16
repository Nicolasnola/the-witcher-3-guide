import React, { useState, useEffect } from 'react';
import {
  Compass,
  Trophy,
  AlertTriangle,
  BookOpen,
  Shield,
  Sparkles,
  Flame,
  Wind,
  Zap,
  Eye,
  Layers,
  Award,
} from 'lucide-react';
import { trophies as baseTrophies, guideSteps as baseGuideSteps, missablesData as baseMissables } from './data';
import {
  EXPANSION_HOS_INFO,
  heartsOfStoneTrophies,
  heartsOfStoneGuideSteps,
  heartsOfStoneMissables,
  EXPANSION_BW_INFO,
  bloodAndWineTrophies,
  bloodAndWineGuideSteps,
  bloodAndWineMissables,
} from './dlcData';
import HeroProgress from './components/HeroProgress';
import RoadmapTab from './components/RoadmapTab';
import TrophiesTab from './components/TrophiesTab';
import MissablesTab from './components/MissablesTab';
import GwentContractsTab from './components/GwentContractsTab';
import DeathMarchTab from './components/DeathMarchTab';
import DlcSpecialTab from './components/DlcSpecialTab';
import ResetModal from './components/ResetModal';

export default function App() {
  // Active Expansion Level: 'base' | 'hos' | 'bw'
  const [activeExpansion, setActiveExpansion] = useState(() => {
    try {
      return localStorage.getItem('witcher3_active_expansion') || 'base';
    } catch {
      return 'base';
    }
  });

  // Active Tab inside the selected Expansion
  const [activeTab, setActiveTab] = useState('roadmap');
  const [activeSign, setActiveSign] = useState(null);

  // Persistent States - Base Game
  const [baseCompletedTrophies, setBaseCompletedTrophies] = useState(() => {
    try {
      const saved = localStorage.getItem('witcher3_platinum_trophies');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [baseCompletedSteps, setBaseCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem('witcher3_platinum_steps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedContracts, setCompletedContracts] = useState(() => {
    try {
      const saved = localStorage.getItem('witcher3_platinum_contracts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent States - Hearts of Stone
  const [hosCompletedTrophies, setHosCompletedTrophies] = useState(() => {
    try {
      const saved = localStorage.getItem('witcher3_hos_trophies');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [hosCompletedSteps, setHosCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem('witcher3_hos_steps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent States - Blood and Wine
  const [bwCompletedTrophies, setBwCompletedTrophies] = useState(() => {
    try {
      const saved = localStorage.getItem('witcher3_bw_trophies');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bwCompletedSteps, setBwCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem('witcher3_bw_steps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal States
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    onConfirm: () => {},
  });

  // Save states to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('witcher3_active_expansion', activeExpansion);
    } catch (e) {
      console.error(e);
    }
  }, [activeExpansion]);

  useEffect(() => {
    try {
      localStorage.setItem('witcher3_platinum_trophies', JSON.stringify(baseCompletedTrophies));
    } catch (e) {
      console.error(e);
    }
  }, [baseCompletedTrophies]);

  useEffect(() => {
    try {
      localStorage.setItem('witcher3_platinum_steps', JSON.stringify(baseCompletedSteps));
    } catch (e) {
      console.error(e);
    }
  }, [baseCompletedSteps]);

  useEffect(() => {
    try {
      localStorage.setItem('witcher3_platinum_contracts', JSON.stringify(completedContracts));
    } catch (e) {
      console.error(e);
    }
  }, [completedContracts]);

  useEffect(() => {
    try {
      localStorage.setItem('witcher3_hos_trophies', JSON.stringify(hosCompletedTrophies));
    } catch (e) {
      console.error(e);
    }
  }, [hosCompletedTrophies]);

  useEffect(() => {
    try {
      localStorage.setItem('witcher3_hos_steps', JSON.stringify(hosCompletedSteps));
    } catch (e) {
      console.error(e);
    }
  }, [hosCompletedSteps]);

  useEffect(() => {
    try {
      localStorage.setItem('witcher3_bw_trophies', JSON.stringify(bwCompletedTrophies));
    } catch (e) {
      console.error(e);
    }
  }, [bwCompletedTrophies]);

  useEffect(() => {
    try {
      localStorage.setItem('witcher3_bw_steps', JSON.stringify(bwCompletedSteps));
    } catch (e) {
      console.error(e);
    }
  }, [bwCompletedSteps]);

  // Current Expansion Data Selector
  const currentConfig = {
    base: {
      info: {
        id: 'base',
        title: 'THE WITCHER 3: WILD HUNT',
        subtitle: 'A Caçada Selvagem • Guia Definitivo de Platina & 1000G',
        banner: '/images/witcher_hero.jpg',
        accentColor: '#c8a84e',
        borderColor: '#3a2e1d',
        badge: 'Jogo Base',
      },
      trophies: baseTrophies,
      guideSteps: baseGuideSteps,
      missables: baseMissables,
      completedTrophies: baseCompletedTrophies,
      setCompletedTrophies: setBaseCompletedTrophies,
      completedSteps: baseCompletedSteps,
      setCompletedSteps: setBaseCompletedSteps,
    },
    hos: {
      info: EXPANSION_HOS_INFO,
      trophies: heartsOfStoneTrophies,
      guideSteps: heartsOfStoneGuideSteps,
      missables: heartsOfStoneMissables,
      completedTrophies: hosCompletedTrophies,
      setCompletedTrophies: setHosCompletedTrophies,
      completedSteps: hosCompletedSteps,
      setCompletedSteps: setHosCompletedSteps,
    },
    bw: {
      info: EXPANSION_BW_INFO,
      trophies: bloodAndWineTrophies,
      guideSteps: bloodAndWineGuideSteps,
      missables: bloodAndWineMissables,
      completedTrophies: bwCompletedTrophies,
      setCompletedTrophies: setBwCompletedTrophies,
      completedSteps: bwCompletedSteps,
      setCompletedSteps: setBwCompletedSteps,
    },
  }[activeExpansion];

  // Handlers for Active Expansion
  const handleToggleTrophy = (id) => {
    currentConfig.setCompletedTrophies((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleToggleStep = (id) => {
    currentConfig.setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleToggleContract = (id) => {
    setCompletedContracts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleCompleteSection = (sectionId, stepIds) => {
    currentConfig.setCompletedSteps((prev) => {
      const set = new Set([...prev, ...stepIds]);
      return Array.from(set);
    });
  };

  // Reset modal for active level
  const handleOpenResetModal = () => {
    setModalState({
      isOpen: true,
      title: `Zerar Progresso de ${currentConfig.info.title}?`,
      message: `Tem certeza que deseja apagar os troféus e passos concluídos desta expansão? O progresso do restante do jogo não será alterado.`,
      confirmText: 'Sim, Zerar Expansão',
      onConfirm: () => {
        currentConfig.setCompletedTrophies([]);
        currentConfig.setCompletedSteps([]);
      },
    });
  };

  // Mark all for active level
  const handleOpenMarkAllModal = () => {
    setModalState({
      isOpen: true,
      title: `Marcar todos de ${currentConfig.info.title}?`,
      message: `Deseja marcar todas as ${currentConfig.trophies.length} conquistas desta expansão como concluídas?`,
      confirmText: 'Marcar Todos',
      onConfirm: () => {
        currentConfig.setCompletedTrophies(currentConfig.trophies.map((t) => t.id));
      },
    });
  };

  // Global Export / Import
  const handleExport = () => {
    const data = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      base: {
        trophies: baseCompletedTrophies,
        steps: baseCompletedSteps,
        contracts: completedContracts,
      },
      hos: {
        trophies: hosCompletedTrophies,
        steps: hosCompletedSteps,
      },
      bw: {
        trophies: bwCompletedTrophies,
        steps: bwCompletedSteps,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `witcher-3-completo-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (parsed.base) {
          if (Array.isArray(parsed.base.trophies)) setBaseCompletedTrophies(parsed.base.trophies);
          if (Array.isArray(parsed.base.steps)) setBaseCompletedSteps(parsed.base.steps);
          if (Array.isArray(parsed.base.contracts)) setCompletedContracts(parsed.base.contracts);
        } else if (Array.isArray(parsed.trophies)) {
          // Backward compatibility with version 1.0 backup
          setBaseCompletedTrophies(parsed.trophies);
        }

        if (parsed.hos && Array.isArray(parsed.hos.trophies)) {
          setHosCompletedTrophies(parsed.hos.trophies);
          if (Array.isArray(parsed.hos.steps)) setHosCompletedSteps(parsed.hos.steps);
        }

        if (parsed.bw && Array.isArray(parsed.bw.trophies)) {
          setBwCompletedTrophies(parsed.bw.trophies);
          if (Array.isArray(parsed.bw.steps)) setBwCompletedSteps(parsed.bw.steps);
        }

        alert('Backup completo importado com sucesso!');
      } catch (err) {
        alert('Erro ao importar arquivo. Verifique se o formato JSON é válido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Grand Total Stats across Base + DLCs (79 trophies)
  const totalMastery =
    baseCompletedTrophies.length + hosCompletedTrophies.length + bwCompletedTrophies.length;
  const totalAvailable =
    baseTrophies.length + heartsOfStoneTrophies.length + bloodAndWineTrophies.length;
  const grandPercentage = Math.round((totalMastery / totalAvailable) * 100);

  // Witcher Signs Bar
  const signs = [
    { name: 'AARD', color: '#3498db', icon: Wind, flavor: 'Onda Telecinética de Impacto' },
    { name: 'IGNI', color: '#e67e22', icon: Flame, flavor: 'Rajada Piocinética Flamejante' },
    { name: 'QUEN', color: '#f1c40f', icon: Shield, flavor: 'Escudo Protetor e Cura Ativa' },
    { name: 'YRDEN', color: '#9b59b6', icon: Zap, flavor: 'Armadilha Mágica de Retardamento' },
    { name: 'AXII', color: '#2ecc71', icon: Eye, flavor: 'Hipnose e Manipulação Mental' },
  ];

  return (
    <div className="min-h-screen bg-[#08070a] text-[#e8e2d8] selection:bg-[#c8a84e] selection:text-[#08070a]">
      {/* Top Banner Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0d0a0f]/95 backdrop-blur-md border-b border-[#2e261e] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg p-0.5 flex items-center justify-center shadow-lg transition-all"
                style={{
                  background: `linear-gradient(135deg, ${currentConfig.info.accentColor || '#c8a84e'}, #3d2410)`,
                  boxShadow: `0 2px 10px ${currentConfig.info.accentColor || '#c8a84e'}44`,
                }}
              >
                <div className="w-full h-full bg-[#0a080d] rounded-[6px] flex items-center justify-center font-['Cinzel',serif] font-black text-[#f5ede0] text-sm">
                  W
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-['Cinzel',serif] font-bold text-sm text-[#f5ede0] tracking-wider block">
                  THE WITCHER 3 COMPLETO
                </span>
                <span className="text-[10px] text-[#8e8270] tracking-widest uppercase block -mt-0.5">
                  Jogo Base + Hearts of Stone + Blood & Wine
                </span>
              </div>
            </div>

            {/* Interactive Witcher Signs Bar */}
            <div className="flex items-center gap-1 sm:gap-2 bg-[#120f15] border border-[#2a221a] px-2 py-1 rounded-full shadow-inner">
              <span className="text-[10px] font-bold text-[#8a7f72] uppercase tracking-wider mr-1 hidden md:inline">
                Sinais:
              </span>
              {signs.map((sign) => {
                const IconComponent = sign.icon;
                const isSelected = activeSign === sign.name;

                return (
                  <button
                    key={sign.name}
                    onClick={() => setActiveSign(isSelected ? null : sign.name)}
                    title={`${sign.name}: ${sign.flavor}`}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                      isSelected ? 'shadow-lg' : 'text-[#8a7f72] hover:text-[#f0e6d6]'
                    }`}
                    style={{
                      color: isSelected ? sign.color : undefined,
                      backgroundColor: isSelected ? `${sign.color}22` : undefined,
                      boxShadow: isSelected ? `0 0 10px ${sign.color}66` : undefined,
                    }}
                  >
                    <IconComponent className="w-3 h-3" />
                    <span className="hidden sm:inline">{sign.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Global Total Mastery Pill */}
            <div className="flex items-center gap-2">
              <div
                className="px-3 py-1 rounded-full bg-[#18141b] border border-[#362b20] text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                title={`Progresso Geral da Franquia: ${totalMastery} de ${totalAvailable} Conquistas`}
              >
                <Award className="w-3.5 h-3.5 text-[#c8a84e]" />
                <span className="text-[#f5ede0] font-mono">
                  {totalMastery}/{totalAvailable}
                </span>
                <span className="text-[10px] text-[#c8a84e] font-bold hidden sm:inline">
                  ({grandPercentage}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Flavor Notification Bar (when clicked) */}
        {activeSign && (
          <div className="bg-[#141018] border-t border-[#292019] px-4 py-1 text-center text-xs text-[#c8a84e] animate-fade-in flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>
              <strong>Sinal {activeSign}:</strong>{' '}
              {signs.find((s) => s.name === activeSign)?.flavor}
            </span>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* ======================================================= */}
        {/* TOP LEVEL SELECTOR: JOGO BASE vs HEARTS OF STONE vs BLOOD AND WINE */}
        {/* ======================================================= */}
        <div className="mb-6 bg-[#100e13] border border-[#2e261e] p-2 rounded-2xl shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-2 text-xs font-semibold text-[#8a7f72] uppercase tracking-wider">
            <Layers className="w-4 h-4 text-[#c8a84e]" />
            <span>Selecione a Campanha / Nível:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 max-w-2xl">
            {/* Base Game Level */}
            <button
              onClick={() => {
                setActiveExpansion('base');
                setActiveTab('roadmap');
              }}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeExpansion === 'base'
                  ? 'bg-[#c8a84e] text-[#08070a] shadow-lg shadow-[#c8a84e]/20 scale-[1.02]'
                  : 'bg-[#151218] text-[#a49683] hover:bg-[#201a24] hover:text-[#f0e6d6] border border-[#33271c]'
              }`}
            >
              <span>🐺 Jogo Base</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded ${
                  activeExpansion === 'base'
                    ? 'bg-[#08070a]/20 text-[#08070a]'
                    : 'bg-[#241c14] text-[#c8a84e]'
                }`}
              >
                {baseCompletedTrophies.length}/53
              </span>
            </button>

            {/* Hearts of Stone Level */}
            <button
              onClick={() => {
                setActiveExpansion('hos');
                setActiveTab('roadmap');
              }}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeExpansion === 'hos'
                  ? 'bg-[#e67e22] text-[#08070a] shadow-lg shadow-[#e67e22]/20 scale-[1.02]'
                  : 'bg-[#151218] text-[#a49683] hover:bg-[#201a24] hover:text-[#f0e6d6] border border-[#33271c]'
              }`}
            >
              <span>🪓 Hearts of Stone</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded ${
                  activeExpansion === 'hos'
                    ? 'bg-[#08070a]/20 text-[#08070a]'
                    : 'bg-[#29160a] text-[#e67e22]'
                }`}
              >
                {hosCompletedTrophies.length}/13
              </span>
            </button>

            {/* Blood and Wine Level */}
            <button
              onClick={() => {
                setActiveExpansion('bw');
                setActiveTab('roadmap');
              }}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeExpansion === 'bw'
                  ? 'bg-[#c0392b] text-white shadow-lg shadow-[#c0392b]/30 scale-[1.02]'
                  : 'bg-[#151218] text-[#a49683] hover:bg-[#201a24] hover:text-[#f0e6d6] border border-[#33271c]'
              }`}
            >
              <span>🍷 Blood & Wine</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded ${
                  activeExpansion === 'bw'
                    ? 'bg-[#08070a]/30 text-white'
                    : 'bg-[#290d10] text-[#e74c3c]'
                }`}
              >
                {bwCompletedTrophies.length}/13
              </span>
            </button>
          </div>
        </div>

        {/* Hero Progress Banner for Selected Level */}
        <HeroProgress
          expansionInfo={currentConfig.info}
          trophies={currentConfig.trophies}
          completedTrophies={currentConfig.completedTrophies}
          onReset={handleOpenResetModal}
          onMarkAll={handleOpenMarkAllModal}
          onExport={handleExport}
          onImport={handleImport}
        />

        {/* Tab Navigation Menu for Active Level */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 mb-6 border-b border-[#26201a]">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'roadmap'
                ? 'shadow-lg'
                : 'bg-[#120f15] text-[#9c8e7e] hover:bg-[#1a1620] hover:text-[#f0e6d6] border border-[#2a221a]'
            }`}
            style={{
              backgroundColor: activeTab === 'roadmap' ? currentConfig.info.accentColor : undefined,
              color: activeTab === 'roadmap' ? '#08070a' : undefined,
            }}
          >
            <Compass className="w-4 h-4" />
            <span>🗺️ Roteiro Passo a Passo</span>
          </button>

          <button
            onClick={() => setActiveTab('trophies')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'trophies'
                ? 'shadow-lg'
                : 'bg-[#120f15] text-[#9c8e7e] hover:bg-[#1a1620] hover:text-[#f0e6d6] border border-[#2a221a]'
            }`}
            style={{
              backgroundColor: activeTab === 'trophies' ? currentConfig.info.accentColor : undefined,
              color: activeTab === 'trophies' ? '#08070a' : undefined,
            }}
          >
            <Trophy className="w-4 h-4" />
            <span>🏆 Todos os Troféus ({currentConfig.trophies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('missables')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'missables'
                ? 'bg-[#e74c3c] text-white shadow-lg shadow-[#e74c3c]/30'
                : 'bg-[#181012] text-[#e74c3c] hover:bg-[#251316] border border-[#4d1f22]'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>⚠️ Avisos & Perdíveis ({currentConfig.missables.length})</span>
          </button>

          {/* Jogo Base Exclusive Tabs */}
          {activeExpansion === 'base' && (
            <>
              <button
                onClick={() => setActiveTab('gwent')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === 'gwent'
                    ? 'bg-[#c8a84e] text-[#08070a] shadow-lg shadow-[#c8a84e]/20'
                    : 'bg-[#120f15] text-[#9c8e7e] hover:bg-[#1a1620] hover:text-[#f0e6d6] border border-[#2a221a]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>🃏 Gwent & Contratos</span>
              </button>

              <button
                onClick={() => setActiveTab('deathmarch')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === 'deathmarch'
                    ? 'bg-[#c8a84e] text-[#08070a] shadow-lg shadow-[#c8a84e]/20'
                    : 'bg-[#120f15] text-[#9c8e7e] hover:bg-[#1a1620] hover:text-[#f0e6d6] border border-[#2a221a]'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>⚔️ Marcha da Morte & Builds</span>
              </button>
            </>
          )}

          {/* DLC Exclusive Special Mechanics Tab */}
          {activeExpansion !== 'base' && (
            <button
              onClick={() => setActiveTab('special')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'special'
                  ? 'shadow-lg'
                  : 'bg-[#120f15] text-[#9c8e7e] hover:bg-[#1a1620] hover:text-[#f0e6d6] border border-[#2a221a]'
              }`}
              style={{
                backgroundColor: activeTab === 'special' ? currentConfig.info.accentColor : undefined,
                color: activeTab === 'special' ? (activeExpansion === 'bw' ? '#fff' : '#08070a') : undefined,
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {activeExpansion === 'hos'
                  ? '🔮 Encantador de Palavras & Gwent'
                  : '🍇 As 5 Virtudes, Corvo Bianco & Mutações'}
              </span>
            </button>
          )}
        </div>

        {/* Tab Content Display */}
        <div className="transition-all duration-300">
          {activeTab === 'roadmap' && (
            <RoadmapTab
              guideSteps={currentConfig.guideSteps}
              completedSteps={currentConfig.completedSteps}
              onToggleStep={handleToggleStep}
              onCompleteSection={handleCompleteSection}
              onToggleTrophy={handleToggleTrophy}
              completedTrophies={currentConfig.completedTrophies}
            />
          )}

          {activeTab === 'trophies' && (
            <TrophiesTab
              trophies={currentConfig.trophies}
              completedTrophies={currentConfig.completedTrophies}
              onToggleTrophy={handleToggleTrophy}
            />
          )}

          {activeTab === 'missables' && (
            <MissablesTab
              missables={currentConfig.missables}
              completedTrophies={currentConfig.completedTrophies}
              onToggleTrophy={handleToggleTrophy}
            />
          )}

          {activeTab === 'gwent' && activeExpansion === 'base' && (
            <GwentContractsTab
              completedContracts={completedContracts}
              onToggleContract={handleToggleContract}
              completedTrophies={baseCompletedTrophies}
              onToggleTrophy={handleToggleTrophy}
            />
          )}

          {activeTab === 'deathmarch' && activeExpansion === 'base' && (
            <DeathMarchTab
              completedTrophies={baseCompletedTrophies}
              onToggleTrophy={handleToggleTrophy}
            />
          )}

          {activeTab === 'special' && activeExpansion !== 'base' && (
            <DlcSpecialTab activeExpansion={activeExpansion} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#26201a] bg-[#09070c] py-10 text-center text-xs text-[#7e7364]">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="font-['Cinzel',serif] text-sm font-bold text-[#c8a84e]">
              THE WITCHER 3: WILD HUNT
            </span>
            <span>•</span>
            <span>Jogo Base & Expansões (Hearts of Stone & Blood and Wine)</span>
          </div>
          <p className="max-w-xl mx-auto leading-relaxed">
            Desenvolvido com inspiração nos dados e roteiro do renomado guia da{' '}
            <a
              href="https://www.gameblast.com.br/2015/06/the-witcher-3-guia-trofeus-conquistas.html"
              target="_blank"
              rel="noreferrer"
              className="text-[#c8a84e] underline hover:text-[#f3ede2]"
            >
              GameBlast
            </a>
            . Todos os 79 troféus e checkpoints salvos automaticamente no seu navegador.
          </p>
          <p className="text-[11px] text-[#5c5244]">
            "Se tenho de escolher entre um mal e outro, prefiro não escolher nenhum." — Geralt de Rívia
          </p>
        </div>
      </footer>

      {/* Confirmation Modal */}
      <ResetModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        confirmText={modalState.confirmText}
        onConfirm={modalState.onConfirm}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
