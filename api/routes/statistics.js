var express = require('express');
const { response } = require('../server.js');
var router = express.Router();
const axios = require('axios').default;
const statistics = require("../service/statistics.js")
const getStatiscs = (url) => {
    return new Promise((resolve, reject) => {
        statistics(url)
        .then((value) => resolve({ ...value, url }))
        .catch(({ message }) => {
            reject({ message, url })
        })
    })

}

router.get('/', async function (req, res) {
    const { urls } = req.body
    const statistics = (await Promise.allSettled(urls.map(getStatiscs))).map(({status,reason,value}) => {
        if (status == 'rejected') {
            return { error: { msg: reason.message, url: reason.url } }
        }
        return value
    })
 
    return res.send(statistics);
});

module.exports = router;
