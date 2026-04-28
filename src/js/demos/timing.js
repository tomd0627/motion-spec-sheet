/* global gsap */

function makeTarget(trackEl) {
  const el = document.createElement('div');
  el.className = 'demo-target';
  trackEl.appendChild(el);
  return el;
}

function slideDist(trackEl, factor = 0.85) {
  return Math.max(Math.floor((trackEl.offsetWidth - 28) * factor), 50);
}

function makePair(trackEl) {
  trackEl.classList.add('demo-track--pair');
  return ['demo-dot', 'demo-dot'].map((cls) => {
    const el = document.createElement('div');
    el.className = cls;
    trackEl.appendChild(el);
    return el;
  });
}

const timing = [
  {
    id: 'repeat',
    label: 'repeat: -1',
    description:
      'Loops the tween indefinitely. Without yoyo, each cycle jumps back to the start state. Combine with repeatDelay to control the rhythm between cycles.',
    code: `gsap.to(".el", {
  duration: 0.8,
  ease: "power2.inOut",
  repeat: -1,
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 0.8,
        ease: 'power2.inOut',
        repeat: -1,
        x: dist,
      });
    },
  },

  {
    id: 'yoyo',
    label: 'yoyo: true',
    description:
      'Plays forward then reverses back to the start — indefinitely. Both forward and reverse use the same ease. Requires repeat !== 0 to have any effect.',
    code: `gsap.to(".el", {
  duration: 0.8,
  ease: "power2.inOut",
  repeat: -1,
  x: 200,
  yoyo: true,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 0.8,
        ease: 'power2.inOut',
        repeat: -1,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'repeat-delay',
    label: 'repeatDelay: 0.8',
    description:
      'Inserts a pause after each completed repeat cycle (including yoyo reversal). The delay occurs before the next forward play begins, making the loop rhythm explicit.',
    code: `gsap.to(".el", {
  duration: 0.8,
  ease: "power2.inOut",
  repeat: -1,
  repeatDelay: 0.8,
  x: 200,
  yoyo: true,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap.to(target, {
        duration: 0.8,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 0.8,
        x: dist,
        yoyo: true,
      });
    },
  },

  {
    id: 'timeline-sequential',
    label: 'gsap.timeline()',
    description:
      'A Timeline sequences tweens automatically — each starts immediately after the previous ends. This is the primary tool for multi-step animation choreography.',
    code: `const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

tl.to(".a", { duration: 0.5, ease: "power2.out", y: -36 })
  .to(".b", { duration: 0.5, ease: "power2.out", y: -36 });`,
    build(trackEl) {
      const [dotA, dotB] = makePair(trackEl);
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      tl.to(dotA, { duration: 0.5, ease: 'power2.out', y: -36 }).to(dotB, {
        duration: 0.5,
        ease: 'power2.out',
        y: -36,
      });
      return tl;
    },
  },

  {
    id: 'timeline-offset',
    label: 'position: "-=0.2"',
    description:
      'The third argument to .to() is the position parameter. "-=0.2" starts the tween 0.2s before the previous ends, creating a deliberate overlap for more fluid choreography.',
    code: `const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

tl.to(".a", { duration: 0.5, ease: "power2.out", y: -36 })
  .to(".b", { duration: 0.5, ease: "power2.out", y: -36 }, "-=0.2");`,
    build(trackEl) {
      const [dotA, dotB] = makePair(trackEl);
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      tl.to(dotA, { duration: 0.5, ease: 'power2.out', y: -36 }).to(
        dotB,
        { duration: 0.5, ease: 'power2.out', y: -36 },
        '-=0.2'
      );
      return tl;
    },
  },

  {
    id: 'delay',
    label: 'delay: 0.6',
    description:
      'Postpones the start of a tween by a fixed amount after it is created. Useful for staggering without a formal stagger object, or for sequencing outside a Timeline.',
    code: `// Tween waits 0.6s before starting
gsap.to(".el", {
  delay: 0.6,
  duration: 0.8,
  ease: "power2.out",
  x: 200,
});`,
    build(trackEl) {
      const target = makeTarget(trackEl);
      const dist = slideDist(trackEl);
      return gsap
        .timeline({ repeat: -1 })
        .set(target, { x: 0 })
        .to(target, { delay: 0.7, duration: 0.8, ease: 'power2.out', x: dist })
        .to(target, { delay: 0.5, duration: 0.8, ease: 'power2.inOut', x: 0 });
    },
  },
];

export default timing;
