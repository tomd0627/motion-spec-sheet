/* global gsap */

function makeTarget(trackEl) {
  const el = document.createElement('div');
  el.className = 'demo-target';
  trackEl.appendChild(el);
  return el;
}

function slideDist(trackEl, factor = 0.6) {
  return Math.max(Math.floor((trackEl.offsetWidth - 28) * factor), 40);
}

const springs = [
  {
    id: 'spring-balanced',
    label: 'elastic.out(1, 0.3)',
    description:
      'A balanced spring approximation. amplitude=1 sets overshoot magnitude; period=0.3 produces ~3 oscillations. Maps roughly to a medium-stiffness, medium-damping spring.',
    code: `// Spring approximation via elastic ease
// amplitude → stiffness, period → inverse damping
gsap.to(".el", {
  duration: 1.2,
  ease: "elastic.out(1, 0.3)",
  x: 200,
});
// CSS spring equivalent (approx):
// transition: transform spring(200, 20, 0, 0);`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)',
        repeat: -1,
        repeatDelay: 1.2,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'spring-snappy',
    label: 'elastic.out(1, 0.1)',
    description:
      'A tight, snappy spring. Low period = high oscillation frequency. Feels mechanical and precise — suitable for UI elements that need to communicate decisiveness.',
    code: `// Tight spring: fast oscillation, full amplitude
gsap.to(".el", {
  duration: 1,
  ease: "elastic.out(1, 0.1)",
  x: 200,
});
// CSS spring equivalent (approx):
// transition: transform spring(600, 5, 1, 0);`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl, 0.5);
      return gsap.to(target, {
        duration: 1,
        ease: 'elastic.out(1, 0.1)',
        repeat: -1,
        repeatDelay: 1.4,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'spring-gentle',
    label: 'elastic.out(0.6, 0.5)',
    description:
      'A soft, gently damped spring. Lower amplitude reduces overshoot; higher period slows the oscillation. Suitable for subtle floating effects and organic micro-interactions.',
    code: `// Gentle spring: reduced amplitude, slow oscillation
gsap.to(".el", {
  duration: 1.4,
  ease: "elastic.out(0.6, 0.5)",
  x: 200,
});
// CSS spring equivalent (approx):
// transition: transform spring(100, 15, 0, 0);`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl, 0.65);
      return gsap.to(target, {
        duration: 1.4,
        ease: 'elastic.out(0.6, 0.5)',
        repeat: -1,
        repeatDelay: 1,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'spring-bouncy',
    label: 'elastic.out(1.5, 0.2)',
    description:
      'An underdamped spring with high amplitude and fast oscillation. Aggressively overshoots — reserved for playful UI, game interfaces, or moments where energy is the message.',
    code: `// Underdamped spring: high amplitude, rapid oscillation
gsap.to(".el", {
  duration: 1.2,
  ease: "elastic.out(1.5, 0.2)",
  x: 200,
});
// CSS spring equivalent (approx):
// transition: transform spring(500, 5, 1, 0);`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl, 0.45);
      return gsap.to(target, {
        duration: 1.2,
        ease: 'elastic.out(1.5, 0.2)',
        repeat: -1,
        repeatDelay: 1.4,
        x: dist,
        yoyo: true,
      });
    },
  },
];

export default springs;
