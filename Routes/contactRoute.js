const { getAllContact, postContact, removeContact, removeAllContact } = require('../Controller/contactController');
const contactRoute = require('express').Router();


//contact post 
contactRoute.post('/postContact', postContact)

//get all contact 
contactRoute.get('/getAllContact', getAllContact)

//remove single contact
contactRoute.delete('/removeContact/:id', removeContact)


module.exports = contactRoute;
