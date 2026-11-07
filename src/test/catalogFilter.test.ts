import { describe, it, expect } from 'vitest';
import { VEHICLE_DATABASE } from '../data/vehicles';
import { Vehicle, VehicleCategory, FilterState } from '../types/vehicle';

export function filterAndSortVehicles(
  vehicles: Vehicle[],
  options: {
    category: VehicleCategory | 'todas';
    brand: string;
    searchTerm: string;
    sortBy: FilterState['sortBy'];
    favoritesOnly?: boolean;
    favorites?: string[];
  }
): Vehicle[] {
  const { category, brand, searchTerm, sortBy, favoritesOnly = false, favorites = [] } = options;

  return vehicles
    .filter((v) => {
      if (favoritesOnly && !favorites.includes(v.id)) return false;
      if (category !== 'todas' && v.category !== category) return false;
      if (brand !== 'todas' && v.brand !== brand) return false;

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
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceBRL - b.priceBRL;
      if (sortBy === 'price-desc') return b.priceBRL - a.priceBRL;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'power-desc') {
        const pA = parseInt(a.specs.power.replace(/\D/g, '') || '0', 10);
        const pB = parseInt(b.specs.power.replace(/\D/g, '') || '0', 10);
        return pB - pA;
      }
      return 0;
    });
}

describe('Catalog Filtering & Sorting System', () => {
  it('returns all vehicles when filters are set to default', () => {
    const results = filterAndSortVehicles(VEHICLE_DATABASE, {
      category: 'todas',
      brand: 'todas',
      searchTerm: '',
      sortBy: 'relevance',
    });
    expect(results.length).toBe(VEHICLE_DATABASE.length);
  });

  it('filters vehicles by category accurately', () => {
    const cars = filterAndSortVehicles(VEHICLE_DATABASE, {
      category: 'carros',
      brand: 'todas',
      searchTerm: '',
      sortBy: 'relevance',
    });
    expect(cars.every((v) => v.category === 'carros')).toBe(true);
    expect(cars.length).toBeGreaterThan(0);

    const tanks = filterAndSortVehicles(VEHICLE_DATABASE, {
      category: 'tanques',
      brand: 'todas',
      searchTerm: '',
      sortBy: 'relevance',
    });
    expect(tanks.every((v) => v.category === 'tanques')).toBe(true);
    expect(tanks.length).toBeGreaterThan(0);

    const boats = filterAndSortVehicles(VEHICLE_DATABASE, {
      category: 'barcos',
      brand: 'todas',
      searchTerm: '',
      sortBy: 'relevance',
    });
    expect(boats.every((v) => v.category === 'barcos')).toBe(true);
  });

  it('filters vehicles by brand', () => {
    const porscheVehicles = filterAndSortVehicles(VEHICLE_DATABASE, {
      category: 'todas',
      brand: 'Porsche',
      searchTerm: '',
      sortBy: 'relevance',
    });
    expect(porscheVehicles.length).toBeGreaterThan(0);
    expect(porscheVehicles.every((v) => v.brand === 'Porsche')).toBe(true);
  });

  it('searches across name, model, and engine specifications', () => {
    // Search by engine term 'V12'
    const v12Results = filterAndSortVehicles(VEHICLE_DATABASE, {
      category: 'todas',
      brand: 'todas',
      searchTerm: 'V12',
      sortBy: 'relevance',
    });
    expect(v12Results.length).toBeGreaterThan(0);
    expect(
      v12Results.some(
        (v) =>
          v.name.includes('V12') ||
          v.specs.engine.includes('V12') ||
          v.model.includes('V12')
      )
    ).toBe(true);

    // Search by model name 'Leopard'
    const leopardResults = filterAndSortVehicles(VEHICLE_DATABASE, {
      category: 'todas',
      brand: 'todas',
      searchTerm: 'Leopard',
      sortBy: 'relevance',
    });
    expect(leopardResults.length).toBe(1);
    expect(leopardResults[0].id).toBe('tank-leopard-2a7');
  });

  it('sorts vehicles by price in ascending and descending order', () => {
    const priceAsc = filterAndSortVehicles(VEHICLE_DATABASE, {
      category: 'todas',
      brand: 'todas',
      searchTerm: '',
      sortBy: 'price-asc',
    });
    for (let i = 0; i < priceAsc.length - 1; i++) {
      expect(priceAsc[i].priceBRL).toBeLessThanOrEqual(priceAsc[i + 1].priceBRL);
    }

    const priceDesc = filterAndSortVehicles(VEHICLE_DATABASE, {
      category: 'todas',
      brand: 'todas',
      searchTerm: '',
      sortBy: 'price-desc',
    });
    for (let i = 0; i < priceDesc.length - 1; i++) {
      expect(priceDesc[i].priceBRL).toBeGreaterThanOrEqual(priceDesc[i + 1].priceBRL);
    }
  });

  it('filters only favorites when favoritesOnly is enabled', () => {
    const favoriteIds = ['car-sf90-stradale', 'tank-leopard-2a7'];
    const favorites = filterAndSortVehicles(VEHICLE_DATABASE, {
      category: 'todas',
      brand: 'todas',
      searchTerm: '',
      sortBy: 'relevance',
      favoritesOnly: true,
      favorites: favoriteIds,
    });

    expect(favorites.length).toBe(2);
    expect(favorites.map((v) => v.id)).toEqual(expect.arrayContaining(favoriteIds));
  });
});
