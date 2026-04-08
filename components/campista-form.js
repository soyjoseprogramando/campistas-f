class CampistaForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isOpen = false;
  }

  connectedCallback() {
    this.render();
    this.initEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        .bottom-sheet-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          z-index: 101;
        }

        .bottom-sheet-backdrop.active {
          opacity: 1;
          visibility: visible;
        }

        .bottom-sheet {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--background);
          border-radius: 16px 16px 0 0;
          transform: translateY(100%);
          transition: transform 0.3s ease, visibility 0.3s ease;
          visibility: hidden;
          z-index: 102;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        .bottom-sheet.active {
          transform: translateY(0);
          visibility: visible;
        }

        .bottom-sheet__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .bottom-sheet__header h2 {
          font-size: 18px;
          color: var(--text);
          font-weight: 600;
          margin: 0;
        }

        .bottom-sheet__close {
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
        }

        .bottom-sheet__close:hover {
          background-color: var(--background-soft);
        }

        .bottom-sheet__content {
          overflow-y: auto;
          padding: 20px;
          flex: 1;
        }

        .camper-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-row {
          display: grid;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: var(--text);
        }

        .form-group input,
        .form-group select {
          padding: 12px 14px;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 16px;
          font-family: "Inter", sans-serif;
          background-color: var(--background);
          color: var(--text);
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: var(--primary);
        }

        .form-group input::placeholder {
          color: var(--text-secondary);
        }

        .form-group select {
          cursor: pointer;
        }

        .form-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
        }

        .btn {
          padding: 14px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          font-family: "Inter", sans-serif;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
          border: none;
        }

        .btn:active {
          transform: scale(0.98);
        }

        .btn--primary {
          background-color: var(--primary);
          color: white;
        }

        .btn--primary:hover {
          opacity: 0.9;
        }

        .btn--secondary {
          background-color: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }

        .btn--secondary:hover {
          background-color: var(--background-soft);
        }

        @media (min-width: 768px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .bottom-sheet {
            left: 50%;
            top: 50%;
            bottom: auto;
            right: auto;
            width: min(600px, 90%);
            max-height: 90vh;
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }

          .bottom-sheet.active {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
            visibility: visible;
          }

          .bottom-sheet__content {
            padding: 24px;
          }
        }
      </style>

      <div class="bottom-sheet-backdrop"></div>
      <div class="bottom-sheet">
        <div class="bottom-sheet__header">
          <h2>Nuevo Campista</h2>
          <button class="bottom-sheet__close" aria-label="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
        <div class="bottom-sheet__content">
          <form class="camper-form">
            <div class="form-row">
              <div class="form-group">
                <label for="nombres">Nombres</label>
                <input type="text" id="nombres" name="nombres" required />
              </div>
              <div class="form-group">
                <label for="apellidos">Apellidos</label>
                <input type="text" id="apellidos" name="apellidos" required />
              </div>
            </div>
            <div class="form-group">
              <label for="identificacion">N° de identificación</label>
              <input type="text" id="identificacion" name="identificacion" required />
            </div>
            <div class="form-group">
              <label for="tipo-sangre">Tipo de sangre</label>
              <select id="tipo-sangre" name="tipoSangre" required>
                <option value="">Seleccionar</option>
                <option value="A+">A+</option>
                <option value="A-">A−</option>
                <option value="B+">B+</option>
                <option value="B-">B−</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB−</option>
                <option value="O+">O+</option>
                <option value="O-">O−</option>
              </select>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="rango">Rango</label>
                <input type="text" id="rango" name="rango" placeholder="Ej: Lobato, Scout, Caminante, Rover" required />
              </div>
              <div class="form-group">
                <label for="numero">Número</label>
                <input type="text" id="numero" name="numero" required />
              </div>
            </div>
            <div class="form-group">
              <label for="contacto-emergencia">Contacto de emergencia</label>
              <input type="tel" id="contacto-emergencia" name="contactoEmergencia" required />
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn--secondary btn-cancel">Cancelar</button>
              <button type="submit" class="btn btn--primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  initEventListeners() {
    const backdrop = this.shadowRoot.querySelector('.bottom-sheet-backdrop');
    const bottomSheet = this.shadowRoot.querySelector('.bottom-sheet');
    const closeBtn = this.shadowRoot.querySelector('.bottom-sheet__close');
    const cancelBtn = this.shadowRoot.querySelector('.btn-cancel');
    const form = this.shadowRoot.querySelector('.camper-form');
    const firstInput = this.shadowRoot.getElementById('nombres');

    const open = () => {
      this._isOpen = true;
      bottomSheet.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInput.focus(), 100);
    };

    const close = () => {
      this._isOpen = false;
      bottomSheet.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
      form.reset();
      this.dispatchEvent(new CustomEvent('form-close', { bubbles: true, composed: true }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = {
        nombres: formData.get('nombres'),
        apellidos: formData.get('apellidos'),
        identificacion: formData.get('identificacion'),
        tipoSangre: formData.get('tipoSangre'),
        rango: formData.get('rango'),
        numero: formData.get('numero'),
        contactoEmergencia: formData.get('contactoEmergencia')
      };

      console.log('Datos del campista:', data);
      this.dispatchEvent(new CustomEvent('camper-save', {
        bubbles: true,
        composed: true,
        detail: data
      }));
      close();
    };

    // Listen for open event from parent
    this.addEventListener('open-form', open);

    // Close handlers
    closeBtn.addEventListener('click', close);
    cancelBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    form.addEventListener('submit', handleSubmit);

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._isOpen) {
        close();
      }
    });
  }

  open() {
    this.dispatchEvent(new CustomEvent('open-form', { bubbles: true, composed: true }));
  }
}

customElements.define('campista-form', CampistaForm);
