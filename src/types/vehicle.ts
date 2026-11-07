export type VehicleCategory = 'carros' | 'motos' | 'caminhoes' | 'barcos' | 'tanques';

export interface VehicleSpecs {
  power: string;           // e.g. "1.000 cv"
  acceleration: string;    // e.g. "0-100 em 2.5s" or "3.700 Nm"
  topSpeed: string;        // e.g. "340 km/h" or "42 nós"
  engine: string;         // e.g. "4.0L V8 Twin-Turbo + 3 Motores Elétricos"
  transmission: string;   // e.g. "F1 Dual-Clutch 8 Marchas"
  weight: string;         // e.g. "1.570 kg"
  fuelCapacity?: string;  // e.g. "68 Litros"
  armor?: string;         // For tanks: e.g. "Composto Chobham + NERA"
  caliber?: string;       // For tanks: e.g. "120mm L/55A1 Rheinmetall"
  length?: string;        // For boats: e.g. "26.90 metros (88 pés)"
  payloadCapacity?: string; // For trucks: e.g. "Capacidade PBTC 120 Toneladas"
  autonomy: string;       // e.g. "550 km" or "380 milhas náuticas"
}

export interface MarketMetrics {
  appreciationIndex: string;  // e.g. "+12.4% nos últimos 24 meses"
  unitsProduced: string;      // e.g. "Produção limitada a 499 unidades"
  deliveryTime: string;       // e.g. "Pronta Entrega / Importação 40 dias"
  maintenanceIndex: string;   // e.g. "Rede Especializada Exclusiva"
  certification: string;      // e.g. "Certificação FIA GT / Homologação Civil"
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  categoryLabel: string;
  year: number;
  priceBRL: number;
  priceUSD: number;
  image: string;
  gallery: string[];
  badge?: string;
  tagline: string;
  description: string;
  specs: VehicleSpecs;
  metrics: MarketMetrics;
  features: string[];
  performanceScore: {
    power: number;       // 1 - 100
    handling: number;    // 1 - 100
    technology: number;  // 1 - 100
    exclusivity: number; // 1 - 100
  };
}

export interface FilterState {
  category: VehicleCategory | 'todas';
  brand: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'power-desc' | 'year-desc';
}
