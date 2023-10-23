const express = require('express');
const User = require('../models/user');
const jwtUtil = require('../helpers/jwtUtil');
const bcrypt = require('bcryptjs');

const router = new express.Router();

// Sign up new user 
router.post('/users', async (req, res) => {
    try {
        const existingUser = await User.findOne({username: req.body.username});
        if (existingUser) {
            return res.status(400).send({message: "Username already registered"})
        }
        const user = await User.create(req.body);

        //Generate token
        const token = jwtUtil.generateToken(user);

        res.status(201).json({username: user.username, auth: true, token:token});

        console.log(user);
    } catch (error) {
        console.log("The error is... ",error.message);
        res.status(500).json({message: error.message});
    }
});

router.post('/login', async (req, res) => {
    try {
        // find user by username
        const user = await User.findOne({ username: req.body.username });

        if(!user) {
            console.error(`Login attempt failed for username: ${req.body.username}`)
            return res.status(404).send({message: "user not found"});
            
           
        }

        // check if password matches
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        
        if (!isMatch) {
            return res.status(401).send({ message: "password does not match"})
        }

        const token = jwtUtil.generateToken(user);

        res.status(200).send({ username: user.username, auth: true, token: token })
        console.log("Logged in as " + user.username)

    } catch (error) {
        res.status(500).send({ message: error.message })
        console.error(error);
    }
});

module.exports = router;