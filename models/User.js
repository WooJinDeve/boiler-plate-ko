const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRount = 10;

const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this;

    //비밀번호의 변경이 있을때만 변경 처리
    if (user.isModified('password')) {
        //비밀번호를 암호화시킨다.
        bcrypt.genSalt(saltRount, function (err, salt) {
            // 만약 에러가 날 경우 err를 반환
            if (err) return next(err)

            // 성공할경우 비밀번호를 hash value로 변환
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                //성공시 패스워드를 hash value로 변환
                user.password = hash
                next()
            })
        })
    } else {
        next();
    }
})


userSchema.methods.comparePassword = function (plainPassword, cb) {

    //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token

    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}


const User = mongoose.model('User', userSchema)

module.exports = { User }