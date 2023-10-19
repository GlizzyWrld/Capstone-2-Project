const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: String,
    fact: String
   
});

const Fact = mongoose.model('Fact', factSchema);

module.exports = Fact;

