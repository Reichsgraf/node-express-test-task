const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.userSignUp = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: password
        });

        await user.save();

        res.status(201).json({
            message: 'User has been created successfully.'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};

exports.userSignIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(401).json({
                message: 'You are not registered yet.'
            })
        }

        const authResult = await bcrypt.compare(req.body.password, user.password);

        if (authResult?.code !== '401') {
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, 'key', {
                expiresIn: "1h"
            })

            return res.status(200).json({
                token,
                expiresIn: 3600,
                user: user.email
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.userProfile = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.userData.email })

        res.status(200).json({
            user: user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
