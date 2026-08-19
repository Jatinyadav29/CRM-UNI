import gsap from 'gsap';

export { gsap };

export type AnimateTarget = string | Element | Element[] | NodeListOf<Element> | ArrayLike<Element>;

export const animateFadeIn = (target: AnimateTarget, delay = 0) => {
  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    gsap.fromTo(
      target,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay }
    );
  });

  mm.add('(max-width: 767px)', () => {
    gsap.fromTo(
      target,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'none', delay }
    );
  });

  return mm;
};

export const animateStaggerCards = (target: AnimateTarget, stagger = 0.06) => {
  const mm = gsap.matchMedia();

  // Desktop / Tablet: Rich staggered transform
  mm.add('(min-width: 768px)', () => {
    gsap.fromTo(
      target,
      { opacity: 0, y: 18, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger,
        ease: 'power3.out',
      }
    );
  });

  // Mobile: Lightweight batch opacity fade-in to preserve 60fps scrolling
  mm.add('(max-width: 767px)', () => {
    gsap.fromTo(
      target,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.25,
        ease: 'power1.out',
      }
    );
  });

  return mm;
};

export const animateNumberCount = (
  target: { value: number },
  endValue: number,
  onUpdate: (val: number) => void,
  duration = 1.0
) => {
  return gsap.to(target, {
    value: endValue,
    duration,
    ease: 'power1.out',
    onUpdate: () => onUpdate(Math.round(target.value)),
  });
};
