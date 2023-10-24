const mongoose = require('mongoose');

const app = require('./app');

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const PORT = process.env.PORT || 3001;

mongoose.connect(`mongodb+srv://GlizzyWrld:${MONGO_PASSWORD}@cluster0.y27mvqu.mongodb.net/BarkDB?retryWrites=true&w=majority`).then(() => {
    app.listen(PORT, () => {
        console.log(`backend listening on port ${PORT}`)
    })
    console.log('connected to MongoDB')
}).catch((err) => {
    console.log(err)
})