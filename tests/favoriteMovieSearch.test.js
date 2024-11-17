import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setrestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setrestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('makan a');

      expect(presenter.latestQuery).toEqual('makan a');
    });

    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('makan a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('makan a');
    });


    it('should show the restaurants found by Favorite Restaurants', () => {
      document.getElementById('restaurant-list').addEventListener('restaurant-list:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);

      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'makan a') {
          return [
            { id: 111, name: 'makan abc' },
            { id: 222, name: 'ada juga makan abcde' },
            { id: 333, name: 'ini juga boleh makan a' },
          ];
        }

        return [];
      });

      searchRestaurants('makan a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', () => {
      document.getElementById('restaurant-list').addEventListener('restaurant-list:updated', () => {
        const restaurantnames = document.querySelectorAll('.restaurant-name');

        expect(restaurantnames.item(0).textContent).toEqual('makan abc');
        expect(restaurantnames.item(1).textContent).toEqual('ada juga makan abcde');
        expect(restaurantnames.item(2).textContent).toEqual('ini juga boleh makan a');
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'makan a') {
          return [
            { id: 111, name: 'makan abc' },
            { id: 222, name: 'ada juga makan abcde' },
            { id: 333, name: 'ini juga boleh makan a' },
          ];
        }

        return [];
      });

      searchRestaurants('makan a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants('    ');

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', () => {
      document.getElementById('restaurant-list').addEventListener('restaurant-list:updated', () => {
        expect(document.querySelectorAll('.restaurant-item-not-found').length).toEqual(1);

      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('makan a');
    });

    it('should not show any restaurant', () => {
      document.getElementById('restaurant-list').addEventListener('restaurant-list:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);

      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('makan a');
    });
  });
});
