class SkipComponent extends HTMLElement {

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML += `
				<a href="#main-content" class="skip-link">Skip to Content</a>  
      `;
  }
}

customElements.define('skip-component', SkipComponent);