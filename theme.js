(function() {
  const STORAGE_KEY = 'theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
  }

  function applyTheme(theme) {
    if (theme === DARK_THEME) {
      document.documentElement.setAttribute('data-theme', DARK_THEME);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function getInitialTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return getSystemTheme();
  }

  function initTheme() {
    const theme = getInitialTheme();
    applyTheme(theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    updateToggleButton();
  }

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
  }

  function updateToggleButton() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const isDark = getCurrentTheme() === DARK_THEME;
    toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    toggleBtn.textContent = isDark ? '\u2600\ufe0f' : '\ud83c\udf19';
  }

  function initToggleButton() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', toggleTheme);
    updateToggleButton();
  }

  function initSystemThemeListener() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (!savedTheme) {
        applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        updateToggleButton();
      }
    });
  }

  // Initialize theme immediately to prevent FOUC
  initTheme();

  // Initialize toggle button when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initToggleButton();
      initSystemThemeListener();
    });
  } else {
    initToggleButton();
    initSystemThemeListener();
  }

  // Expose toggleTheme globally for the button onclick
  window.toggleTheme = toggleTheme;
})();
