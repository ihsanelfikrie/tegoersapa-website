"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  SelectedPackage,
  SelectedAddOn,
  BookingState,
  BookingCustomerInfo,
  loadBookingFromStorage,
  saveBookingToStorage,
  clearBookingFromStorage,
  parseNumericPrice,
  calculateBookingTotal,
} from "./booking";

interface BookingContextType {
  selectedPackage: SelectedPackage | null;
  selectedAddOns: SelectedAddOn[];
  customerInfo?: Partial<BookingCustomerInfo>;
  isHydrated: boolean;
  selectPackage: (
    pkg: {
      id: string;
      nama: string;
      harga: string;
      kategori?: string;
      badge?: string;
      sourceUrl?: string;
      fitur?: string[];
      placeholderNote?: string;
    },
    sourceUrl?: string
  ) => void;
  toggleAddOn: (addon: {
    id: string;
    nama: string;
    harga: string;
    keterangan?: string;
  }) => void;
  removeAddOn: (addonId: string) => void;
  clearPackage: () => void;
  clearAll: () => void;
  saveCustomerInfo: (info: Partial<BookingCustomerInfo>) => void;
  isAddOnSelected: (addonId: string) => boolean;
  totalCalculation: ReturnType<typeof calculateBookingTotal>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOn[]>([]);
  const [customerInfo, setCustomerInfo] = useState<Partial<BookingCustomerInfo> | undefined>(undefined);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load initial data on mount (client-side only)
  useEffect(() => {
    const data = loadBookingFromStorage();
    setSelectedPackage(data.selectedPackage);
    setSelectedAddOns(data.selectedAddOns);
    setCustomerInfo(data.customerInfo);
    setIsHydrated(true);

    // Listen for storage events (e.g. from other tabs or custom events)
    const handleSync = () => {
      const refreshed = loadBookingFromStorage();
      setSelectedPackage(refreshed.selectedPackage);
      setSelectedAddOns(refreshed.selectedAddOns);
      setCustomerInfo(refreshed.customerInfo);
    };

    window.addEventListener("tegoer_booking_updated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("tegoer_booking_updated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  // Save changes to localStorage whenever state updates (after initial hydration)
  const persist = useCallback(
    (nextState: BookingState) => {
      saveBookingToStorage(nextState);
    },
    []
  );

  const selectPackage = useCallback(
    (
      pkg: {
        id: string;
        nama: string;
        harga: string;
        kategori?: string;
        badge?: string;
        sourceUrl?: string;
        fitur?: string[];
        placeholderNote?: string;
      },
      sourceUrl?: string
    ) => {
      const normalizedPkg: SelectedPackage = {
        ...pkg,
        numericPrice: parseNumericPrice(pkg.harga),
        sourceUrl:
          sourceUrl ||
          pkg.sourceUrl ||
          (typeof window !== "undefined" ? window.location.pathname + window.location.hash : "/photography/wedding#packages"),
      };

      setSelectedPackage(normalizedPkg);
      persist({
        selectedPackage: normalizedPkg,
        selectedAddOns,
        customerInfo,
      });
    },
    [selectedAddOns, customerInfo, persist]
  );

  const toggleAddOn = useCallback(
    (addon: {
      id: string;
      nama: string;
      harga: string;
      keterangan?: string;
    }) => {
      setSelectedAddOns((prev) => {
        const exists = prev.some((item) => item.id === addon.id);
        let updated: SelectedAddOn[];
        if (exists) {
          updated = prev.filter((item) => item.id !== addon.id);
        } else {
          updated = [
            ...prev,
            {
              ...addon,
              numericPrice: parseNumericPrice(addon.harga),
            },
          ];
        }

        persist({
          selectedPackage,
          selectedAddOns: updated,
          customerInfo,
        });

        return updated;
      });
    },
    [selectedPackage, customerInfo, persist]
  );

  const removeAddOn = useCallback(
    (addonId: string) => {
      setSelectedAddOns((prev) => {
        const updated = prev.filter((item) => item.id !== addonId);
        persist({
          selectedPackage,
          selectedAddOns: updated,
          customerInfo,
        });
        return updated;
      });
    },
    [selectedPackage, customerInfo, persist]
  );

  const clearPackage = useCallback(() => {
    setSelectedPackage(null);
    persist({
      selectedPackage: null,
      selectedAddOns,
      customerInfo,
    });
  }, [selectedAddOns, customerInfo, persist]);

  const clearAll = useCallback(() => {
    setSelectedPackage(null);
    setSelectedAddOns([]);
    setCustomerInfo(undefined);
    clearBookingFromStorage();
  }, []);

  const saveCustomerInfo = useCallback(
    (info: Partial<BookingCustomerInfo>) => {
      setCustomerInfo((prev) => {
        const updated = { ...prev, ...info };
        persist({
          selectedPackage,
          selectedAddOns,
          customerInfo: updated,
        });
        return updated;
      });
    },
    [selectedPackage, selectedAddOns, persist]
  );

  const isAddOnSelected = useCallback(
    (addonId: string) => {
      return selectedAddOns.some((item) => item.id === addonId);
    },
    [selectedAddOns]
  );

  const totalCalculation = useMemo(() => {
    return calculateBookingTotal(selectedPackage, selectedAddOns);
  }, [selectedPackage, selectedAddOns]);

  const value = useMemo(
    () => ({
      selectedPackage,
      selectedAddOns,
      customerInfo,
      isHydrated,
      selectPackage,
      toggleAddOn,
      removeAddOn,
      clearPackage,
      clearAll,
      saveCustomerInfo,
      isAddOnSelected,
      totalCalculation,
    }),
    [
      selectedPackage,
      selectedAddOns,
      customerInfo,
      isHydrated,
      selectPackage,
      toggleAddOn,
      removeAddOn,
      clearPackage,
      clearAll,
      saveCustomerInfo,
      isAddOnSelected,
      totalCalculation,
    ]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
