class FooterComponent extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      :host {        
        display: block;
        min-width: 100%;
        min-height: 70px;
        margin: 0 auto;
        padding: 1.3em;
        background-color: #921A40;
        }
        
        div {
        text-align: center;
        font-size: 1.5em;
        color: #fff;
        font-style: italic;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
      <div>Restaurant Apps &copy; 2024 - Arif Iswandi</div>
    `;
  }
}

customElements.define('footer-component', FooterComponent);