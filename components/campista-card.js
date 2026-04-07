class CampistaCard extends HTMLElement {
  static get observedAttributes() {
    return ['nombre', 'apellido', 'identificacion', 'rango', 'edad', 'foto'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
    }
  }

  get nombre() {
    return this.getAttribute('nombre') || '';
  }

  get apellido() {
    return this.getAttribute('apellido') || '';
  }

  get identificacion() {
    return this.getAttribute('identificacion') || '';
  }

  get rango() {
    return this.getAttribute('rango') || '';
  }

  get edad() {
    return this.getAttribute('edad') || '';
  }

  get foto() {
    return this.getAttribute('foto') || 'https://i.pravatar.cc/150?img=1';
  }

  render() {
    const nombreCompleto = `${this.nombre} ${this.apellido}`.trim() || 'Sin nombre';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .camper {
          display: flex;
          gap: 12px;
          border-bottom: 1px solid var(--border);
          padding: 12px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .camper:hover {
          background-color: var(--background-soft);
        }

        .camper__photo {
          flex-shrink: 0;
        }

        .camper__photo img {
          width: 36px;
          height: 36px;
          border-radius: 20%;
          object-fit: cover;
        }

        .camper__info {
          flex: 1;
          min-width: 0;
        }

        .camper__name {
          color: var(--secondary);
          font-weight: 600;
          margin: 0 0 4px 0;
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .camper__details {
          display: flex;
          justify-content: space-between;
          gap: 4px;
          margin-top: 4px;
        }

        .camper__text {
          font-size: 12px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      </style>

      <article class="camper">
        <div class="camper__photo">
          <img src="${this.foto}" alt="${nombreCompleto}" />
        </div>
        <div class="camper__info">
          <p class="camper__name">${nombreCompleto}</p>
          <div class="camper__details">
            <p class="camper__text">${this.identificacion}</p>
            <p class="camper__text">${this.rango}</p>
            <p class="camper__text">${this.edad}</p>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define('campista-card', CampistaCard);
