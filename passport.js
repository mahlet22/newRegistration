const LocalStrategy = require("passport-local").Strategy
const { client } = require("./views/dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport")

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        client.query(`SELECT * FROM  food."Users" WHERE email = $1`, [email],
            (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res.rows);
                if (res.rows.length > 0) {
                    const user = res.rows[0];
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            console.log(err)
                            throw err;
                        }
                        if (isMatch) {
                            console.log('matched')

                            return done(null, user);
                        } else {
                            console.log('not matched')
                            return done(null, false, { message: "passport is not correct" });
                        }
                    });
                }
            })
    }
    passport.use(new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        },
        authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        client.query(`SELECT * FROM  food."Users" WHERE id = $1`, [id], (err, res) => {
            if (err) {
                throw err;
            }
            return done(null, res.rows[0]);
        })
    })
}

module.exports = initialize;