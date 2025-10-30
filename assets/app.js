// Tema: usa preferenza di sistema la prima volta; poi rispetta la scelta utente
(function initTheme(){
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    root.setAttribute('data-theme', stored);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener?.('change', e => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
})();

// Sidebar open/close
(function initSidebar(){
  const sidebar = document.getElementById('sidebar');
  const openBtn  = document.getElementById('openMenu');
  const closeBtn = document.getElementById('closeMenu');
  openBtn?.addEventListener('click', ()=>{
    sidebar?.classList.add('open');
    sidebar?.setAttribute('aria-hidden','false');
  });
  closeBtn?.addEventListener('click', ()=>{
    sidebar?.classList.remove('open');
    sidebar?.setAttribute('aria-hidden','true');
  });
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape') sidebar?.classList.remove('open');
  });
})();

// Theme toggle
(function initThemeToggle(){
  const root = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  btn?.addEventListener('click', ()=>{
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();
