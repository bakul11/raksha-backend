const { postReview, getAllReview, removeReview } = require('../Controller/reviewController');

const reviewRoute = require('express').Router();

//Post Review 
reviewRoute.post('/postReview', postReview)

//Get all Review  
reviewRoute.get('/getAllReview', getAllReview)

//Remove single Review
reviewRoute.delete('/removeReview/:id', removeReview)


module.exports = reviewRoute;
