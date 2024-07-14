const { removeGallPhoto, getAllGallPhoto, uploadPhoto } = require('../Controller/galleryController');
const gallRoute = require('express').Router();


// =======================================
// File Upload with Multer
const path = require('path');
const multer = require('multer');

const fileLocation = 'uploads/';


const storage = multer.diskStorage({
    destination: fileLocation,

    filename: function (req, file, cb) {
        const cutExtention = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + cutExtention;
        cb(null, uniqueSuffix.toLocaleLowerCase())
    }
})

const upload = multer({ storage: storage })

//post images
gallRoute.post('/gallUpload',upload.single('avater'), uploadPhoto);

//get all gallrey 
gallRoute.get('/getAllGallPhoto', getAllGallPhoto)

//remove single gallrey
gallRoute.delete('/removeGallPhoto/:id', removeGallPhoto)

module.exports = gallRoute;
