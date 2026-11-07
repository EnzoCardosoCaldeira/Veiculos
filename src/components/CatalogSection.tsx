import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  ArrowUpDown,
  Car,
  Flame,
  Truck,
  Anchor,
  Shield,
  Layers
} from 'lucide-react';
import { Vehicle, VehicleCategory, FilterState } from '../types/vehicle';
import { VehicleCard } from './VehicleCard';

interface CatalogSectionProps {
  vehicles: Vehicle[];
  activeCategory: VehicleCategory | 'todas';
  onCategoryChange: (cat: VehicleCategory | 'todas') => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  comparisonList: Vehicle[];
  onToggleComparison: (vehicle: Vehicle) => void;
  onOpenPriceAlert: (vehicle: Vehicle) => void;
  activeAlertVehicleIds?: string[];
  currency: 'BRL' | 'USD';
  showFavoritesOnly?: boolean;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  vehicles,
  activeCategory,
  onCategoryChange,
  onSelectVehicle,
  favorites,
  onToggleFavorite,
  comparisonList,
  onToggleComparison,
  onOpenPriceAlert,
  activeAlertVehicleIds = [],
  currency,
  showFavoritesOnly = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('todas');
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('relevance');

  // Extract unique brands based on current category
  const availableBrands = useMemo(() => {
    const list = activeCategory === 'todas'
      ? vehicles
      : vehicles.filter((v) => v.category === activeCategory);
    const brands = Array.from(new Set(list.map((v) => v.brand)));
    return ['todas', ...brands.sort()];
  }, [vehicles, activeCategory]);

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Favorite filter if requested
      if (showFavoritesOnly && !favorites.includes(v.id)) return false;

      // Category filter
      if (activeCategory !== 'todas' && v.category !== activeCategory) return false;

      // Brand filter
      if (selectedBrand !== 'todas' && v.brand !== selectedBrand) return false;

      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = v.name.toLowerCase().includes(query);
        const matchesBrand = v.brand.toLowerCase().includes(query);
        const matchesModel = v.model.toLowerCase().includes(query);
        const matchesTagline = v.tagline.toLowerCase().includes(query);
        const matchesEngine = v.specs.engine.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesModel && !matchesTagline && !matchesEngine) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceBRL - b.priceBRL;
      if (sortBy === 'price-desc') return b.priceBRL - a.priceBRL;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'power-desc') {
        const pA = parseInt(a.specs.power.replace(/\D/g, '') || '0', 10);
        const pB = parseInt(b.specs.power.replace(/\D/g, '') || '0', 10);
        return pB - pA;
      }
      return 0; // relevance / default order
    });
  }, [vehicles, activeCategory, selectedBrand, searchTerm, sortBy, showFavoritesOnly, favorites]);

  const categories: { id: VehicleCategory | 'todas'; label: string; icon: React.ReactNode }[] = [
    { id: 'todas', label: 'Todas as Máquinas', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'carros', label: 'Carros', icon: <Car className="w-3.5 h-3.5" /> },
    { id: 'motos', label: 'Motos', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'caminhoes', label: 'Caminhões', icon: <Truck className="w-3.5 h-3.5" /> },
    { id: 'barcos', label: 'Barcos', icon: <Anchor className="w-3.5 h-3.5" /> },
    { id: 'tanques', label: 'Tanques', icon: <Shield className="w-3.5 h-3.5" /> },
  ];

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('todas');
    setSortBy('relevance');
    onCategoryChange('todas');
  };

  return (
    <section id="catalogo" className="py-16 bg-[#08080A] min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Kicker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-num font-semibold uppercase tracking-wider text-[#E50914] mb-2">
              <span>EXPLORAÇÃO DO ACERVO</span>
              <span aria-hidden="true" className="text-neutral-600">/</span>
              <span className="text-neutral-400">
                {showFavoritesOnly ? 'VEÍCULOS SALVOS' : 'INVENTÁRIO ATIVO'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {showFavoritesOnly ? 'MEUS VEÍCULOS FAVORITOS' : 'CATÁLOGO DE MÁQUINAS'}
            </h2>
          </div>

          <div className="text-xs text-neutral-400 font-mono-num">
            Exibindo <span className="text-[#E50914] font-bold">{filteredVehicles.length}</span> veículos de alta tecnologia
          </div>
        </div>

        {/* Category Segmented Tabs (Interactive Filter Controls) */}
        {!showFavoritesOnly && (
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onCategoryChange(cat.id);
                    setSelectedBrand('todas');
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-[#E50914] border-[#E50914] text-white shadow-lg shadow-[#E50914]/20'
                      : 'bg-[#111116] border-[#22222D] text-neutral-400 hover:text-white hover:border-[#333342]'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Filter Toolbar: Search, Brand Dropdown, Sort */}
        <div className="p-4 rounded-xl bg-[#101015] border border-[#20202B] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por fabricante, modelo, motor..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0A0A0E] border border-[#22222E] focus:border-[#E50914] text-white text-xs placeholder:text-neutral-500 focus:outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Brand Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0E] border border-[#22222E] focus:border-[#E50914] text-neutral-200 text-xs focus:outline-none transition-colors cursor-pointer"
              >
                <option value="todas">Todos os Fabricantes</option>
                {availableBrands.filter(b => b !== 'todas').map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as FilterState['sortBy'])}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0E] border border-[#22222E] focus:border-[#E50914] text-neutral-200 text-xs focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="relevance">Ordenar: Destaques</option>
                  <option value="power-desc">Maior Potência</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="year-desc">Ano mais recente</option>
                </select>
              </div>
            </div>

            {/* Reset Filters */}
            <div className="md:col-span-1 flex items-center justify-end">
              <button
                onClick={handleResetFilters}
                title="Limpar todos os filtros"
                className="w-full h-full min-h-[38px] flex items-center justify-center rounded-lg bg-[#15151D] hover:bg-[#1E1E28] border border-[#22222E] text-neutral-400 hover:text-white text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredVehicles.length === 0 ? (
          <div className="py-20 text-center rounded-xl bg-[#0D0D12] border border-[#1E1E28] p-8">
            <div className="w-12 h-12 rounded-full bg-[#181822] text-[#E50914] mx-auto flex items-center justify-center mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Nenhuma máquina encontrada
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
              Nenhum veículo corresponde aos filtros selecionados. Tente ajustar os termos de pesquisa ou resetar os filtros.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Restaurar Catálogo Completo
            </button>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={onSelectVehicle}
                isFavorite={favorites.includes(vehicle.id)}
                onToggleFavorite={onToggleFavorite}
                isInComparison={comparisonList.some((c) => c.id === vehicle.id)}
                onToggleComparison={onToggleComparison}
                onOpenPriceAlert={onOpenPriceAlert}
                hasActiveAlert={activeAlertVehicleIds.includes(vehicle.id)}
                currency={currency}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
