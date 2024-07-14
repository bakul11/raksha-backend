const authDB = require("../Model/authModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register User
exports.registerUser = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await authDB.create(req.body);

        //success
        res.status(201).json({
            success: true,
            message: 'নিবন্ধন সফলভাবে সম্পন্ন হয়েছে',
            user
        })

    } catch (error) {
        res.status(400).json({
            message: 'নিবন্ধন ব্যর্থ হয়েছে, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}



//Login user
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await authDB.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message2: 'আপনার কোন অ্যাকাউন্ট নেই!'
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(404).json({
                message2: "আপনার পাসওয়ার্ড ভুল হয়েছে, আবার চেষ্টা করুন"
            })
        }

        const token = jwt.sign({ email: user?.email, id: user?._id }, process.env.LOGIN_TOKEN_KEY, {
            expiresIn: '10h'
        })

        //success 
        res.status(200).json({
            success: true,
            message: 'লগইন সফলভাবে সম্পন্ন হয়েছে',
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            message: 'লগইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}


//Active users 
exports.activeUser = (req, res) => {
    res.send(req.user)
}









// Find User Account 
exports.findAccount = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await authDB.findOne({ email });
        const userId = user?._id;

        if (!user) {
            return res.status(401).json({
                message: 'আপনার কোন অ্যাকাউন্ট নেই!'
            })
        }
        //successn/
        res.status(200).json({
            success: true,
            message: 'আপনার ইমেইলে পাসওয়ার্ড পাঠানো হয়েছে চেক করুন',
            userId
        })

        // Email sending System
        const SendEmail = () => {
            var SibApiV3Sdk = require('sib-api-v3-sdk');
            SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.EMAIL_SENDER_KEY;

            new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({

                "sender": { "email": "raskakorian678@gmail.com ", "name": "রাকসা কোরিয়ান ভাষা ট্রেনিং সেন্টার" },
                "subject": "আপনার পাসওয়ার্ড পুনরায় সেট করুন",
                "htmlContent": `
                
                <!DOCTYPE html>
                    <html>
                        <body style="width:60%;margin:auto;text-center">
                        <h1>রাকসা</h1>
                            <h5 class='color:'red'>দয়া করে আপনার পাসওয়ার্ড কাউকে শেয়ার করবেন না ।</h5>
                            <h5>নিচের বাটনে ক্লিক করুন</h5>
                            <a href='http://localhost:3000/forget-password' style="background-color:Tomato;border-radius:10px;text-align-center;color:white;padding:10px;text-decoration:none" target='_blank'>Set New Password</a>
                        </body>
                    </html>
                `,
                "messageVersions": [
                    {
                        "to": [
                            {
                                "email": `${user?.email}`,
                                "name": `${user?.userName}`,
                            }
                        ]

                    }
                ]

            }).then(function (data) {
                // console.log(data);
            }, function (error) {
                // console.error(error);
            });

        }
        //calling email sender function
        SendEmail()
    } catch (error) {
        //success
        res.status(404).json({
            message: 'আপনার প্রমাণীকরণ ব্যর্থ হয়েছে, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}

//Password Reset 
exports.resetPassword = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const findUserId = await authDB.findById(id);

        if (!findUserId) {
            return res.status(404).json({
                message: 'User Id not found'
            })
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);
        const updatePassword = await authDB.findByIdAndUpdate(id, req.body, {
            new: true
        })

        //success:
        res.status(201).json({
            success: true,
            message: 'পাসওয়ার্ড আপডেট সফলভাবে সম্পন্ন হয়েছে',
            updatePassword
        })


    } catch (error) {
        res.status(404).json({
            message: 'পাসওয়ার্ড আপডেট ব্যর্থ হয়েছে, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}


// Get All users
exports.getAllUsers = async (req, res, next) => {
    try {
        const user = await authDB.find();

        //success
        res.status(200).send(user)

    } catch (error) {
        res.status(400).json({
            message: 'ব্যবহারকারীদের খুঁজে পাওয়া যায়নি!',
            error: error.message
        })
    }
}

//Update profile 
exports.updateProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = await authDB.findById(id);

        if (!userId) {
            return res.status(404).json({
                message: 'Id not found'
            })
        }
        const updateUser = await authDB.findByIdAndUpdate(id, req.body, {
            new: true
        })
        //success 
        res.status(201).json({
            success: true,
            message: "প্রোফাইল আপডেট সফলভাবে সম্পন্ন হয়েছে!",
            updateUser
        })


    } catch (error) {
        res.status(400).json({
            message: 'আপডেট ব্যর্থ হয়েছে, আবার চেষ্টা করুন',
            error: error.message
        })
    }
}




//Remove Single User

exports.removeSingleUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const findId = await authDB.findById(id);
        if (!findId) {
            return res.status(404).json({
                message: 'আমরা এই আইডি খুঁজে পাচ্ছি না'
            })
        }

        const removeUser = await authDB.findByIdAndDelete(id);
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


//Make Admin 

exports.makeAdmin = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await authDB.findById(id);
        const adminUser = req.user;

        if (!user) {
            return res.status(404).json({
                message: 'User Id not found'
            })
        }

        const checkAdmin = adminUser?.role === 'admin';


        if (checkAdmin) {
            const makeAdmin = await authDB.findByIdAndUpdate(id, {
                $set: {
                    role: 'admin'
                }
            })
            //success 
            return res.status(201).json({
                success: true,
                message: 'অ্যাডমিন অ্যাক্সেস দেওয়া হয়েছে!',
                makeAdmin
            })
        } else {
            return res.status(201).json({
                message: 'you have not Admin access',
            })
        }




    } catch (error) {
        res.status(201).json({
            message: 'Admin access fail please try aggain!',
            error: error.message
        })
    }
}