var express = require('express');
var router = express.Router();
var backs = require('../database/controllers/backController')
var titles = require('../database/controllers/titleController')

router.get("/", (req, res) => {
    backs.findAll().then(backs => {
        res.statusCode = 200
        res.send(backs)
    }).catch(err => {
        res.statusCode = 500
        res.send(err)
    })
})

router.get("/:id", (req, res) => {
    res.statusCode = 200
    res.send("back")
})
router.post("/", async (req, res) => {
    const formBack = req.body
    const newBack = await backs.create(formBack)
    res.statusCode = 201
    return res.send(newBack)

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
