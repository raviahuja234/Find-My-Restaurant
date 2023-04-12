const constants = require('../utils/constants');
const validator=require('validator');


function verifyReqBody(req, res, next) {

    if (Object.keys(req.body).length == 0) {
        return res.status(400).send({
            message: 'Content cannot be empty'
        })
    }

    if (!req.body.name) {
        return res.status(400).send({
            message: 'Restaurant name cannot be empty! Provide a name'
        })
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: 'Restaurant description cannot be empty! Provide a description'
        })
    }

    if (req.body.category) {
        const reqBodyCategory = req.body.category.toUpperCase();
        const restaurantCategory = [constants.restaurantCategory.dineout, constants.restaurantCategory.takeout];

        if (!restaurantCategory.includes(reqBodyCategory)) {
            return res.status(200).send({
                message: 'Category can only be Takeout | Dineout. Enter a valid Category'
            })
        }

    } else {

        return res.status(400).send({
            message: 'Restaurant category cannot be empty! Provide a category'
        })

    }


    if (!req.body.imageURL) {
        return res.status(400).send({
            message: 'imageURL cannot be empty! Provide a imageURL'
        })
    }

    if (!req.body.location) {
        return res.status(400).send({
            message: 'Restaurant location cannot be empty! Provide a location'
        })
    }

    if (!req.body.phone) {
        return res.status(400).send({
            message: 'Restaurant phone number cannot be empty! Provide a phone number'
        })
    }

    if (!req.body.rating) {
        return res.status(400).send({
            message: 'Restaurant rating cannot be empty! Provide a rating'
        })
    }

    next();

}


function verifyUpdateReqBody(req, res, next) {

    if (Object.keys(req.body).length == 0) {
        return res.status(400).send({
            message: 'Restaurant Data is required'
        })
    }

    if (!req.body.name) {
        return res.status(400).send({
            message: 'Restaurant name cannot be empty! Provide a name'
        })
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: 'Restaurant description cannot be empty! Provide a description'
        })
    }


    if (req.body.category) {
        const reqBodyCategory = req.body.category.toUpperCase();
        const restaurantCategory = [constants.restaurantCategory.dineout, constants.restaurantCategory.takeout];

        if (!restaurantCategory.includes(reqBodyCategory)) {
            return res.status(200).send({
                message: 'Category can only be Takeout | Dineout. Enter a valid Category'
            })
        }

    } else {

        return res.status(400).send({
            message: 'Restaurant category cannot be empty! Provide a category'
        })

    }

    if (!req.body.imageURL) {
        return res.status(400).send({
            message: 'imageURL cannot be empty! Provide a imageURL'
        })
    }

    if (!req.body.location) {
        return res.status(400).send({
            message: 'Restaurant location cannot be empty! Provide a location'
        })
    }

    if (!req.body.phone) {
        return res.status(400).send({
            message: 'Restaurant phone number cannot be empty! Provide a phone number'
        })
    }

    if (!req.body.rating) {
        return res.status(400).send({
            message: 'Restaurant rating cannot be empty! Provide a rating'
        })
    }

    next();

}

function validateObjectId(req, res, next) {

    if (!validator.isMongoId(req.params.id)) {
        return res.status(400).send({
            message: 'Invalid ID'
        })
    }

    next();
}




module.exports = {
    verifyReqBody: verifyReqBody,
    verifyUpdateReqBody: verifyUpdateReqBody,
    validateObjectId: validateObjectId,
}