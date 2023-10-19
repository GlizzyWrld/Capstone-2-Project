const mongoose = require('mongoose');

const app = require('./app');

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

mongoose.connect(`mongodb+srv://GlizzyWrld:${MONGO_PASSWORD}@cluster0.y27mvqu.mongodb.net/BarkDB?retryWrites=true&w=majority`).then(() => {
    app.listen(3001, () => {
        console.log('backend listening on port 3001')
    })
    console.log('connected to MongoDB')
}).catch((err) => {
    console.log(err)
})