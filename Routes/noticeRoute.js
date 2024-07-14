const { postNotice, getAllNotice, removeNotice, noticeDetails } = require('../Controller/noticeController');

const noticeRoute = require('express').Router();

//post notice
noticeRoute.post('/postNotice', postNotice);

//get all notice
noticeRoute.get('/getAllNotice', getAllNotice);

//remove single notice
noticeRoute.get('/noticeDetails/:id', noticeDetails);

//remove single notice
noticeRoute.delete('/removeNotice/:id', removeNotice);

module.exports = noticeRoute;