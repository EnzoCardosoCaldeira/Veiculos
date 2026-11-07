import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PriceAlertModal } from '../components/PriceAlertModal';
import { VEHICLE_DATABASE } from '../data/vehicles';

describe('PriceAlertModal Component', () => {
  const sampleVehicle = VEHICLE_DATABASE[0]; // Ferrari SF90 Stradale

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <PriceAlertModal
        isOpen={false}
        onClose={vi.fn()}
        vehicle={sampleVehicle}
        onSubscribe={vi.fn()}
        onSimulatePriceDrop={vi.fn()}
        currency="BRL"
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders vehicle information and price discount options when open', () => {
    render(
      <PriceAlertModal
        isOpen={true}
        onClose={vi.fn()}
        vehicle={sampleVehicle}
        onSubscribe={vi.fn()}
        onSimulatePriceDrop={vi.fn()}
        currency="BRL"
      />
    );

    expect(screen.getByText(/Ferrari SF90 Stradale Carbon/i)).toBeInTheDocument();
    expect(screen.getByText(/-5%/i)).toBeInTheDocument();
    expect(screen.getByText(/-10%/i)).toBeInTheDocument();
    expect(screen.getByText(/-15%/i)).toBeInTheDocument();
  });

  it('shows error if email notification is checked but email is empty upon submission', () => {
    render(
      <PriceAlertModal
        isOpen={true}
        onClose={vi.fn()}
        vehicle={sampleVehicle}
        onSubscribe={vi.fn()}
        onSimulatePriceDrop={vi.fn()}
        currency="BRL"
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Ativar Alerta de Redução de Preço/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Informe um e-mail válido/i)).toBeInTheDocument();
  });

  it('calls onSimulatePriceDrop when quick test button is clicked', () => {
    const handleSimulate = vi.fn();
    render(
      <PriceAlertModal
        isOpen={true}
        onClose={vi.fn()}
        vehicle={sampleVehicle}
        onSubscribe={vi.fn()}
        onSimulatePriceDrop={handleSimulate}
        currency="BRL"
      />
    );

    const testBtn = screen.getByRole('button', { name: /Simular Queda de Preço Agora/i });
    fireEvent.click(testBtn);

    expect(handleSimulate).toHaveBeenCalledWith(sampleVehicle, expect.any(Number));
  });
});
