class AppSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initThemeToggle();
    this.initAddButton();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          position: fixed;
          left: 0;
          top: 0;
          width: 220px;
          height: 100vh;
          background-color: var(--background-soft);
          border-right: 1px solid var(--border);
          z-index: 40;
        }

        @media (min-width: 768px) {
          :host {
            display: flex;
            flex-direction: column;
          }
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .sidebar__header {
          padding: 20px 16px;
          border-bottom: 1px solid var(--border);
        }

        .sidebar__title {
          font-size: 18px;
          font-weight: 700;
          color: var(--secondary);
          margin: 0;
        }

        .sidebar__nav {
          flex: 1;
          padding: 16px 0;
        }

        .sidebar__nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .sidebar__nav li {
          margin-bottom: 4px;
        }

        .sidebar__nav button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
          font-size: 14px;
          font-family: "Inter", sans-serif;
          border-radius: 8px;
          transition: background-color 0.2s, color 0.2s;
        }

        .sidebar__nav button:hover {
          background-color: var(--background);
        }

        .sidebar__nav button.active {
          background-color: var(--secondary);
          color: white;
        }

        .sidebar__nav button.active svg {
          color: white;
        }

        .sidebar__nav svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .sidebar__theme {
          padding: 0 16px 16px;
          border-bottom: 1px solid var(--border);
        }

        .sidebar__theme button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: none;
          border: 1px solid var(--border);
          cursor: pointer;
          color: var(--text);
          font-size: 14px;
          font-family: "Inter", sans-serif;
          border-radius: 8px;
          transition: background-color 0.2s;
        }

        .sidebar__theme button:hover {
          background-color: var(--background);
        }

        .sidebar__theme svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .sidebar__footer {
          padding: 16px;
        }

        .sidebar__add {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 16px;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          font-family: "Inter", sans-serif;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }

        .sidebar__add:hover {
          opacity: 0.9;
        }

        .sidebar__add:active {
          transform: scale(0.98);
        }

        .sidebar__add svg {
          width: 20px;
          height: 20px;
        }
      </style>

      <div class="sidebar">
        <div class="sidebar__header">
          <h1 class="sidebar__title">Campistas</h1>
        </div>

        <nav class="sidebar__nav">
          <ul>
            <li>
              <button class="active" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </svg>
                <span>Campistas</span>
              </button>
            </li>
            <li>
              <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M16 2a1 1 0 0 1 .993 .883l.007 .117v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 1.993 -.117l.007 .117v1h6v-1a1 1 0 0 1 1 -1" />
                </svg>
                <span>Calendario</span>
              </button>
            </li>
            <li>
              <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10.828 9.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829" />
                  <path d="M8 7l0 .01" />
                  <path d="M18.828 17.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829" />
                  <path d="M16 15l0 .01" />
                </svg>
                <span>Grupos</span>
              </button>
            </li>
          </ul>
        </nav>

        <div class="sidebar__theme">
          <button id="theme-toggle" type="button" aria-label="Switch to dark theme">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
              <path d="M12 9a4 4 0 1 0 4 4a4 4 0 0 0 -4 -4" />
            </svg>
            <span id="theme-label">Tema oscuro</span>
          </button>
        </div>

        <div class="sidebar__footer">
          <button class="sidebar__add" type="button" aria-label="Agregar campista">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            <span>Agregar campista</span>
          </button>
        </div>
      </div>
    `;
  }

  initThemeToggle() {
    const toggleBtn = this.shadowRoot.getElementById('theme-toggle');
    const themeLabel = this.shadowRoot.getElementById('theme-label');
    if (!toggleBtn) return;

    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    const getCurrentTheme = () => {
      return document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
    };

    const updateToggleButton = () => {
      const isDark = getCurrentTheme() === DARK_THEME;
      toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      themeLabel.textContent = isDark ? 'Tema claro' : 'Tema oscuro';
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

  initAddButton() {
    const addBtn = this.shadowRoot.querySelector('.sidebar__add');
    addBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add-camper', { bubbles: true, composed: true }));
    });
  }
}

customElements.define('app-sidebar', AppSidebar);
