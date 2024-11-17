import FavoriteRestaurantDB from '../../data/favorite-restaurant-idb';
import RestaurantDbSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-presenter.js';
import ReviewInitiator from '../../utils/review-initiator.js';
import { createRestaurantDetailTemplate } from '../templates/template-creator';

const detail = {
  async render() {
    return `     
      <main id="main-content">
        <section class="detail-content" id="detail-content" tabindex="0">        
          <h1 class="label">Restaurant Detail</h1>
          <div class="restaurant-detail" id="restaurant-detail"></div>
          <div id="customer-review-form-container"></div>          
          <div id="like-button-container"></div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { restaurant } = await RestaurantDbSource.detailRestaurant(url.id);

    const restaurantContainer = document.querySelector('#restaurant-detail');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    const loaderContainer = document.querySelector('loading-component');
    loaderContainer.style.display = 'none';

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#like-button-container'),
      favoriteRestaurant: FavoriteRestaurantDB,
      restaurant: restaurant,
    });

    ReviewInitiator.init({
      customerReviewContainer: document.querySelector('.detail-restaurant-review'),
      customerReviewFormContainer: document.querySelector('#customer-review-form-container'),
    });
  },
};

export default detail;