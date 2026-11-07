import { describe, it, expect } from 'vitest';
import { PriceAlert, AppNotification } from '../types/notification';

// Helper functions mirroring price alert business logic
export function calculateTargetPrice(currentPrice: number, discountPercentage: number): number {
  return Math.round(currentPrice * (1 - discountPercentage / 100));
}

export function shouldTriggerAlert(newPrice: number, targetPrice: number): boolean {
  return newPrice <= targetPrice;
}

export function validateAlertSubscription(email: string, notifyEmail: boolean, notifyToast: boolean): { isValid: boolean; error?: string } {
  if (!notifyEmail && !notifyToast) {
    return { isValid: false, error: 'Selecione pelo menos um canal de notificação (Email ou Toast).' };
  }
  if (notifyEmail && (!email.trim() || !email.includes('@'))) {
    return { isValid: false, error: 'Informe um e-mail válido para receber os alertas.' };
  }
  return { isValid: true };
}

export function createPriceDropNotification(
  vehicleId: string,
  vehicleName: string,
  vehicleImage: string,
  oldPrice: number,
  newPrice: number
): AppNotification {
  const discountPercentage = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  return {
    id: `notif-${Date.now()}`,
    vehicleId,
    vehicleName,
    vehicleImage,
    oldPrice,
    newPrice,
    discountPercentage,
    type: 'price_drop',
    title: `Queda de Preço: ${vehicleName}`,
    message: `O valor de referência foi reduzido em ${discountPercentage}% para fechamento imediato.`,
    timestamp: 'Agora mesmo',
    read: false,
  };
}

describe('Price Alert Logic Suite', () => {
  it('correctly calculates target price with specified discount percentages', () => {
    const currentPrice = 7400000; // Ferrari SF90
    expect(calculateTargetPrice(currentPrice, 5)).toBe(7030000);
    expect(calculateTargetPrice(currentPrice, 10)).toBe(6660000);
    expect(calculateTargetPrice(currentPrice, 15)).toBe(6290000);
  });

  it('evaluates whether a market price reduction triggers the alert condition', () => {
    const targetPrice = 7000000;
    // Price drops to 6.900.000 (below target) -> should trigger
    expect(shouldTriggerAlert(6900000, targetPrice)).toBe(true);
    // Price drops exactly to target -> should trigger
    expect(shouldTriggerAlert(7000000, targetPrice)).toBe(true);
    // Price drops to 7.100.000 (above target) -> should not trigger
    expect(shouldTriggerAlert(7100000, targetPrice)).toBe(false);
  });

  describe('Subscription validation', () => {
    it('accepts valid email with email channel enabled', () => {
      const result = validateAlertSubscription('investidor@vortex.com', true, true);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('rejects subscription when email is required but empty or invalid', () => {
      const resultEmpty = validateAlertSubscription('', true, false);
      expect(resultEmpty.isValid).toBe(false);
      expect(resultEmpty.error).toContain('e-mail válido');

      const resultInvalid = validateAlertSubscription('invalid-email-address', true, false);
      expect(resultInvalid.isValid).toBe(false);
      expect(resultInvalid.error).toContain('e-mail válido');
    });

    it('allows subscription with toast only without requiring email', () => {
      const result = validateAlertSubscription('', false, true);
      expect(result.isValid).toBe(true);
    });

    it('rejects subscription if neither toast nor email is selected', () => {
      const result = validateAlertSubscription('investidor@vortex.com', false, false);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('pelo menos um canal');
    });
  });

  describe('Notification payload creation', () => {
    it('generates notification with correct discount percentage and attributes', () => {
      const notif = createPriceDropNotification(
        'car-sf90-stradale',
        'Ferrari SF90 Stradale Carbon',
        '/src/assets/images/hero_apex_hypercar_1794059188468.jpg',
        10000000,
        9000000
      );

      expect(notif.vehicleId).toBe('car-sf90-stradale');
      expect(notif.oldPrice).toBe(10000000);
      expect(notif.newPrice).toBe(9000000);
      expect(notif.discountPercentage).toBe(10);
      expect(notif.read).toBe(false);
      expect(notif.type).toBe('price_drop');
    });
  });
});
