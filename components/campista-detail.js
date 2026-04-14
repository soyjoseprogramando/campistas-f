class CampistaDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._campista = null;
  }

  connectedCallback() {
    this.render();
    this.initEventListeners();
  }

  show(campista) {
    this._campista = campista;
    this.setAttribute('active', '');
    this.render();
  }

  hide() {
    this.removeAttribute('active');
  }

  render() {
    if (!this._campista) {
      this.shadowRoot.innerHTML = '<div></div>';
      return;
    }

    const { nombres, apellidos, identificacion, tipoSangre, rango, numero, contactoEmergencia } = this._campista;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          padding: 20px;
        }

        :host([active]) {
          display: block;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .detail-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .back-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          border-radius: 8px;
          transition: background-color 0.2s;
          font-size: 14px;
          gap: 4px;
        }

        .back-btn:hover {
          background-color: var(--background-soft);
        }

        .detail-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--text);
          margin: 0;
        }

        .detail-card {
          background-color: var(--background);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-section__label {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-section__value {
          font-size: 16px;
          color: var(--text);
          font-weight: 400;
        }

        .detail-section__value--large {
          font-size: 18px;
          font-weight: 600;
        }

        .blood-type-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 12px;
          background-color: var(--primary);
          color: white;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          width: fit-content;
        }

        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--primary);
          text-decoration: none;
          font-size: 16px;
          padding: 8px 0;
          transition: opacity 0.2s;
        }

        .contact-link:hover {
          opacity: 0.8;
        }

        .contact-link svg {
          width: 20px;
          height: 20px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .detail-container{
            max-width: 1200px;
            margin: 0 auto;
          }
          .info-grid {
            grid-template-columns: 1fr 1fr;
          }

          .detail-section--full {
            grid-column: 1 / -1;
          }
        }
      </style>

      <div class="detail-container">
        <div class="detail-header">
            <button class="back-btn" aria-label="Volver a la lista">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Volver
            </button>
            <h2 class="detail-title">${nombres} ${apellidos}</h2>
          </div>

          <div class="detail-card">
            <div class="detail-section detail-section--full">
              <span class="detail-section__label">Nombre completo</span>
              <span class="detail-section__value detail-section__value--large">${nombres} ${apellidos}</span>
            </div>

            <div class="info-grid">
              <div class="detail-section">
                <span class="detail-section__label">N° de identificación</span>
                <span class="detail-section__value">${identificacion}</span>
              </div>

              <div class="detail-section">
                <span class="detail-section__label">Tipo de sangre</span>
                <span class="blood-type-badge">${tipoSangre}</span>
              </div>

              <div class="detail-section">
                <span class="detail-section__label">Rango</span>
                <span class="detail-section__value">${rango}</span>
              </div>

              <div class="detail-section">
                <span class="detail-section__label">Número</span>
                <span class="detail-section__value">${numero}</span>
              </div>
            </div>

            <div class="detail-section detail-section--full">
              <span class="detail-section__label">Contacto de emergencia</span>
              <a href="tel:${contactoEmergencia}" class="contact-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                ${contactoEmergencia}
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initEventListeners();
  }

  initEventListeners() {
    const backBtn = this.shadowRoot.querySelector('.back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('back-to-list', { bubbles: true, composed: true }));
      });
    }
  }
}

customElements.define('campista-detail', CampistaDetail);