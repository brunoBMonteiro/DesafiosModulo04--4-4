const express = require('express')
const routes = express.Router()
const professors = require('./teachers')

routes.get('/', function (req, res) {
    return res.redirect("/professors")
})

routes.get('/professors', function (req, res) {
    return res.render("professors/index")
})

routes.get('/professors/create', function (req, res) {
    return res.render('professors/create')
})

routes.get('/professors/:id', professors.show)

routes.post("/professors", professors.post)

routes.get('/students', function (req, res) {
    return res.send("students")
})

module.exports = routes