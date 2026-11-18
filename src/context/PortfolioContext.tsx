'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DEFAULT_PORTFOLIO_STATE, PortfolioState } from '@/data/defaultPortfolio';

interface PortfolioContextValue {
  state: PortfolioState;
  /** Merge a partial patch into Redis and update local state on 200 OK. */
  updatePortfolio: (patch: Partial<PortfolioState>) => Promise<{ ok: boolean; status: number }>;
  /** Reset Redis to defaults via DELETE /api/portfolio. */
  resetPortfolio: () => Promise<{ ok: boolean; status: number }>;
  /** Re-fetch the full state from GET /api/portfolio. */
  refreshPortfolio: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

function studioPasskeyHeader(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const passkey = sessionStorage.getItem('studio-passkey');
    return passkey ? { 'x-studio-passkey': passkey } : {};
  } catch {
    return {};
  }
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioState>(DEFAULT_PORTFOLIO_STATE);

  const refreshPortfolio = useCallback(async () => {
    try {
      const res = await fetch('/api/portfolio', { cache: 'no-store' });
      if (res.ok) {
        const data: PortfolioState = await res.json();
        setState(data);
      }
    } catch (err) {
      console.warn('[PortfolioContext] GET /api/portfolio failed, keeping defaults:', err);
    }
  }, []);

  // Hydrate from Redis on mount — DEFAULT_PORTFOLIO_STATE is already set so
  // there is zero layout shift while the fetch is in-flight.
  useEffect(() => {
    refreshPortfolio();
  }, [refreshPortfolio]);

  const updatePortfolio = useCallback(
    async (patch: Partial<PortfolioState>): Promise<{ ok: boolean; status: number }> => {
      try {
        const res = await fetch('/api/portfolio', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', ...studioPasskeyHeader() },
          body: JSON.stringify(patch),
        });
        if (res.ok) {
          const updated: PortfolioState = await res.json();
          setState(updated);
        }
        return { ok: res.ok, status: res.status };
      } catch {
        return { ok: false, status: 0 };
      }
    },
    [],
  );

  const resetPortfolio = useCallback(async (): Promise<{ ok: boolean; status: number }> => {
    try {
      const res = await fetch('/api/portfolio', {
        method: 'DELETE',
        headers: studioPasskeyHeader(),
      });
      if (res.ok) {
        setState(DEFAULT_PORTFOLIO_STATE);
      }
      return { ok: res.ok, status: res.status };
    } catch {
      return { ok: false, status: 0 };
    }
  }, []);

  return (
    <PortfolioContext.Provider value={{ state, updatePortfolio, resetPortfolio, refreshPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used inside <PortfolioProvider>');
  return ctx;
}
