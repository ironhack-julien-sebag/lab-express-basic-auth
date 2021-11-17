const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcrypt")

router.get("/signup", (req, res, next) => {
    res.render("signup")
})

router.get("/login", (req, res, next) => {
    res.render("login")
})

router.post("/signup", (req, res, next) => {
    const { username, password } = req.body

    // Validation
    if (password.length < 6) {
        res.render("signup", {
            message: "Your password must be at least 6 characters long",
        })
    }

    if (username.length === 0) {
        res.render("signup", { message: "Your username can't be empty" })
    }

    User.findOne({ username })
        .then(userFromDb => {
            if (userFromDb !== null) {
                res.render("signup", {
                    message: "Your username is already taken",
                })
            } else {
                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)

                User.create({ username, password: hash })
                    .then(createdUser => {
                        res.redirect("/")
                    })
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))
})

router.post("/login", (req, res, next) => {
    const { username, password } = req.body

    User.findOne({ username }).then(userFromDb => {
        if (userFromDb === null) {
            res.render("login", { message: "Invalid credentials" })
        }

        if (bcrypt.compareSync(password, userFromDb.password)) {
            req.session.user = userFromDb
            res.redirect("/profile")
        } else {
            res.render("login", { message: "Invalid credentials" })
        }
    })
})

router.get("/logout", (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            next(err)
        } else {
            res.redirect("/")
        }
    })
})

module.exports = router
