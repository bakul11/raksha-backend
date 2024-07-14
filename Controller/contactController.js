const contactDB = require("../Model/contactModel")

//Post Contact
exports.postContact = async (req, res, next) => {
    try {
        const contact = await contactDB.create(req.body);
        //success 
        res.status(201).json({
            success: true,
            message: 'সফল হয়েছে। অনুগ্রহ করে অপেক্ষা করুন আমরা আপনার সাথে যোগাযোগ করব',
            contact
        })
    } catch (error) {
        res.status(400).json({
            message: 'ব্যর্থ হয়েছেন, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}

//Get all Contact
exports.getAllContact = async (req, res, next) => {
    try {
        const contact = await contactDB.find();
        //success 
        res.status(201).send(contact)

    } catch (error) {
        res.status(400).json({
            message: 'ব্যর্থ হয়েছেন, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}
//Remove all Contact
exports.removeAllContact = async (req, res, next) => {
    try {
        const contact = await contactDB.find();
        const removeContact = await contactDB.deleteMany({ contact });
        //success 
        res.status(201).send(removeContact);

    } catch (error) {
        res.status(400).json({
            message: 'ব্যর্থ হয়েছেন, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}

//Remove Single Contact User
exports.removeContact = async (req, res, next) => {
    try {
        const id = req.params.id;
        const findId = await contactDB.findById(id);
        if (!findId) {
            return res.status(404).json({
                message: 'আমরা এই আইডি খুঁজে পাচ্ছি না'
            })
        }

        const removeUser = await contactDB.findByIdAndDelete(id);
        //success
        res.status(200).json({
            success: true,
            message: 'ব্যবহারকারী সফলভাবে মুছে ফেলা হয়েছে',
            removeUser
        })
    } catch (error) {
        res.status(400).json({
            message: 'ব্যর্থ হয়েছেন, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}
