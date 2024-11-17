const assert = require('assert');

Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('post a restaurant review', async ({ I }) => {
  const reviewText = '  Penasaran Om ijin coba ya.....';
  I.amOnPage('/');
  I.waitForElement('.restaurant-item', 20);
  I.seeElement('.restaurant-item');
  I.click(locate('.restaurant-item').first());
  I.waitForElement('#form-review', 20);
  I.seeElement('#form-review');
  I.fillField('#inputName', 'Julit');
  I.fillField('#inputReview', reviewText);
  I.click('#submitReview');
  I.waitForElement('.restaurant-review', 20);

  const lastReview = locate('.restaurant-review .review-comment p').last();
  const lastReviewText = await I.grabTextFrom(lastReview);
  assert.strictEqual(reviewText, lastReviewText);
});
