class HeaderComponent extends HTMLElement {

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <header>
      <div class="title">
        <picture>
          <img class="lazyload" data-src="./favicon.png" alt="icon home" height="70px" width="70px" />
        </picture>
        <h1>Restaurant Apps</h1>
      </div>
      <button aria-label="menu hamburger" id="menu" class="menu">☰</button>
      <nav id="drawer" class="nav">
        <ul class="nav_list">
          <li class="nav_item"><a href="#/home">Home</a></li>
          <li class="nav_item"><a href="#/favorite">Favorite</a></li>
          <li class="nav_item">
            <a href="https://www.linkedin.com/in/arif-iswandi-529520269/" rel="noreferrer noopener" target="_blank">About Us</a>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);