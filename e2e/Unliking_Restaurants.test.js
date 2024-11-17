const assert = require('assert');

Feature('Unliking Restaurants');

Before(({ I }) => {
	I.amOnPage('/#/favorite');
});

Scenario('showing empty unliked restaurants', ({ I }) => {
	I.seeElement('#query');
	I.see('Not Found Favorite Restaurant:)', '.restaurant-item-not-found');
});

Scenario('unliking one restaurant', async ({ I }) => {
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

	I.click(firstRestaurant);
	I.waitForElement('#like-button', 20);
	I.seeElement('#like-button');
	I.click('#like-button');
	I.amOnPage('/#/favorite');
	I.see('Not Found Favorite Restaurant:)', '.restaurant-item-not-found');
});