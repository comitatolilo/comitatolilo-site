// Tema: preferenza utente o sistema
(function() {
  const root = document.documentElement;
  const storageKey = 'theme';
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  function apply(t){ root.setAttribute('data-theme', t); }

  const stored = localStorage.getItem(storageKey);
  apply(stored === 'light' || stored === 'dark' ? stored : (mq.matches ? 'dark' : 'light'));

  mq.addEventListener?.('change', e => {
    if (!localStorage.getItem(storageKey)) apply(e.matches ? 'dark' : 'light');
  });

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem(storageKey, next);
  });
})();

// Sidebar: apri/chiudi, ESC, chiusura su click link interni
(function() {
  const sidebar  = document.getElementById('sidebar');
  const openBtn  = document.getElementById('openMenu');
  const closeBtn = document.getElementById('closeMenu');

  function open(){ sidebar?.classList.add('open'); sidebar?.setAttribute('aria-hidden','false'); }
  function close(){ sidebar?.classList.remove('open'); sidebar?.setAttribute('aria-hidden','true'); }

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  sidebar?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      const sameOrigin = a.origin === location.origin;
      if (a.getAttribute('href')?.startsWith('#') || sameOrigin) close();
    });
  });
})();
