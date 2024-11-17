const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
	I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
	I.seeElement('#query');
	I.see('Not Found Favorite Restaurant:)', '.restaurant-item-not-found');
});

Scenario('liking one restaurant', async ({ I }) => {
	I.see('Not Found Favorite Restaurant:)', '.restaurant-item-not-found');
	I.amOnPage('/');
	I.waitForElement('.restaurant-item', 20);
	I.seeElement('.restaurant-item');

	const firstRestaurant = locate('.restaurant-name').first();
	const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
	I.click(firstRestaurant);
	I.waitForElement('#like-button', 20);
	I.seeElement('#like-button');
	I.click('#like-button');
	I.amOnPage('/#/favorite');
	I.seeElement('.restaurant-item');

	const likedRestaurantName = await I.grabTextFrom('.restaurant-name');
	assert.strictEqual(firstRestaurantName, likedRestaurantName);
});


Scenario('searching restaurants', async ({ I }) => {
	I.see('Not Found Favorite Restaurant:)', '.restaurant-item-not-found');
	I.amOnPage('/');
	I.waitForElement('.restaurant-item', 10);
	I.seeElement('.restaurant-item');
	const names = [];

	for (let i = 1; i <= 3; i++) {
		I.click(locate('.restaurant-item').at(i));
		I.waitForElement('#like-button', 10);
		I.click('#like-button');
		names.push(await I.grabTextFrom('.restaurant-name'));
		I.amOnPage('/');
	}

	I.amOnPage('/#/favorite');
	I.seeElement('#query');

	const searchQuery = names[1].substring(1, 3);
	const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);

	I.fillField('#query', searchQuery);
	I.pressKey('Enter');

	const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
	assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

	matchingRestaurants.forEach(async (name, index) => {
		const visibleName = await I.grabTextFrom(locate('.restaurant-name').at(index + 1));
		assert.strictEqual(name, visibleName);
	});
});