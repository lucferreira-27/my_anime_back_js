var express = require('express');
const { response } = require('../server.js');
var router = express.Router();
const axios = require('axios').default;
const samples = require("../service/samples.js")
const getStatiscs = (url) => {
    return new Promise((resolve, reject) => {
        samples(url)
        .then((value) => resolve({ ...value, url }))
        .catch(({ message }) => {
            reject({ message, url })
        })
    })

}


const validation = (request, response, next) =>{

    const sendBadRequest = (error) =>{
        response.statusCode = 400
        return  response.send(error)
    }

    const isValidUrl = (sample) => sample.match(/^(http?s:\/\/myanimelist.net\/)|(http?s:\/\/web\.archive\.org)/g)
    const { urls } = request.body

    if(!urls){
        return sendBadRequest({ error: { msg: "No body sended"} })
    }
    if(urls.length === 0){
        return  sendBadRequest({ error: { msg: "Array 'urls' is empty"} })
    }
    if(!urls.every(isValidUrl)){
        return  sendBadRequest({ error: { msg: "Array contains invalid url"} })
    }
    request.urls = urls
    next()
}

router.use(validation)

router.post('/', async function ({urls}, res) {
    
    const samples = (await Promise.allSettled(urls.map(getStatiscs))).map(({status,reason,value}) => {
        if (status == 'rejected') {
            if(reason.message.includes("404")){
                res.statusCode = 404
            }
            return { error: { msg: reason.message, url: reason.url } }
        }
        return value
    })
 
    return res.send(samples);
});

module.exports = router;
