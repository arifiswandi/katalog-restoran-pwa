import favoriteRestaurant from '../data/favorite-restaurant-idb';
import { createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate } from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurant = favoriteRestaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    try {
      if (await this._isRestaurantExist(id)) {
        this._renderLiked();
      } else {
        this._renderLike();
      }
    } catch (err) {
      console.error(`Error rendering like button for restaurant ${id}:`, err);
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

    const likeButton = document.querySelector('#like-button');
    likeButton.addEventListener('click', async () => {

      const { id } = this._restaurant;

      try {
        await this._favoriteRestaurant.putRestaurant(this._restaurant);
        this._renderButton();
      } catch (error) {
        console.log(`Error adding restaurant to favorites ${id}:`, error);
      }
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate();

    const likeButton = document.querySelector('#like-button');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;