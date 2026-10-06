import { gsap } from "@/lib/gsap";

/**
 * ButtonFlair — GSAP Cursor-following Magnetic Ripple/Flair Animation
 * Sesuai spesifikasi dan script yang diberikan oleh user.
 */
export class ButtonFlair {
  block: HTMLElement;
  flair: HTMLElement | null = null;
  xSet: ((val: number) => void) | null = null;
  ySet: ((val: number) => void) | null = null;

  private onMouseEnterHandler: ((e: MouseEvent) => void) | null = null;
  private onMouseLeaveHandler: ((e: MouseEvent) => void) | null = null;
  private onMouseMoveHandler: ((e: MouseEvent) => void) | null = null;

  constructor(buttonElement: HTMLElement) {
    this.block = buttonElement;
    this.init();
    this.initEvents();
  }

  private init() {
    // Pastikan .button__flair ada di dalam tombol
    let flairEl = this.block.querySelector<HTMLElement>(".button__flair");
    if (!flairEl) {
      flairEl = document.createElement("span");
      flairEl.className = "button__flair";
      flairEl.setAttribute("aria-hidden", "true");
      this.block.insertBefore(flairEl, this.block.firstChild);
    }
    this.flair = flairEl;

    // Pastikan label dibungkus .button__label agar z-index di atas flair
    let labelEl = this.block.querySelector<HTMLElement>(".button__label");
    if (!labelEl) {
      labelEl = document.createElement("span");
      labelEl.className = "button__label";
      // Pindahkan semua anak selain .button__flair ke dalam label
      const nodesToMove: Node[] = [];
      this.block.childNodes.forEach((node) => {
        if (node !== flairEl) {
          nodesToMove.push(node);
        }
      });
      nodesToMove.forEach((node) => labelEl!.appendChild(node));
      this.block.appendChild(labelEl);
    }

    this.xSet = gsap.quickSetter(this.flair, "xPercent") as (val: number) => void;
    this.ySet = gsap.quickSetter(this.flair, "yPercent") as (val: number) => void;
  }

  private getXY(e: MouseEvent) {
    const { left, top, width, height } = this.block.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top),
    };
  }

  private initEvents() {
    if (!this.flair || !this.xSet || !this.ySet) return;

    this.onMouseEnterHandler = (e: MouseEvent) => {
      if (!this.flair || !this.xSet || !this.ySet) return;
      const { x, y } = this.getXY(e);

      this.xSet(x);
      this.ySet(y);

      gsap.to(this.flair, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    this.onMouseLeaveHandler = (e: MouseEvent) => {
      if (!this.flair) return;
      const { x, y } = this.getXY(e);

      gsap.killTweensOf(this.flair);

      gsap.to(this.flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    this.onMouseMoveHandler = (e: MouseEvent) => {
      if (!this.flair) return;
      const { x, y } = this.getXY(e);

      gsap.to(this.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    };

    this.block.addEventListener("mouseenter", this.onMouseEnterHandler);
    this.block.addEventListener("mouseleave", this.onMouseLeaveHandler);
    this.block.addEventListener("mousemove", this.onMouseMoveHandler);
  }

  destroy() {
    if (this.onMouseEnterHandler) {
      this.block.removeEventListener("mouseenter", this.onMouseEnterHandler);
    }
    if (this.onMouseLeaveHandler) {
      this.block.removeEventListener("mouseleave", this.onMouseLeaveHandler);
    }
    if (this.onMouseMoveHandler) {
      this.block.removeEventListener("mousemove", this.onMouseMoveHandler);
    }
    if (this.flair) {
      gsap.killTweensOf(this.flair);
    }
  }
}

const initializedButtons = new WeakMap<HTMLElement, ButtonFlair>();

/**
 * Inisialisasi satu tombol dengan efek flair
 */
export function initSingleButtonFlair(buttonEl: HTMLElement): ButtonFlair | undefined {
  if (initializedButtons.has(buttonEl)) {
    return initializedButtons.get(buttonEl);
  }
  const instance = new ButtonFlair(buttonEl);
  initializedButtons.set(buttonEl, instance);
  return instance;
}

/**
 * Scan seluruh dokumen dan inisialisasi semua tombol yang memiliki
 * [data-block="button"] atau class .button
 */
export function initAllButtonFlairs(): () => void {
  if (typeof window === "undefined") return () => {};

  const scanAndInit = () => {
    const targets = document.querySelectorAll<HTMLElement>(
      '[data-block="button"], .button, .btn-flair'
    );
    targets.forEach((el) => {
      initSingleButtonFlair(el);
    });
  };

  scanAndInit();

  let rafId: number | null = null;
  const debouncedScan = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      scanAndInit();
    });
  };

  // Observer agar tombol dinamis (misal modal, tab, atau halaman baru) otomatis aktif tanpa layout thrashing
  const observer = new MutationObserver(() => {
    debouncedScan();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    observer.disconnect();
  };
}
