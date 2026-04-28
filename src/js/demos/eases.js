/* global gsap, CustomEase */

function makeTarget(trackEl) {
  const el = document.createElement('div');
  el.className = 'demo-target';
  trackEl.appendChild(el);
  return el;
}

function slideDist(trackEl, factor = 0.85) {
  return Math.max(Math.floor((trackEl.offsetWidth - 28) * factor), 50);
}

const eases = [
  {
    id: 'none',
    label: 'none',
    description:
      'Constant velocity — no acceleration or deceleration. Moves like a machine, not an organic body. Useful for counters, scrolling text, and conveyor-belt patterns.',
    code: `gsap.to(".el", {
  duration: 1,
  ease: "none",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 1,
        ease: 'none',
        repeat: -1,
        repeatDelay: 0.8,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'power1-in',
    label: 'power1.in',
    description:
      'Gentle ease in — starts slow, ends at full speed. The mildest acceleration; rarely feels abrupt but always reads as something starting up.',
    code: `gsap.to(".el", {
  duration: 1,
  ease: "power1.in",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 1,
        ease: 'power1.in',
        repeat: -1,
        repeatDelay: 0.8,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'power1-out',
    label: 'power1.out',
    description:
      'Gentle ease out — starts fast, decelerates softly to rest. The most ergonomic choice for elements appearing on screen: dropdowns, toasts, and tooltip fades.',
    code: `gsap.to(".el", {
  duration: 1,
  ease: "power1.out",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 1,
        ease: 'power1.out',
        repeat: -1,
        repeatDelay: 0.8,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'power2-inOut',
    label: 'power2.inOut',
    description:
      'Smooth acceleration and deceleration. The de-facto ease for most UI transitions — balanced, predictable, and universally readable.',
    code: `gsap.to(".el", {
  duration: 1,
  ease: "power2.inOut",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 1,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 0.8,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'power3-out',
    label: 'power3.out',
    description:
      'Stronger deceleration than power2. The fast-start feel makes this ideal for slide-in panels, drawers, and elements that need to communicate responsiveness.',
    code: `gsap.to(".el", {
  duration: 0.6,
  ease: "power3.out",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 0.6,
        ease: 'power3.out',
        repeat: -1,
        repeatDelay: 1,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'power4-in',
    label: 'power4.in',
    description:
      'A dramatic ramp-up that starts nearly still and slams to full speed. Best reserved for building tension before an impact — uncommon in day-to-day UI.',
    code: `gsap.to(".el", {
  duration: 1,
  ease: "power4.in",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 1,
        ease: 'power4.in',
        repeat: -1,
        repeatDelay: 1,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'expo-out',
    label: 'expo.out',
    description:
      'Explosive start, long graceful tail. The sharp contrast between initial velocity and eventual rest creates a snappy, confident feel ideal for hero entrances and interactive feedback.',
    code: `gsap.to(".el", {
  duration: 0.8,
  ease: "expo.out",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 0.8,
        ease: 'expo.out',
        repeat: -1,
        repeatDelay: 1,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'expo-inOut',
    label: 'expo.inOut',
    description:
      'Nearly imperceptible at both ends with a sharp acceleration through the midpoint. Emphasizes the transition itself rather than the start or end states.',
    code: `gsap.to(".el", {
  duration: 1,
  ease: "expo.inOut",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 1,
        ease: 'expo.inOut',
        repeat: -1,
        repeatDelay: 0.8,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'circ-inOut',
    label: 'circ.inOut',
    description:
      'Derived from a circular arc — extremely slow at both ends with a fast midsection. More pronounced than power eases; use when you want a clear S-curve character.',
    code: `gsap.to(".el", {
  duration: 1,
  ease: "circ.inOut",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 1,
        ease: 'circ.inOut',
        repeat: -1,
        repeatDelay: 0.8,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'back-out',
    label: 'back.out(1.7)',
    description:
      'Overshoots the target and pulls back. The overshoot value (1.7 by default) controls how far past the destination it travels. Adds springy personality to reveals and entrances.',
    code: `gsap.to(".el", {
  duration: 0.8,
  ease: "back.out(1.7)",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl, 0.72);
      return gsap.to(target, {
        duration: 0.8,
        ease: 'back.out(1.7)',
        repeat: -1,
        repeatDelay: 1,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'elastic-out',
    label: 'elastic.out(1, 0.3)',
    description:
      'Oscillates past the destination before settling. The first argument controls overshoot amplitude; the second controls oscillation frequency. Longer durations look more natural.',
    code: `gsap.to(".el", {
  duration: 1.2,
  ease: "elastic.out(1, 0.3)",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl, 0.58);
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
    id: 'bounce-out',
    label: 'bounce.out',
    description:
      'Simulates a ball bouncing off a surface and coming to rest. Unlike elastic, the bounces always stay on the positive side — no pull-back below the origin.',
    code: `gsap.to(".el", {
  duration: 1,
  ease: "bounce.out",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 1,
        ease: 'bounce.out',
        repeat: -1,
        repeatDelay: 1,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'steps',
    label: 'steps(6)',
    description:
      'Jumps in fixed increments rather than interpolating continuously. The argument sets the number of steps. Ideal for sprite animation, digit counters, and mechanical effects.',
    code: `gsap.to(".el", {
  duration: 1,
  ease: "steps(6)",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 1,
        ease: 'steps(6)',
        repeat: -1,
        repeatDelay: 0.8,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'custom-ease',
    label: 'CustomEase',
    description:
      'Define any curve by authoring an SVG path string — from (0,0) to (1,1) in normalized time/progress space. Use the GSAP Ease Visualizer to author and preview paths.',
    code: `gsap.registerPlugin(CustomEase);

CustomEase.create("hop", "M0,0 C0.14,0 0.24,0.44 0.27,0.56 " +
  "0.31,0.73 0.35,0.96 0.36,1 0.37,1.04 " +
  "0.52,1.06 0.64,1.03 0.82,0.98 1,1 1,1");

gsap.to(".el", {
  duration: 1,
  ease: "hop",
  x: 200,
});`,
    build(trackEl) {
      if (!CustomEase.get('hop')) {
        CustomEase.create(
          'hop',
          'M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.354,0.963 0.362,1 0.37,1.037 0.522,1.063 0.639,1.03 0.815,0.982 1,1 1,1'
        );
      }
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl, 0.78);
      return gsap.to(target, {
        duration: 1,
        ease: 'hop',
        repeat: -1,
        repeatDelay: 1,
        x: dist,
        yoyo: true,
      });
    },
  },
];

export default eases;
