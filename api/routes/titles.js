var express = require('express');
var router = express.Router();
var titles = require('../database/controllers/titleController')

router.get("/", (req, res) => {
    titles.findAll().then(Titles => {
        res.statusCode = 200
        res.send(Titles)
    }).catch(err => {
        res.statusCode = 500
        res.send(err)
    })
})

router.get("/:id", (req, res) => {
    res.statusCode = 200
    res.send("Title")
})
router.post("/", async (req, res) => {
    const formTitle = req.body
    const newTitle = await titles.create(formTitle)
    res.statusCode = 201
    return res.send(newTitle)
})

router.put("/:id", (req, res) => {
    res.statusCode = 200
    res.send(req.body)
})

router.delete("/:id", (req, res) => {
    res.statusCode = 200
    res.send(req.body)
})


module.exports = router;
