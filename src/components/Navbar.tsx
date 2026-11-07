import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Heart, 
  Scale, 
  Menu, 
  X, 
  DollarSign,
  ChevronRight,
  Bell
} from 'lucide-react';
import { VehicleCategory } from '../types/vehicle';

interface NavbarProps {
  activeTab: 'home' | VehicleCategory | 'catalogo' | 'mercado';
  onSelectTab: (tab: 'home' | VehicleCategory | 'catalogo' | 'mercado') => void;
  favoritesCount: number;
  comparisonCount: number;
  notificationsCount: number;
  onOpenFavorites: () => void;
  onOpenComparison: () => void;
  onOpenNotifications: () => void;
  onOpenQuote: () => void;
  currency: 'BRL' | 'USD';
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  favoritesCount,
  comparisonCount,
  notificationsCount,
  onOpenFavorites,
  onOpenComparison,
  onOpenNotifications,
  onOpenQuote,
  currency,
  onToggleCurrency,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: 'home' | VehicleCategory | 'catalogo' | 'mercado'; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'carros', label: 'CARROS' },
    { id: 'motos', label: 'MOTOS' },
    { id: 'caminhoes', label: 'CAMINHÕES' },
    { id: 'barcos', label: 'BARCOS' },
    { id: 'tanques', label: 'TANQUES' },
    { id: 'catalogo', label: 'CATÁLOGO' },
    { id: 'mercado', label: 'MERCADO' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#08080A]/95 backdrop-blur-md border-b border-[#1E1E26] py-3.5 shadow-2xl shadow-black/80' 
          : 'bg-gradient-to-b from-[#08080A]/90 to-transparent border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Wordmark Logo */}
          <button 
            onClick={() => { onSelectTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E50914]"
            aria-label="VORTEX DYNAMICS Home"
          >
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#E50914] to-[#990008] flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-lg shadow-[#E50914]/25 group-hover:scale-105 transition-transform">
              VX
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5 leading-none">
                VORTEX<span className="text-[#E50914]">DYNAMICS</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-neutral-400 font-mono-num leading-tight mt-0.5">
                VEÍCULOS & MÁQUINAS
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (single-line, active highlighted in red) */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap focus-visible:outline-none ${
                    isActive
                      ? 'text-[#E50914]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#E50914] rounded-full shadow-[0_0_8px_#E50914]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Action Controls */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#121217] border border-[#23232C] text-xs font-mono-num text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              title="Alternar Moeda (BRL / USD)"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#E50914]" />
              <span className="font-semibold">{currency}</span>
            </button>

            {/* Comparador Button */}
            <button
              onClick={onOpenComparison}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                comparisonCount > 0
                  ? 'bg-[#181822] border-[#E50914]/60 text-white shadow-sm shadow-[#E50914]/20'
                  : 'bg-[#121217] border-[#23232C] text-neutral-300 hover:text-white hover:border-neutral-700'
              }`}
              title="Comparador de Veículos"
            >
              <Scale className="w-3.5 h-3.5 text-[#E50914]" />
              <span className="hidden md:inline">Comparar</span>
              {comparisonCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#E50914] text-white text-[10px] font-bold flex items-center justify-center font-mono-num">
                  {comparisonCount}
                </span>
              )}
            </button>

            {/* Favoritos Button */}
            <button
              onClick={onOpenFavorites}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                favoritesCount > 0
                  ? 'bg-[#181822] border-[#E50914]/60 text-white'
                  : 'bg-[#121217] border-[#23232C] text-neutral-300 hover:text-white hover:border-neutral-700'
              }`}
              title="Meus Veículos Salvos"
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'text-[#E50914] fill-[#E50914]' : 'text-neutral-400'}`} />
              <span className="hidden md:inline">Salvos</span>
              {favoritesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#E50914] text-white text-[10px] font-bold flex items-center justify-center font-mono-num">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Notification Bell Button */}
            <button
              onClick={onOpenNotifications}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                notificationsCount > 0
                  ? 'bg-[#181822] border-[#E50914]/70 text-white shadow-sm shadow-[#E50914]/20'
                  : 'bg-[#121217] border-[#23232C] text-neutral-300 hover:text-white hover:border-neutral-700'
              }`}
              title="Alertas & Quedas de Preço"
            >
              <Bell className={`w-3.5 h-3.5 ${notificationsCount > 0 ? 'text-[#E50914]' : 'text-neutral-400'}`} />
              <span className="hidden md:inline">Alertas</span>
              {notificationsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#E50914] text-white text-[10px] font-bold flex items-center justify-center font-mono-num animate-pulse">
                  {notificationsCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: Solicitar Cotação */}
            <button
              onClick={onOpenQuote}
              className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#c90812] active:scale-[0.98] transition-all shadow-md shadow-[#E50914]/25 whitespace-nowrap shrink-0"
            >
              Solicitar Cotação
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded bg-[#121217] border border-[#23232C] text-neutral-300"
              aria-label="Ver Alertas de Preço"
            >
              <Bell className={`w-4 h-4 ${notificationsCount > 0 ? 'text-[#E50914]' : 'text-neutral-400'}`} />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E50914] text-white text-[9px] font-bold flex items-center justify-center font-mono-num">
                  {notificationsCount}
                </span>
              )}
            </button>
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded bg-[#121217] border border-[#23232C] text-neutral-300"
              aria-label="Ver Favoritos"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-[#E50914] fill-[#E50914]' : 'text-neutral-400'}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E50914] text-white text-[9px] font-bold flex items-center justify-center font-mono-num">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-[#121217] border border-[#23232C] text-neutral-300 hover:text-white"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0A0E] border-b border-[#23232C] px-4 pt-3 pb-6 mt-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isActive 
                      ? 'bg-[#E50914]/15 text-[#E50914] border border-[#E50914]/40 font-bold' 
                      : 'bg-[#121217] text-neutral-300 hover:text-white border border-[#23232C]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2.5 pt-3 border-t border-[#1C1C24]">
            <div className="flex items-center justify-between">
              <button
                onClick={onToggleCurrency}
                className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#14141A] border border-[#23232C] text-xs font-mono-num text-neutral-200"
              >
                <DollarSign className="w-3.5 h-3.5 text-[#E50914]" />
                Moeda: <span className="font-bold text-white">{currency}</span>
              </button>

              <button
                onClick={() => { onOpenComparison(); setMobileMenuOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#14141A] border border-[#23232C] text-xs font-medium text-neutral-200"
              >
                <Scale className="w-3.5 h-3.5 text-[#E50914]" />
                Comparar ({comparisonCount})
              </button>
            </div>

            <button
              onClick={() => { onOpenQuote(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#c90812] transition-colors shadow-lg shadow-[#E50914]/25 text-center mt-1"
            >
              Solicitar Cotação de Mercado
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
