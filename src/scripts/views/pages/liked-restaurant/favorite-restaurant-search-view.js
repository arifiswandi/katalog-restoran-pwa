import { createRestaurantListTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
      <main id="main-content">
        <div class="loader-container" id="loader-container">
          <div id="loader"></div>
        </div>
        <div class="content">
          <h2 class="content-heading">Your Favorite Restaurant</h2>
          <div class="search">
            <input id="query" type="text" placeholder="Search Favorite Restaurant...">
          </div>
            <div id="restaurant-list" class="restaurant-list">
          </div>
        </div>
      </main>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants) {
    this._showFavoriteRestaurants(restaurants);
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;

    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantListTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurant-list').innerHTML = html;

    document.getElementById('restaurant-list').dispatchEvent(new Event('restaurant-list:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item-not-found">
        Not Found Favorite Restaurant:)
      </div>
    `;
  }
}

export default FavoriteRestaurantSearchView;
