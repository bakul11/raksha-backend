const gallDB = require("../Model/galleryModel");


//Photo Upload
exports.uploadPhoto = async (req, res, next) => {
    try {
        const imageLink = req.file.filename;

        const sendData = {
            photo: imageLink
        }

        const data = await gallDB.create(sendData);

        //success
        res.status(201).json({
            success: true,
            message: 'photo upload successfully done',
            data
        })

    } catch (error) {
        res.status(400).json({
            message: 'upload fail try aggain',
            error: error.message
        })
    }
}







//Get all Gallery Photo
exports.getAllGallPhoto = async (req, res, next) => {
    try {
        const gall = await gallDB.find();
        //success 
        res.status(201).send(gall)

    } catch (error) {
        res.status(400).json({
            message: 'খুঁজে পাইনি, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}


//Remove Single Gallrey Photo
exports.removeGallPhoto = async (req, res, next) => {
    try {
        const id = req.params.id;
        const findId = await gallDB.findById(id);
        if (!findId) {
            return res.status(404).json({
                message: 'আমরা এই আইডি খুঁজে পাচ্ছি না'
            })
        }

        const removePhoto = await gallDB.findByIdAndDelete(id);
        //success
        res.status(200).json({
            success: true,
            message: 'ছবি সফলভাবে মুছে ফেলা হয়েছে',
            removePhoto
        })
    } catch (error) {
        res.status(400).json({
            message: 'ডিলিট ব্যর্থ হয়েছেন, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}
