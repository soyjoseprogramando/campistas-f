class NavBottom extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initThemeToggle();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: var(--background);
          border-top: 1px solid var(--border);
          padding: 12px 0;
          z-index: 50;
        }

        @media (min-width: 768px) {
          :host {
            display: none;
          }
        }

        nav ul {
          display: flex;
          justify-content: space-around;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        nav li {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        nav svg {
          width: 24px;
          height: 24px;
          color: var(--text-secondary);
        }

        #theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          border-radius: 8px;
          transition: background-color 0.2s;
        }

        #theme-toggle:hover {
          background-color: var(--background-soft);
        }

        .nav__campers svg {
          color: var(--secondary);
        }

        .nav__campers {
          color: var(--secondary);
        }
      </style>
      <nav>
        <ul>
          <li>
            <button id="theme-toggle" type="button" aria-label="Switch to dark theme"></button>
          </li>
          <li class="nav__campers">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M16 2a1 1 0 0 1 .993 .883l.007 .117v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 1.993 -.117l.007 .117v1h6v-1a1 1 0 0 1 1 -1m3 8h-14v8.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16zm-9 4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1z" />
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10.828 9.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829" />
              <path d="M8 7l0 .01" />
              <path d="M18.828 17.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829" />
              <path d="M16 15l0 .01" />
            </svg>
          </li>
        </ul>
      </nav>
    `;
  }

  initThemeToggle() {
    const toggleBtn = this.shadowRoot.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    const getCurrentTheme = () => {
      return document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
    };

    const updateToggleButton = () => {
      const isDark = getCurrentTheme() === DARK_THEME;
      toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      toggleBtn.textContent = isDark ? '☀️' : '🌙';
    };

    toggleBtn.addEventListener('click', () => {
      const currentTheme = getCurrentTheme();
      const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

      if (newTheme === DARK_THEME) {
        document.documentElement.setAttribute('data-theme', DARK_THEME);
      } else {
        document.documentElement.removeAttribute('data-theme');
      }

      localStorage.setItem('theme', newTheme);
      updateToggleButton();
    });

    updateToggleButton();
  }
}

customElements.define('nav-bottom', NavBottom);
