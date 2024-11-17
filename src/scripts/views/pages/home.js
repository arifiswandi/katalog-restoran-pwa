import RestaurantDbSource from '../../data/restaurantdb-source.js';
import { createRestaurantListTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <hero-component></hero-component>
      <main id="main-content">
        <div class="label" id="label">Explore Restaurant</div>     
        <section id="restaurant-list" class="restaurant-list"></section>
      </main>
    `;
  },

  async afterRender() {
    const list = await RestaurantDbSource.restaurantList();
    const restaurantContainer = document.querySelector('#restaurant-list');
    list.restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantListTemplate(restaurant);
    });
    
    const loaderContainer = document.querySelector('loading-component');
    loaderContainer.style.display = 'none';
  },
};

export default Home;