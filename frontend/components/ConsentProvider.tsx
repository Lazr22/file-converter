"use client";
import { createContext, useContext, useSyncExternalStore } from 'react';

export type ConsentStatus = 'accepted' | 'rejected' | null;

type ConsentContextValue = {
  consent: ConsentStatus;
  /** True once we've read the real value from localStorage on the client. */
  hydrated: boolean;
  setConsent: (value: ConsentStatus) => void;
};

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  hydrated: false,
  setConsent: () => {},
});

const STORAGE_KEY = 'ch_cookie_consent';
const CHANGE_EVENT = 'ch-consent-change';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot(): ConsentStatus {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'accepted' || stored === 'rejected' ? stored : null;
}

function getServerSnapshot(): ConsentStatus {
  return null;
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // hydrated flips true on the client's first real read; stays false during SSR.
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const setConsent = (value: ConsentStatus) => {
    if (value) {
      window.localStorage.setItem(STORAGE_KEY, value);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <ConsentContext.Provider value={{ consent, hydrated, setConsent }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  return useContext(ConsentContext);
}
