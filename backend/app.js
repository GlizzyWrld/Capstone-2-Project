require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());


const jwtUtil = require('./helpers/jwtUtil');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

app.use('/auth', authRoutes);
app.use('/users', jwtUtil.verifyToken, usersRoutes);

app.get("/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    )
})

module.exports = app;