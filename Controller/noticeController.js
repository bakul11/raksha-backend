const noticeDB = require("../Model/noticeModel")


//post notice
exports.postNotice = async (req, res, next) => {
    try {
        const notice = await noticeDB.create(req.body);

        //success 
        res.status(201).json({
            success: true,
            message: 'নোটিশ সফলভাবে পাবলিশ হয়েছে',
            notice
        })

    } catch (error) {
        res.status(400).json({
            message: 'নোটিশ পাবলিশ ব্যর্থ হয়েছে, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}


//Get all Notice
exports.getAllNotice = async (req, res, next) => {
    try {
        const noticeALl = await noticeDB.find();
        //success 
        res.status(201).send(noticeALl)

    } catch (error) {
        res.status(400).json({
            message: 'আমরা খুঁজে পাচ্ছি না',
            error: error.message
        })
    }
}

//Remove Single Notice
exports.removeNotice = async (req, res, next) => {
    try {
        const id = req.params.id;
        const findId = await noticeDB.findById(id);
        if (!findId) {
            return res.status(404).json({
                message: 'আমরা এই আইডি খুঁজে পাচ্ছি না'
            })
        }

        const noticeRemove = await noticeDB.findByIdAndDelete(id);
        //success
        res.status(200).json({
            success: true,
            message: 'নোটিশ সফলভাবে ডিলিট করা হয়েছে',
            noticeRemove
        })
    } catch (error) {
        res.status(400).json({
            message: 'ব্যর্থ হয়েছেন, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}


//Get Single Notice

exports.noticeDetails = async (req, res, next) => {
    try {
        const id = req.params.id;
        const notice = await noticeDB.findById(id);
        if (!notice) {
            return res.status(404).json({
                message: 'notice not found'
            })
        }

        //success
        res.status(200).send(notice)

    } catch (error) {
        res.status(400).json({
            message: 'ব্যর্থ হয়েছেন, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}
