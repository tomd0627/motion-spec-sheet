const RESET_DELAY_MS = 2000;

function setButtonCopied(btn) {
  btn.classList.add('is-copied');
  btn.setAttribute('aria-label', 'Copied!');

  const useEl = btn.querySelector('use');
  if (useEl) useEl.setAttribute('href', '#icon-check');
}

function resetButton(btn) {
  btn.classList.remove('is-copied');
  btn.setAttribute('aria-label', 'Copy code snippet');

  const useEl = btn.querySelector('use');
  if (useEl) useEl.setAttribute('href', '#icon-copy');
}

function copyText(text, btn) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setButtonCopied(btn);
        setTimeout(() => resetButton(btn), RESET_DELAY_MS);
      })
      .catch(() => legacyCopy(text, btn));
  } else {
    legacyCopy(text, btn);
  }
}

function legacyCopy(text, btn) {
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.insetInlineStart = '-9999px';
  document.body.appendChild(area);
  area.focus();
  area.select();

  try {
    document.execCommand('copy');
    setButtonCopied(btn);
    setTimeout(() => resetButton(btn), RESET_DELAY_MS);
  } catch (_) {
    // Silent fail — copy not available
  }

  document.body.removeChild(area);
}

export function initClipboard(container) {
  container.addEventListener('click', (event) => {
    const btn = event.target.closest('.copy-btn');
    if (!btn) return;

    const codeEl = btn.closest('.spec-card__code')?.querySelector('code');
    if (!codeEl) return;

    copyText(codeEl.textContent, btn);
  });
}
