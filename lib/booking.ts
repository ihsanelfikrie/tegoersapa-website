/**
 * lib/booking.ts
 * Types and helper functions for booking state and price calculations.
 * Uses browser localStorage for temporary persistence.
 */

export interface SelectedPackage {
  id: string;
  nama: string;
  harga: string;
  numericPrice: number;
  kategori?: string;
  badge?: string;
  sourceUrl: string;
  fitur?: string[];
  placeholderNote?: string;
}

export interface SelectedAddOn {
  id: string;
  nama: string;
  harga: string;
  numericPrice: number;
  keterangan?: string;
}

export interface BookingCustomerInfo {
  nama: string;
  whatsapp: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  instagram: string;
  catatan: string;
}

export interface BookingState {
  selectedPackage: SelectedPackage | null;
  selectedAddOns: SelectedAddOn[];
  customerInfo?: Partial<BookingCustomerInfo>;
}

export const BOOKING_STORAGE_KEY = "tegoer_booking_draft";

/**
 * Extract numeric price from price string e.g. "Rp 4.750.000" -> 4750000
 */
export function parseNumericPrice(priceStr: string | undefined | null): number {
  if (!priceStr) return 0;
  const lower = priceStr.toLowerCase();
  // If price is consultation/custom/hubungi admin, numeric price is 0
  if (
    lower.includes("konsultasi") ||
    lower.includes("custom") ||
    lower.includes("admin") ||
    lower.includes("hubungi")
  ) {
    return 0;
  }
  const digits = priceStr.replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

/**
 * Format numeric number into Indonesian Rupiah string
 */
export function formatRupiah(amount: number): string {
  if (!amount || isNaN(amount)) return "Rp 0";
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

/**
 * Calculate total price estimation based on Package + Add-Ons
 */
export function calculateBookingTotal(
  pkg: SelectedPackage | null,
  addOns: SelectedAddOn[]
): {
  packagePrice: number;
  addOnsTotal: number;
  grandTotal: number;
  totalText: string;
  isCustomPrice: boolean;
} {
  const packagePrice = pkg?.numericPrice ?? (pkg ? parseNumericPrice(pkg.harga) : 0);
  const isCustomPrice = Boolean(
    pkg && (
      pkg.harga.toLowerCase().includes("konsultasi") ||
      pkg.harga.toLowerCase().includes("custom") ||
      pkg.harga.toLowerCase().includes("admin") ||
      pkg.harga.toLowerCase().includes("hubungi")
    )
  );

  const addOnsTotal = addOns.reduce((acc, curr) => {
    const price = curr.numericPrice || parseNumericPrice(curr.harga);
    return acc + price;
  }, 0);

  const grandTotal = packagePrice + addOnsTotal;

  let totalText = formatRupiah(grandTotal);
  if (isCustomPrice) {
    totalText = addOnsTotal > 0
      ? `Hubungi Admin (+ Add-on: ${formatRupiah(addOnsTotal)})`
      : "Hubungi Admin";
  }

  return {
    packagePrice,
    addOnsTotal,
    grandTotal,
    totalText,
    isCustomPrice,
  };
}

/**
 * Load booking draft from localStorage (safe for SSR)
 */
export function loadBookingFromStorage(): BookingState {
  if (typeof window === "undefined") {
    return { selectedPackage: null, selectedAddOns: [] };
  }
  try {
    const raw = window.localStorage.getItem(BOOKING_STORAGE_KEY);
    if (!raw) return { selectedPackage: null, selectedAddOns: [] };
    const parsed = JSON.parse(raw);
    return {
      selectedPackage: parsed.selectedPackage || null,
      selectedAddOns: Array.isArray(parsed.selectedAddOns) ? parsed.selectedAddOns : [],
      customerInfo: parsed.customerInfo || undefined,
    };
  } catch (err) {
    console.error("Failed to load booking from localStorage:", err);
    return { selectedPackage: null, selectedAddOns: [] };
  }
}

/**
 * Save booking draft to localStorage
 */
export function saveBookingToStorage(state: BookingState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(state));
    // Dispatch custom event for cross-component reactive updates
    window.dispatchEvent(new Event("tegoer_booking_updated"));
  } catch (err) {
    console.error("Failed to save booking to localStorage:", err);
  }
}

/**
 * Clear booking draft from localStorage
 */
export function clearBookingFromStorage(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(BOOKING_STORAGE_KEY);
    window.dispatchEvent(new Event("tegoer_booking_updated"));
  } catch (err) {
    console.error("Failed to clear booking from localStorage:", err);
  }
}
