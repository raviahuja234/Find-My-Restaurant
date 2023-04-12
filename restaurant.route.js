const restaurantController = require('../controllers/restaurant.controller')
const restaurantMiddleware = require('../middlewares/restaurant.middleware')

module.exports = function (app) {
    app.post('/api/restaurant/add', restaurantMiddleware.verifyReqBody, restaurantController.createRestaurant);

    app.get('/api/restaurant/', restaurantController.getAllRestaurants);

    app.get('/api/restaurant/categories', restaurantController.restaurantCategories);

    app.get('/api/restaurant/categories/:categoryName', restaurantController.particularCategory);

    app.get('/api/restaurant/:id', restaurantMiddleware.validateObjectId, restaurantController.getRestaurantByID);

    app.get('/api/restaurant/rating/:ratingValue', restaurantController.getRestaurantByRating);

    app.put('/api/restaurant/:id', restaurantMiddleware.verifyUpdateReqBody, restaurantController.updateDetails);

    app.delete('/api/restaurant/:id', restaurantMiddleware.validateObjectId, restaurantController.deleteRestaurantWithId);

    app.delete('/api/restaurant/', restaurantController.deleteAllRestaurants);
}