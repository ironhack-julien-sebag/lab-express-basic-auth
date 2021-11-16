const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcrypt")

router.get("/signup", (req, res, next) => {
    res.render("signup")
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

    User.findOne({ username }).then(userFromDb => {
        if (userFromDb !== null) {
            res.render("signup", { message: "Your username is already taken" })
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
})

module.exports = router
