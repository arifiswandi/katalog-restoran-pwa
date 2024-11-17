class LoadingComponent extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      .loader-container {
        position: fixed;
        background-color: transparent;
        width: 100%;
        height: 100vh;
        z-index: 99;
        top: 0;
        display: block;
      }
      
      #loader {
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 1;
        width: 120px;
        height: 120px;
        margin: -76px 0 0 -76px;
        border: 12px solid #ffcc00;
        border-radius: 50%;
        border-top: 16px solid #252B48;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2.5s linear infinite;
      }
      
      @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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
        <div class="loader-container" id="loader-container">
          <div id="loader"></div>         
        </div>
      `;
  }
}

customElements.define('loading-component', LoadingComponent);