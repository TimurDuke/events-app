const express = require('express');
const {nanoid} = require("nanoid");
const axios = require("axios");
const config = require("../config");
const User = require('../models/User');
const auth = require("../middleware/auth");

const router = express.Router();

router.post('/invite', auth, async (req, res ) => {
    const { email } = req.body;
    const userId = req.user['_id'];

    if (email === req.user.email) {
        return res.status(400).send({message: "You cannot add yourself as a friend."});
    }

    try {
        const friend = await User.find({email});
        const user = await User.findById(userId);

        user.addToInvited({id: friend['_id'], email: friend['email']});
        friend.addToInviters({id: user['_id'], email: user['email']});

        await user.save({validateBeforeSave: false});
        await friend.save({validateBeforeSave: false});

        res.send({message: "Friend invited"});
    } catch (e) {
        res.status(404).send(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const { password, email, displayName } = req.body;

        const userData = { password, email, displayName};

        const user = new User(userData);

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const { email, password } = req.body;

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
        const { data } = await axios.get(debugTokenUrl);

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

        const removeInvited = user.removeFromInvited({id: friend['_id'], email: friend['email']});
        const removeInviters = friend.removeFromInviters({id: user['_id'], email: user['email']});

        if (!removeInvited || !removeInviters) {
            return res.status(404).send({message: "No user found with this id."});
        }

        await user.save({validateBeforeSave: false});
        await friend.save({validateBeforeSave: false});
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