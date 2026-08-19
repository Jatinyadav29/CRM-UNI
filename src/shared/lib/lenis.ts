import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export const initLenis = (): Lenis => {
  if (typeof window === 'undefined') return {} as Lenis;

  if (!lenisInstance) {
    lenisInstance = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      if (lenisInstance) {
        lenisInstance.raf(time);
        rafId = requestAnimationFrame(raf);
      }
    }

    rafId = requestAnimationFrame(raf);
  }

  return lenisInstance;
};

export const getLenis = () => lenisInstance;

export const destroyLenis = () => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};
