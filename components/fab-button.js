class FabButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initClickHandler();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          right: 16px;
          bottom: calc(60px + 16px);
          z-index: 100;
        }

        .fab {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 300;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .fab:hover,
        .fab:focus {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          outline: none;
        }

        .fab:active {
          transform: scale(0.98);
        }

        @media (min-width: 768px) {
          :host {
            display: none;
          }
        }
      </style>
      <button class="fab" aria-label="Agregar campista">
        <span>+</span>
      </button>
    `;
  }

  initClickHandler() {
    const fab = this.shadowRoot.querySelector('.fab');
    fab.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('fab-click', { bubbles: true, composed: true }));
    });
  }
}

customElements.define('fab-button', FabButton);
