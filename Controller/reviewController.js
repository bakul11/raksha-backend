const reviewDB = require("../Model/reviewModel");

//Post Review
exports.postReview = async (req, res, next) => {
    try {
        const review = await reviewDB.create(req.body);
        //success 
        res.status(201).json({
            success: true,
            message: 'রিভিউ সফলভাবে সম্পন্ন হয়েছে',
            review
        })
    } catch (error) {
        res.status(400).json({
            message: 'ব্যর্থ হয়েছেন, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}

//Get all Review
exports.getAllReview = async (req, res, next) => {
    try {
        const review = await reviewDB.find();
        //success 
        res.status(201).send(review)

    } catch (error) {
        res.status(400).json({
            message: 'আমরা খুঁজে পাচ্ছি না',
            error: error.message
        })
    }
}

//Remove Single Review
exports.removeReview = async (req, res, next) => {
    try {
        const id = req.params.id;
        const findId = await reviewDB.findById(id);
        if (!findId) {
            return res.status(404).json({
                message: 'আমরা এই আইডি খুঁজে পাচ্ছি না'
            })
        }

        const removeReview = await reviewDB.findByIdAndDelete(id);
        //success
        res.status(200).json({
            success: true,
            message: 'রিভিউ সফলভাবে ডিলিট করা হয়েছে',
            removeReview
        })
    } catch (error) {
        res.status(400).json({
            message: 'ব্যর্থ হয়েছেন, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}
