const express = require('express');
const {nanoid} = require("nanoid");
const axios = require("axios");
const config = require("../config");
const User = require('../models/User');
const auth = require("../middleware/auth");

const router = express.Router();

router.post('/invite', auth, async (req, res) => {
    const validateEmail = value => {
        const pattern = /^([a-zA-Z0-9]+[_.]?[a-zA-Z0-9])+@([a-zA-Z]{2,5})\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

        return pattern.test(value);
    };

    const { email } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).send({message: "Email not valid!"});
    }

    const userId = req.user['_id'];

    if (email === req.user.email) {
        return res.status(400).send({message: "You cannot add yourself as a friend."});
    }

    try {
        const friend = await User.find({email});
        const user = await User.findById(userId);

        if (friend.length === 0) {
            return res.status(404).send({message: "User with this email not found!"});
        }

        const arr = user['invited'].find(user => user.id === friend[0]['_id'].toString());

        if (arr) {
            return res.status(400).send({message: "This user is already your friend."});
        }

        const friendData = {
            id: friend[0]['_id'],
            email: friend[0]['email']
        };

        const userData = {
            id: user['_id'],
            email: user['email']
        };

        user['invited'].push(friendData);
        friend[0]['inviters'].push(userData);

        await user.save({validateBeforeSave: false});
        await friend[0].save({validateBeforeSave: false});

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const {password, email, displayName} = req.body;

        const userData = {password, email, displayName};

        const user = new User(userData);

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        return res.status(401).send({message: "Email or password is wrong"});
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
        return res.status(401).send({message: "Email or password is wrong"});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send(user);
});

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body['accessToken'];
    const accessToken = config.fb.appId + '|' + config.fb.appSecret;

    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const {data} = await axios.get(debugTokenUrl);

        if (data.data.error) {
            return res.status(401).send({message: "Facebook token incorrect!"});
        }

        if (req.body.id !== data.data['user_id']) {
            return res.status(401).send({message: "Wrong user ID"});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            const userData = {
                email: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
            }

            user = new User(userData);
        }

        user.generateToken();
        await user.save({validateBeforeSave: false});

        res.send(user);
    } catch (e) {
        return res.status(401).send({message: "Facebook token incorrect!"});
    }
});

router.delete('/invite/:id', auth, async (req, res) => {
    const userId = req.user['_id'];
    const friendId = req.params.id;

    try {
        const friend = await User.findById(friendId);
        const user = await User.findById(userId);

        const friendInv = user['invited'].find(user => user.id === friend['_id'].toString());
        const friendIdx = user['invited'].indexOf(friendInv);

        const userInv = friend['inviters'].find(friend => friend.id === user['_id'].toString());
        const userIdx = friend['inviters'].indexOf(userInv);

        user['invited'].splice(friendIdx, 1);
        friend['inviters'].splice(userIdx, 1);

        await user.save({validateBeforeSave: false});
        await friend.save({validateBeforeSave: false});

        res.send(user);
    } catch (e) {
        res.status(404).send(e);
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({success, user});
});

module.exports = router;