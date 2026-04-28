/* global gsap */

const DOT_COUNT = 8;
const GRID_COLS = 3;
const GRID_ROWS = 3;

function makeDots(trackEl, count) {
  return Array.from({ length: count }, () => {
    const dot = document.createElement('div');
    dot.className = 'demo-dot';
    trackEl.appendChild(dot);
    return dot;
  });
}

const staggers = [
  {
    id: 'stagger-amount',
    label: 'stagger: 0.08',
    description:
      'The simplest stagger — each element starts 0.08s after the previous. A shorthand for { each: 0.08 }. The total duration scales with the number of elements.',
    code: `gsap.from(".el", {
  duration: 0.4,
  ease: "power2.out",
  opacity: 0,
  stagger: 0.08,
  y: 16,
});`,
    build(trackEl) {
      trackEl.classList.add('demo-track--dots');
      const dots = makeDots(trackEl, DOT_COUNT);
      return gsap.from(dots, {
        duration: 0.4,
        ease: 'power2.out',
        opacity: 0,
        repeat: -1,
        repeatDelay: 1,
        scale: 0,
        stagger: 0.08,
        yoyo: true,
      });
    },
  },

  {
    id: 'stagger-each',
    label: 'stagger: { each: 0.12 }',
    description:
      'Explicit per-element offset. Equivalent to the shorthand number form, but named for clarity. Use each when you want to think in per-element seconds, not total spread.',
    code: `gsap.from(".el", {
  duration: 0.4,
  ease: "power2.out",
  opacity: 0,
  stagger: { each: 0.12 },
  y: 16,
});`,
    build(trackEl) {
      trackEl.classList.add('demo-track--dots');
      const dots = makeDots(trackEl, DOT_COUNT);
      return gsap.from(dots, {
        duration: 0.4,
        ease: 'power2.out',
        opacity: 0,
        repeat: -1,
        repeatDelay: 1,
        scale: 0,
        stagger: { each: 0.12 },
        yoyo: true,
      });
    },
  },

  {
    id: 'stagger-from-center',
    label: 'stagger: { from: "center" }',
    description:
      'Starts from the middle element and radiates outward in both directions. Creates a symmetrical wave that draws attention to the center of the group.',
    code: `gsap.from(".el", {
  duration: 0.4,
  ease: "power2.out",
  opacity: 0,
  stagger: { amount: 0.6, from: "center" },
  y: 16,
});`,
    build(trackEl) {
      trackEl.classList.add('demo-track--dots');
      const dots = makeDots(trackEl, DOT_COUNT);
      return gsap.from(dots, {
        duration: 0.4,
        ease: 'back.out(2)',
        opacity: 0,
        repeat: -1,
        repeatDelay: 1,
        scale: 0,
        stagger: { amount: 0.6, from: 'center' },
        yoyo: true,
      });
    },
  },

  {
    id: 'stagger-from-edges',
    label: 'stagger: { from: "edges" }',
    description:
      'The inverse of "center" — both outer elements start first and converge toward the middle. Useful for collapsing effects or focusing attention on a central target.',
    code: `gsap.from(".el", {
  duration: 0.4,
  ease: "power2.out",
  opacity: 0,
  stagger: { amount: 0.6, from: "edges" },
  y: 16,
});`,
    build(trackEl) {
      trackEl.classList.add('demo-track--dots');
      const dots = makeDots(trackEl, DOT_COUNT);
      return gsap.from(dots, {
        duration: 0.4,
        ease: 'back.out(2)',
        opacity: 0,
        repeat: -1,
        repeatDelay: 1,
        scale: 0,
        stagger: { amount: 0.6, from: 'edges' },
        yoyo: true,
      });
    },
  },

  {
    id: 'stagger-from-random',
    label: 'stagger: { from: "random" }',
    description:
      'Each element starts at a random time within the total stagger window. The order is seeded once per tween — replay to see the same randomization, or recreate the tween for a new sequence.',
    code: `gsap.from(".el", {
  duration: 0.4,
  ease: "power2.out",
  opacity: 0,
  stagger: { amount: 0.6, from: "random" },
  y: 16,
});`,
    build(trackEl) {
      trackEl.classList.add('demo-track--dots');
      const dots = makeDots(trackEl, DOT_COUNT);
      return gsap.from(dots, {
        duration: 0.4,
        ease: 'back.out(2)',
        opacity: 0,
        repeat: -1,
        repeatDelay: 1,
        scale: 0,
        stagger: { amount: 0.6, from: 'random' },
        yoyo: true,
      });
    },
  },

  {
    id: 'stagger-grid',
    label: 'stagger: { grid, from: "center" }',
    description:
      'A 2D stagger that offsets based on spatial distance from the origin point. grid: "auto" reads the layout automatically. The ripple radiates from the center outward.',
    code: `gsap.from(".el", {
  duration: 0.4,
  ease: "back.out(2)",
  opacity: 0,
  scale: 0,
  stagger: {
    amount: 0.8,
    from: "center",
    grid: "auto",
  },
});`,
    build(trackEl) {
      trackEl.classList.add('demo-track--grid');
      trackEl.style.gridTemplateColumns = `repeat(${GRID_COLS}, 12px)`;
      const dots = makeDots(trackEl, GRID_COLS * GRID_ROWS);
      return gsap.from(dots, {
        duration: 0.4,
        ease: 'back.out(2)',
        opacity: 0,
        repeat: -1,
        repeatDelay: 1,
        scale: 0,
        stagger: { amount: 0.8, from: 'center', grid: 'auto' },
        yoyo: true,
      });
    },
  },
];

export default staggers;
