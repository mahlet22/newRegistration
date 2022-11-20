// imported library using npm
const express = require("express");
const path = require("path")
const app = express();
const bcrypt = require("bcrypt");
const { client } = require("./views/dbConfig");
const passport = require("passport")
const session = require("express-session")
const flash = require("express-flash")
const initializePassport = require("./passport");
const { create } = require("./views/db");
const { authenticate } = require("passport");
const method_override = require("method-override")

// passing our data to back end 

initializePassport(passport)

const users = [];
app.use(session({
    secret: "secret",

    resave: false,

    saveUninitialized: false

}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false })) // send data from out frond end to our server
app.set("view engine", "ejs")
app.use(method_override('_method'))
    // creating post to register
app.post("/register", checkUnAuthentication, async(req, res) => {
        const { email, lastname, firstname, phonenumber } = req.body
        try {
            const hasedPassword = await bcrypt.hash(req.body.password, 10);
            await create(`("name", "email", "password")`, [
                firstname + " " + lastname,
                email,
                hasedPassword
            ], "Users")

            res.redirect('/login')
        } catch (e) {
            console.log(e)
            res.redirect('/register')
        }
    })
    // create login 
app.post("/login", checkUnAuthentication, passport.authenticate('local', {
    successRedirect: "/index",
    // failureRedirect: "/login",
    // res.redirect('/index')
}));
// routes 
app.get('/index', checkAuthentication, (req, res) => {
    res.render("index.ejs");
});
app.get('/login', checkUnAuthentication, (req, res) => {
    res.render("login.ejs")
});
app.get('/register', checkUnAuthentication, (req, res) => {
    res.render("register.ejs")
});
app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect('/index')
    })
});

app.delete("/index", async(req, res) => {
    let deleteQuery = ` DELETE FROM customers WHERE email = ${email}`
    client.query(deleteQuery, (err, result) => {
        if (!err) {
            res.redirect('/login')
        } else { console.log(err.message) }
    })
    client.end;



});

// end routes 

// check of authentication tonot move to exaly loged in page 
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

function checkUnAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/index")
    }
    next()

}
// server 
app.listen(3000);
console.log('server listen at port 3000')