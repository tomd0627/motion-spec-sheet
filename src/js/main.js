/* global gsap, ScrollTrigger, CustomEase */

import { initClipboard } from './clipboard.js';
import { initReducedMotion, prefersReducedMotion } from './reduced-motion.js';
import eases from './demos/eases.js';
import springs from './demos/springs.js';
import staggers from './demos/staggers.js';
import timing from './demos/timing.js';

// ─── Guard: GSAP must load from CDN before this module runs ─────────────────

if (typeof gsap === 'undefined') {
  document.querySelectorAll('.spec-grid').forEach((grid) => {
    grid.innerHTML =
      '<div class="noscript-notice"><strong>GSAP failed to load</strong>Check your internet connection and reload the page.</div>';
  });
  throw new Error('GSAP is not defined — CDN load failed.');
}

gsap.registerPlugin(ScrollTrigger, CustomEase);

// ─── Section registry ────────────────────────────────────────────────────────

const SECTIONS = [
  { gridId: 'grid-eases', demos: eases, tagLabel: 'Ease', tagColor: 'var(--c-tag-ease)' },
  {
    gridId: 'grid-springs',
    demos: springs,
    tagLabel: 'Spring',
    tagColor: 'var(--c-tag-spring)',
  },
  {
    gridId: 'grid-staggers',
    demos: staggers,
    tagLabel: 'Stagger',
    tagColor: 'var(--c-tag-stagger)',
  },
  {
    gridId: 'grid-playback',
    demos: timing,
    tagLabel: 'Playback',
    tagColor: 'var(--c-tag-playback)',
  },
];

// ─── HTML helpers ────────────────────────────────────────────────────────────

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ICON_REPLAY =
  '<svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-replay"/></svg>';
const ICON_COPY =
  '<svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-copy"/></svg>';

function buildCardHTML(demo, tagLabel, tagColor) {
  return `
    <header class="spec-card__header">
      <h3 class="spec-card__title">${escapeHTML(demo.label)}</h3>
      <span class="spec-card__tag" style="--tag-color: ${tagColor}">${escapeHTML(tagLabel)}</span>
    </header>
    <div class="spec-card__stage">
      <div class="demo-track" aria-hidden="true"></div>
      <button class="replay-btn" type="button" aria-label="Replay ${escapeHTML(demo.label)} animation">
        ${ICON_REPLAY}
      </button>
    </div>
    <div class="spec-card__code">
      <pre class="code-block"><code>${escapeHTML(demo.code)}</code></pre>
      <button class="copy-btn" type="button" aria-label="Copy code snippet">
        ${ICON_COPY}
      </button>
    </div>
    <p class="spec-card__desc">${demo.description}</p>
  `;
}

// ─── Card wiring ─────────────────────────────────────────────────────────────

function wireReplay(card, tween, reducedMotion) {
  const btn = card.querySelector('.replay-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (reducedMotion) return;

    tween.restart(true);

    btn.classList.add('is-spinning');
    btn.addEventListener('animationend', () => btn.classList.remove('is-spinning'), {
      once: true,
    });
  });
}

// ─── Section population ──────────────────────────────────────────────────────

function populateSection({ gridId, demos, tagLabel, tagColor }, reducedMotion) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = '';

  demos.forEach((demo) => {
    const card = document.createElement('article');
    card.className = 'spec-card';
    card.id = `card-${demo.id}`;
    card.dataset.category = demo.category ?? gridId.replace('grid-', '');
    card.innerHTML = buildCardHTML(demo, tagLabel, tagColor);

    grid.appendChild(card);

    const trackEl = card.querySelector('.demo-track');
    const tween = demo.build(trackEl);

    if (reducedMotion) {
      tween.progress(0).pause();
    }

    wireReplay(card, tween, reducedMotion);
  });
}

// ─── Active nav link on scroll ───────────────────────────────────────────────

function initNavHighlight() {
  const sections = document.querySelectorAll('.category-section');
  const navLinks = document.querySelectorAll('.category-nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('is-active', isActive);
          if (isActive) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// ─── Character split for heading animation ───────────────────────────────────

function splitChars(el) {
  const words = el.textContent.trim().split(' ');
  el.textContent = '';

  const allChars = [];

  words.forEach((word, wi) => {
    word.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char;
      el.appendChild(span);
      allChars.push(span);
    });

    if (wi < words.length - 1) {
      const space = document.createElement('span');
      space.className = 'char';
      space.textContent = ' ';
      el.appendChild(space);
      allChars.push(space);
    }
  });

  return allChars;
}

// ─── Page-load animation sequence ────────────────────────────────────────────

function runPageLoadSequence() {
  const title = document.querySelector('.site-title');
  const tagline = document.querySelector('.site-tagline');
  const badge = document.querySelector('.site-header__meta');
  const navLinks = document.querySelectorAll('.category-nav__link');
  const sectionHeaders = document.querySelectorAll('.section-header');
  const cards = document.querySelectorAll('.spec-card');

  // Set initial states for GSAP-managed elements
  gsap.set(cards, { opacity: 0, y: 20 });
  gsap.set(navLinks, { opacity: 0, x: -8 });
  gsap.set([tagline, badge], { opacity: 0, y: 12 });

  // Preserve full text for screen readers before splitting into individual char spans
  title.setAttribute('aria-label', title.textContent.trim());

  // Split and hide title characters
  const chars = splitChars(title);

  const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Reveal title character by character
  masterTl.to(chars, {
    duration: 0.5,
    opacity: 1,
    stagger: 0.028,
    y: 0,
  });

  // 2. Tagline and badge fade in
  masterTl.to(
    [tagline, badge],
    {
      duration: 0.5,
      opacity: 1,
      stagger: 0.1,
      y: 0,
    },
    '-=0.25'
  );

  // 3. Nav links slide in from left
  masterTl.to(
    navLinks,
    {
      duration: 0.4,
      opacity: 1,
      stagger: 0.06,
      x: 0,
    },
    '-=0.3'
  );

  // 4. Section headers reveal on scroll
  sectionHeaders.forEach((header) => {
    ScrollTrigger.create({
      animation: gsap.from(header, {
        duration: 0.6,
        ease: 'power2.out',
        opacity: 0,
        y: 16,
      }),
      once: true,
      start: 'top 88%',
      trigger: header,
    });
  });

  // 5. Cards batch-reveal on scroll entry
  ScrollTrigger.batch(cards, {
    batchMax: 3,
    onEnter: (batch) =>
      gsap.to(batch, {
        duration: 0.5,
        ease: 'power2.out',
        opacity: 1,
        stagger: 0.07,
        y: 0,
      }),
    once: true,
    start: 'top 92%',
  });

  // Refresh ScrollTrigger after fonts load to fix position calculations
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

// ─── Entry point ─────────────────────────────────────────────────────────────

const reducedMotion = prefersReducedMotion();

initReducedMotion();
initClipboard(document.body);
initNavHighlight();

SECTIONS.forEach((section) => populateSection(section, reducedMotion));

if (!reducedMotion) {
  // rAF ensures one paint cycle has run so offsetWidth values are reliable
  requestAnimationFrame(() => runPageLoadSequence());
} else {
  // No page-load animation — remove initial CSS-hidden states immediately
  document.documentElement.classList.remove('js-ready');
}
