import CONFIG from '../../global/config';
import DetailHelper from '../../utils/detail-helper';


const createRestaurantListTemplate = (restaurant) => `
  <article class="restaurant-item">
    <a href="#/detail/${restaurant.id}">
      <div class="card-image">
        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="image ${restaurant.name}">
        <div id="left">${restaurant.city}</div>
        <div id="right">★ ${restaurant.rating}</div>
      </div>
      <div class="card-content">
        <h1 class="restaurant-name">${restaurant.name}</h1>
        <p>${restaurant.description || '-'}...</p>
      </div>
    </a>
  </article>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="detail-restaurant">
    <img class="restaurant-picture lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="image ${restaurant.name}">
    <div class="detail-restaurant-info">
      <div class="detail-restaurant-name">
        <h2><i class="fas fa-store"></i> Restaurant Name</h2>
        <p class="restaurant-name">${restaurant.name}</p>
      </div>
      <div class="detail-restaurant-address">
        <h2><i class="far fa-compass"></i> Address</h2>
        <p>${restaurant.address}, ${restaurant.city}</p>
      </div>
      <div class="detail-restaurant-rate">
        <h2><i class="far fa-star"></i> Rating</h2>
        <p>${restaurant.rating}</p>
      </div>
    </div>
    <h2 class="restaurant-description-title">Description</h2>
    <p class="restaurant-description">${restaurant.description}</p>
  </div>
  <div class="restaurant-categories">
    ${restaurant.categories.map((category) => `<span class="restaurant-category-title">${category.name}</span>`).join('')}
  </div>

  <div class="detail-restaurant-menu">
    <h2>Menu</h2>
    <div class="restaurant-menu">
      <ul>
        <li><h3>Food</h3></li>
        ${restaurant.menus.foods.map((food) => `<li>
          <p><i class="fa-solid fa-utensils"></i> ${food.name}</p>
        </li>`).join('')}
      </ul>
      <ul>
        <li><h3>Beverage</h3></li>
        ${restaurant.menus.drinks.map((drink) => `<li>
          <p><i class="fas fa-cocktail"></i> ${drink.name}</p>
        </li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="restaurant-detail-review">
    <h2 class="restaurant-review-title">Customers Review</h2>
    ${DetailHelper.eachCustomerReview(restaurant)}
  </div>
`;

const createCustomerReviewTemplate = (customerReview) => `
  <div class="detail-restaurant-review">
    <div class="restaurant-review" id="restaurant-review">
        <div class="review-header">
            <p class="review-name"><i class="far fa-user"></i>  ${customerReview.name}</p>
            <p class="review-date">${customerReview.date}</p>
        </div>
        <div class="review-comment">
            <p><i class="far fa-comment"></i>  ${customerReview.review}</p>
        </div>
    </div>
  </div>
`;

const createCustomerReviewFormTemplate = () => `
  <form class="form-review" id="form-review">
    <h2>Submit Your Review</h2>
    <div class="form-group">
      <label for="inputName">Name:</label>
      <input id="inputName" type="text" class="form-control" placeholder="Your Name...">
    </div>
    <div class="form-group">
      <label for="inputReview">Review:</label>
      <input id="inputReview" type="text" class="form-control" placeholder="Your Review...">
    </div>
    <div class="form-group">
      <button id="submitReview" type="submit" class="submitReview">Submit</button>
    </div>
  </form>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="like-button" class="like">
  <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="like-button" class="like">
  <i class="fas fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantListTemplate,
  createRestaurantDetailTemplate,
  createCustomerReviewTemplate,
  createCustomerReviewFormTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};