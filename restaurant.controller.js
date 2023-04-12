const Restaurant = require('../models/restaurant.model');



async function createRestaurant(req, res) {


    let restaurantObj = {
        'name': req.body.name,
        'description': req.body.description,
        'category': req.body.category.toUpperCase(),
        'imageURL': req.body.imageURL,
        'location': req.body.location,
        'phone': req.body.phone,
        'rating': req.body.rating,
    }

    try {

        const newRestaurant = await Restaurant.create(restaurantObj);
        return res.status(200).send(newRestaurant);

    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: 'Some error occured while creating the restaurant'
        })
    }
}


async function getAllRestaurants(req, res) {

    try {

        const allRestaurants = await Restaurant.find({});


        return res.status(200).send({
            restaurants: allRestaurants,
            message: 'Restaurants fectched successfully'
        })


    } catch (err) {

        res.status(500).send({
            message: 'some error occured while fetching the Restaurants'
        })
    }
}

async function restaurantCategories(req, res) {


    try {

        const allCategories = await Restaurant.distinct('category');

        return res.status(200).send(allCategories)

    } catch (err) {

        res.status(500).send({
            message: 'some error occured while fetching the Categories'
        })
    }

}

async function particularCategory(req, res) {

    try {

        const allRestaurants = await Restaurant.find({
            category: req.params.categoryName.toUpperCase()
        });

        return res.status(200).send(allRestaurants)

    } catch (err) {

        res.status(500).send({
            message: 'some error occured while fetching the Restaurant'
        })
    }
}

async function getRestaurantByID(req, res) {

    try {

        const oneRestaurant = await Restaurant.findById(req.params.id);

        if (oneRestaurant) {

            return res.status(200).send(oneRestaurant)

        } else {

            return res.status(404).send({
                message: 'No Restaurant found with the given ID'
            })

        }

    } catch (err) {

        res.status(500).send({
            message: 'some error occured while fetching the Restaurant'
        })

    }
}

async function getRestaurantByRating(req, res) {

    try {

        const restaurants = await Restaurant.find({ rating: { $gte: req.params.ratingValue } });

        return res.status(200).send(restaurants);


    } catch (err) {

        res.status(500).send({
            message: 'some error occured while fetching the Restaurant'
        })

    }

}

async function updateDetails(req, res) {

    try {

        const restaurant = await Restaurant.findOne({ _id: req.params.id })

        if (!restaurant) {
            return res.status(200).send({
                message: 'No Restaurant found for given ID.'
            })
        }

        restaurant.name = req.body.name != undefined ? req.body.name : restaurant.name;
        restaurant.description = req.body.description != undefined ? req.body.description : restaurant.description;
        restaurant.category = req.body.category != undefined ? req.body.category.toUpperCase() : restaurant.category;
        restaurant.imageURL = req.body.imageURL != undefined ? req.body.imageURL : restaurant.imageURL;
        restaurant.location = req.body.location != undefined ? req.body.location : restaurant.location;
        restaurant.phone = req.body.phone != undefined ? req.body.phone : restaurant.phone;
        restaurant.rating = req.body.rating != undefined ? req.body.rating : restaurant.rating;

        const updatedRestaurant = await restaurant.save();

        res.status(200).send({
            message: 'Restaurant updated successfully'
        })


    } catch (err) {

        res.status(500).send({
            message: 'some error occured while fetching the Restaurant'
        })

    }
}

async function deleteRestaurantWithId(req, res) {

    try {

        const deleteRestaurant = await Restaurant.findByIdAndDelete({ _id: req.params.id });

        if (deleteRestaurant) {
            return res.status(200).send({
                restaurant: deleteRestaurant,
                message: 'Restaurant deleted successfully'
            })

        } else {

            return res.status(200).send({
                restaurant: null,
                message: 'Restaurant deleted successfully'
            })
        }


    } catch (err) {

        res.status(500).send({
            message: 'some error occured while deleting the Restaurant'
        })

    }
}

async function deleteAllRestaurants(req, res) {

    const result = await Restaurant.deleteMany({});

    try {

        if (result.deletedCount == 0) {

            return res.status(200).send({
                restaurants: {
                    acknowledged: result.acknowledged,
                    deletedCount: 0
                },
                message: 'Restaurants deleted successfully'
            })

        } else {

            return res.status(200).send({
                restaurants: {
                    acknowledged: result.acknowledged,
                    deletedCount: result.deletedCount
                },
                message: 'Restaurants deleted successfully'
            })

        }


    } catch (err) {

        res.status(500).send({
            message: 'some error occured while deleting the Restaurant'
        })

    }
}



module.exports = {
    createRestaurant: createRestaurant,
    getAllRestaurants: getAllRestaurants,
    restaurantCategories: restaurantCategories,
    particularCategory: particularCategory,
    getRestaurantByID: getRestaurantByID,
    getRestaurantByRating: getRestaurantByRating,
    updateDetails: updateDetails,
    deleteRestaurantWithId: deleteRestaurantWithId,
    deleteAllRestaurants: deleteAllRestaurants,
}