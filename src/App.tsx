/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VEHICLE_DATABASE } from './data/vehicles';
import { Vehicle, VehicleCategory } from './types/vehicle';
import { PriceAlert, AppNotification } from './types/notification';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { CategoryHeroBanner } from './components/CategoryHeroBanner';
import { CatalogSection } from './components/CatalogSection';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { VehicleComparatorModal } from './components/VehicleComparatorModal';
import { MarketInsights } from './components/MarketInsights';
import { DifferentialsSection } from './components/DifferentialsSection';
import { QuoteContactModal } from './components/QuoteContactModal';
import { PriceAlertModal } from './components/PriceAlertModal';
import { NotificationCenter } from './components/NotificationCenter';
import { ToastNotification } from './components/ToastNotification';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | VehicleCategory | 'catalogo' | 'mercado'>('home');
  const [currency, setCurrency] = useState<'BRL' | 'USD'>('BRL');
  
  // Favorites system with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vortex_favorites');
      return saved ? JSON.parse(saved) : ['car-sf90-stradale', 'tank-leopard-2a7'];
    } catch {
      return ['car-sf90-stradale', 'tank-leopard-2a7'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vortex_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Falha ao salvar favoritos no localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Price Alerts & Notification Subscriptions
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(() => {
    try {
      const saved = localStorage.getItem('vortex_price_alerts');
      return saved ? JSON.parse(saved) : [
        {
          id: 'alert-sample-1',
          vehicleId: 'car-sf90-stradale',
          vehicleName: 'Ferrari SF90 Stradale Carbon',
          vehicleImage: '/src/assets/images/hero_apex_hypercar_1794059188468.jpg',
          currentPrice: 7400000,
          targetPrice: 7030000,
          email: 'investidor@vortex.com',
          notifyEmail: true,
          notifyToast: true,
          createdAt: 'Hoje',
          status: 'active'
        }
      ];
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('vortex_notifications');
      return saved ? JSON.parse(saved) : [
        {
          id: 'notif-sample-1',
          vehicleId: 'car-sf90-stradale',
          vehicleName: 'Ferrari SF90 Stradale Carbon',
          vehicleImage: '/src/assets/images/hero_apex_hypercar_1794059188468.jpg',
          oldPrice: 7400000,
          newPrice: 6990000,
          discountPercentage: 5.5,
          type: 'price_drop',
          title: 'Oportunidade de Mercado',
          message: 'O valor da Ferrari SF90 Stradale foi reduzido em R$ 410.000 para pronta entrega homologada.',
          timestamp: 'Há 12 min',
          read: false
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeToasts, setActiveToasts] = useState<AppNotification[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('vortex_price_alerts', JSON.stringify(priceAlerts));
    } catch (e) {
      console.warn('Falha ao salvar alertas no localStorage', e);
    }
  }, [priceAlerts]);

  useEffect(() => {
    try {
      localStorage.setItem('vortex_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Falha ao salvar notificações no localStorage', e);
    }
  }, [notifications]);

  // Comparison system (up to 3 vehicles)
  const [comparisonList, setComparisonList] = useState<Vehicle[]>(() => [
    VEHICLE_DATABASE[0], // Ferrari SF90
    VEHICLE_DATABASE[1], // Porsche 911 GT3 RS
  ]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const toggleComparison = (vehicle: Vehicle) => {
    setComparisonList((prev) => {
      const exists = prev.some((v) => v.id === vehicle.id);
      if (exists) {
        return prev.filter((v) => v.id !== vehicle.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), vehicle];
      }
      return [...prev, vehicle];
    });
  };

  const removeFromComparison = (id: string) => {
    setComparisonList((prev) => prev.filter((v) => v.id !== id));
  };

  // Modals state
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quotePrefillVehicle, setQuotePrefillVehicle] = useState<Vehicle | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Notification center & Price alert modal states
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isPriceAlertModalOpen, setIsPriceAlertModalOpen] = useState(false);
  const [alertTargetVehicle, setAlertTargetVehicle] = useState<Vehicle | null>(null);

  // Tab navigation handler
  const handleSelectTab = (tab: 'home' | VehicleCategory | 'catalogo' | 'mercado') => {
    setActiveTab(tab);
    setShowFavoritesOnly(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct category selection
  const handleSelectCategory = (cat: VehicleCategory) => {
    setActiveTab(cat);
    setShowFavoritesOnly(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFavorites = () => {
    setShowFavoritesOnly(true);
    setActiveTab('catalogo');
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuoteWithVehicle = (vehicle: Vehicle) => {
    setQuotePrefillVehicle(vehicle);
    setIsQuoteOpen(true);
  };

  const handleOpenPriceAlert = (vehicle: Vehicle) => {
    setAlertTargetVehicle(vehicle);
    setIsPriceAlertModalOpen(true);
  };

  const handleExploreCatalog = () => {
    setActiveTab('catalogo');
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Subscribe to Price Alert
  const handleSubscribeAlert = (alertData: Omit<PriceAlert, 'id' | 'createdAt' | 'status'>) => {
    const newAlert: PriceAlert = {
      ...alertData,
      id: `alert-${Date.now()}`,
      createdAt: 'Agora',
      status: 'active'
    };
    setPriceAlerts((prev) => [newAlert, ...prev.filter(a => a.vehicleId !== alertData.vehicleId)]);
  };

  // Trigger Simulated Price Drop
  const handleSimulatePriceDrop = (vehicle: Vehicle, dropPercent: number = 5) => {
    const oldPrice = vehicle.priceBRL;
    const newPrice = Math.round(oldPrice * (1 - dropPercent / 100));
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      vehicleImage: vehicle.image,
      oldPrice,
      newPrice,
      discountPercentage: dropPercent,
      type: 'price_drop',
      title: `Queda de Preço: ${vehicle.name}`,
      message: `O valor de referência foi reduzido em ${dropPercent}% para fechamento imediato.`,
      timestamp: 'Agora mesmo',
      read: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setActiveToasts((prev) => [newNotif, ...prev]);

    // Automatically dismiss toast after 8 seconds
    setTimeout(() => {
      setActiveToasts((prev) => prev.filter(t => t.id !== newNotif.id));
    }, 8000);
  };

  // Trigger Random Price Drop Test from Notification Center
  const handleTriggerRandomPriceDrop = () => {
    const randomIndex = Math.floor(Math.random() * VEHICLE_DATABASE.length);
    const target = VEHICLE_DATABASE[randomIndex];
    const discount = [5, 8, 10, 12][Math.floor(Math.random() * 4)];
    handleSimulatePriceDrop(target, discount);
  };

  const handleDismissToast = (id: string) => {
    setActiveToasts((prev) => prev.filter(t => t.id !== id));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleRemovePriceAlert = (alertId: string) => {
    setPriceAlerts((prev) => prev.filter(a => a.id !== alertId));
  };

  const handleSelectVehicleById = (vehicleId: string) => {
    const found = VEHICLE_DATABASE.find(v => v.id === vehicleId);
    if (found) {
      setSelectedVehicle(found);
    }
  };

  const activeAlertVehicleIds = priceAlerts.map(a => a.vehicleId);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const isSpecificCategory = ['carros', 'motos', 'caminhoes', 'barcos', 'tanques'].includes(activeTab);

  return (
    <div className="min-h-screen bg-[#08080A] text-[#E2E8F0] flex flex-col selection:bg-[#E50914] selection:text-white">
      {/* Fixed Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        favoritesCount={favorites.length}
        comparisonCount={comparisonList.length}
        notificationsCount={unreadNotificationsCount}
        onOpenFavorites={handleOpenFavorites}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenNotifications={() => setIsNotificationCenterOpen(true)}
        onOpenQuote={() => {
          setQuotePrefillVehicle(null);
          setIsQuoteOpen(true);
        }}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'BRL' ? 'USD' : 'BRL'))}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {/* VIEW 1: HOME */}
        {activeTab === 'home' && (
          <>
            <HeroSection
              onExploreCatalog={handleExploreCatalog}
              onSelectCategory={handleSelectCategory}
              onOpenQuote={() => {
                setQuotePrefillVehicle(null);
                setIsQuoteOpen(true);
              }}
            />

            <CategoryShowcase
              onSelectCategory={handleSelectCategory}
              activeCategory="todas"
            />

            <CatalogSection
              vehicles={VEHICLE_DATABASE}
              activeCategory="todas"
              onCategoryChange={(cat) => {
                if (cat !== 'todas') {
                  handleSelectCategory(cat);
                }
              }}
              onSelectVehicle={(v) => setSelectedVehicle(v)}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              comparisonList={comparisonList}
              onToggleComparison={toggleComparison}
              onOpenPriceAlert={handleOpenPriceAlert}
              activeAlertVehicleIds={activeAlertVehicleIds}
              currency={currency}
              showFavoritesOnly={showFavoritesOnly}
            />

            <MarketInsights
              onSelectCategory={handleSelectCategory}
              onOpenQuote={() => {
                setQuotePrefillVehicle(null);
                setIsQuoteOpen(true);
              }}
            />

            <DifferentialsSection
              onOpenQuote={() => {
                setQuotePrefillVehicle(null);
                setIsQuoteOpen(true);
              }}
            />
          </>
        )}

        {/* VIEW 2: SPECIFIC CATEGORY (Carros, Motos, Caminhões, Barcos, Tanques) */}
        {isSpecificCategory && (
          <>
            <CategoryHeroBanner
              category={activeTab as VehicleCategory}
              onBackToHome={() => handleSelectTab('home')}
              currency={currency}
            />

            <CatalogSection
              vehicles={VEHICLE_DATABASE}
              activeCategory={activeTab as VehicleCategory}
              onCategoryChange={(cat) => {
                if (cat === 'todas') {
                  handleSelectTab('catalogo');
                } else {
                  handleSelectCategory(cat);
                }
              }}
              onSelectVehicle={(v) => setSelectedVehicle(v)}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              comparisonList={comparisonList}
              onToggleComparison={toggleComparison}
              onOpenPriceAlert={handleOpenPriceAlert}
              activeAlertVehicleIds={activeAlertVehicleIds}
              currency={currency}
              showFavoritesOnly={showFavoritesOnly}
            />

            <MarketInsights
              onSelectCategory={handleSelectCategory}
              onOpenQuote={() => {
                setQuotePrefillVehicle(null);
                setIsQuoteOpen(true);
              }}
            />
          </>
        )}

        {/* VIEW 3: FULL CATALOG */}
        {activeTab === 'catalogo' && (
          <div className="pt-20">
            <CatalogSection
              vehicles={VEHICLE_DATABASE}
              activeCategory="todas"
              onCategoryChange={(cat) => {
                if (cat !== 'todas') {
                  handleSelectCategory(cat);
                }
              }}
              onSelectVehicle={(v) => setSelectedVehicle(v)}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              comparisonList={comparisonList}
              onToggleComparison={toggleComparison}
              onOpenPriceAlert={handleOpenPriceAlert}
              activeAlertVehicleIds={activeAlertVehicleIds}
              currency={currency}
              showFavoritesOnly={showFavoritesOnly}
            />
          </div>
        )}

        {/* VIEW 4: MERCADO */}
        {activeTab === 'mercado' && (
          <div className="pt-20">
            <MarketInsights
              onSelectCategory={handleSelectCategory}
              onOpenQuote={() => {
                setQuotePrefillVehicle(null);
                setIsQuoteOpen(true);
              }}
            />
            <DifferentialsSection
              onOpenQuote={() => {
                setQuotePrefillVehicle(null);
                setIsQuoteOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(target) => {
          if (target === 'home' || target === 'catalogo' || target === 'mercado') {
            handleSelectTab(target);
          } else {
            handleSelectCategory(target);
          }
        }}
        onOpenQuote={() => {
          setQuotePrefillVehicle(null);
          setIsQuoteOpen(true);
        }}
      />

      {/* Modal 1: Vehicle Technical Details Sheet */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        isFavorite={selectedVehicle ? favorites.includes(selectedVehicle.id) : false}
        onToggleFavorite={toggleFavorite}
        isInComparison={selectedVehicle ? comparisonList.some((c) => c.id === selectedVehicle.id) : false}
        onToggleComparison={toggleComparison}
        onOpenQuoteWithVehicle={handleOpenQuoteWithVehicle}
        onOpenPriceAlert={handleOpenPriceAlert}
        hasActiveAlert={selectedVehicle ? activeAlertVehicleIds.includes(selectedVehicle.id) : false}
        currency={currency}
      />

      {/* Modal 2: Multi-Vehicle Comparator */}
      {isComparisonOpen && (
        <VehicleComparatorModal
          vehicles={comparisonList}
          onClose={() => setIsComparisonOpen(false)}
          onRemoveVehicle={removeFromComparison}
          onSelectVehicle={(v) => {
            setIsComparisonOpen(false);
            setSelectedVehicle(v);
          }}
          onOpenQuoteWithVehicle={(v) => {
            setIsComparisonOpen(false);
            handleOpenQuoteWithVehicle(v);
          }}
          currency={currency}
        />
      )}

      {/* Modal 3: Quote & Concierge Contact Form */}
      <QuoteContactModal
        isOpen={isQuoteOpen}
        onClose={() => {
          setIsQuoteOpen(false);
          setQuotePrefillVehicle(null);
        }}
        selectedVehicle={quotePrefillVehicle}
      />

      {/* Modal 4: Price Drop Alert Subscription Modal */}
      <PriceAlertModal
        isOpen={isPriceAlertModalOpen}
        onClose={() => {
          setIsPriceAlertModalOpen(false);
          setAlertTargetVehicle(null);
        }}
        vehicle={alertTargetVehicle}
        onSubscribe={handleSubscribeAlert}
        onSimulatePriceDrop={handleSimulatePriceDrop}
        currency={currency}
      />

      {/* Drawer: Notification Center & Price Radar */}
      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        notifications={notifications}
        priceAlerts={priceAlerts}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onClearNotifications={handleClearNotifications}
        onRemovePriceAlert={handleRemovePriceAlert}
        onSelectVehicleById={handleSelectVehicleById}
        onTriggerRandomPriceDrop={handleTriggerRandomPriceDrop}
        currency={currency}
      />

      {/* Real-time Toast Notifications */}
      <ToastNotification
        notifications={activeToasts}
        onDismiss={handleDismissToast}
        onSelectVehicleById={handleSelectVehicleById}
        currency={currency}
      />
    </div>
  );
}
