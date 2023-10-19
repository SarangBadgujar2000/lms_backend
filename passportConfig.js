var md5 = require("md5")
const LocalStrategy = require("passport-local");
const Users = require("./models/users");
const initializePassport = (passport) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (username, password, done) {
            Users.findOne({ email: username })
                .then(user => {
                    if (!user) { return done(null, false); }
                    if (user.password !== md5(password)) { return done(null, false); }
                    return done(null, user)
                })
                .catch(err => {
                    return done(err)
                })

        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Users.findById(id)
            done(null, user)

        } catch (error) {
            done(error, false)
        }
    })
}

const isAuthenticated=(req,res,next)=>{
    if(req.user) return next()
    res.status(403).json({
        status:403,
        message:"user is not authorized. Please login first"
    })
}

module.exports = {
    initializePassport,
    isAuthenticated
}