const query = window.matchMedia('(prefers-reduced-motion: reduce)');

export function prefersReducedMotion() {
  return query.matches;
}

export function initReducedMotion() {
  if (!query.matches) return;

  const banner = document.querySelector('.reduced-motion-banner');
  if (banner) banner.hidden = false;
}
