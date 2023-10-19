const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
    
});

//  Hash password before saving it to database
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, 12, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});


userSchema.methods.checkPassword = function(password, callback) {
    bcrypt.compare(password, this.password, callback);
}

const User = mongoose.model('User', userSchema);

module.exports = User;