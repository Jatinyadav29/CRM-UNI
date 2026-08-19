import gsap from 'gsap';

export { gsap };

export type AnimateTarget = string | Element | Element[] | NodeListOf<Element> | ArrayLike<Element>;

export const animateFadeIn = (target: AnimateTarget, delay = 0) => {
  const mm = gsap.matchMedia();

  // Desktop / Tablet: Smooth translate and fade
  mm.add('(min-width: 768px)', () => {
    gsap.fromTo(
      target,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay }
    );
  });

  // Mobile (< 768px): Instant opacity reveal to protect 60fps Lenis scroll thread
  mm.add('(max-width: 767px)', () => {
    gsap.fromTo(
      target,
      { opacity: 0 },
      { opacity: 1, duration: 0.15, ease: 'none', delay }
    );
  });

  return mm;
};

export const animateStaggerCards = (target: AnimateTarget, stagger = 0.05) => {
  const mm = gsap.matchMedia();

  // Desktop / Tablet (>= 768px): Rich staggered entry
  mm.add('(min-width: 768px)', () => {
    gsap.fromTo(
      target,
      { opacity: 0, y: 16, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger,
        ease: 'power2.out',
      }
    );
  });

  // Mobile (< 768px): Lightweight instant reveal to preserve 60fps scrolling
  mm.add('(max-width: 767px)', () => {
    gsap.fromTo(
      target,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.15,
        ease: 'none',
      }
    );
  });

  return mm;
};

export const animateNumberCount = (
  target: { value: number },
  endValue: number,
  onUpdate: (val: number) => void,
  duration = 0.8
): { kill: () => void } => {
  const tween = gsap.to(target, {
    value: endValue,
    duration,
    ease: 'power1.out',
    onUpdate: () => {
      if (typeof onUpdate === 'function') {
        onUpdate(Math.round(target.value));
      }
    },
  });

  return {
    kill: () => {
      tween.kill();
    },
  };
};
