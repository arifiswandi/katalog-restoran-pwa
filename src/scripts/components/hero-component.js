class HeroComponent extends HTMLElement {

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML += `  
      <div class="hero">  
        <div class="hero-content">
          <h1>place for various delicious foods and drinks</h1>
        </div>
      </div>
    `;
  }
}

customElements.define('hero-component', HeroComponent);