import React from 'react';
import { Smartphone, X, Check, Apple } from 'lucide-react';

export default function InstallModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#131015] border-2 border-[#544331] rounded-2xl p-6 shadow-2xl text-[#f3ede2]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#8a7e6e] hover:text-[#f3ede2] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#271f16] border border-[#594228] flex items-center justify-center text-[#c8a84e] shadow-lg shadow-[#c8a84e]/20">
            <Smartphone className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-['Cinzel',serif] text-[#f5ede0]">
              Instalar Aplicativo (PWA)
            </h3>
            <span className="text-xs text-[#a89b88]">
              Funciona offline sem ocupar espaço
            </span>
          </div>
        </div>

        <p className="text-xs text-[#c9baa9] leading-relaxed mb-4">
          Este guia é um <strong>Progressive Web App (PWA)</strong>. Você pode instalá-lo no seu celular como se fosse um aplicativo nativo da Play Store, com ícone próprio na tela inicial e acesso rápido em tela cheia!
        </p>

        <div className="space-y-3 mb-6">
          {/* Android instructions */}
          <div className="p-3.5 bg-[#18141b] border border-[#3b2e21] rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#c8a84e]">
              <span>🤖 No Android (Google Chrome / Brave)</span>
            </div>
            <ol className="text-xs text-[#b8a998] space-y-1 list-decimal list-inside leading-relaxed">
              <li>Toque no menu de <strong>três pontinhos (⋮)</strong> no canto superior do navegador.</li>
              <li>Selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.</li>
              <li>Confirme em <strong>"Instalar"</strong>. Pronto!</li>
            </ol>
          </div>

          {/* iOS instructions */}
          <div className="p-3.5 bg-[#18141b] border border-[#3b2e21] rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#68d8d6]">
              <Apple className="w-3.5 h-3.5" /> No iPhone / iPad (Safari)
            </div>
            <ol className="text-xs text-[#b8a998] space-y-1 list-decimal list-inside leading-relaxed">
              <li>Abra esta página no <strong>Safari</strong>.</li>
              <li>Toque no botão de <strong>Compartilhar</strong> (quadrado com seta para cima).</li>
              <li>Role para baixo e selecione <strong>"Adicionar à Tela de Início"</strong>.</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg text-xs font-bold bg-[#c8a84e] hover:bg-[#e0c878] text-[#08070a] shadow-lg shadow-[#c8a84e]/20 transition-all"
          >
            Entendido!
          </button>
        </div>
      </div>
    </div>
  );
}
