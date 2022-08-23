var express = require('express');
var router = express.Router();
const wayback = require("../service/wayback");
const samples = require("../service/samples")

const searchByDates = (url,config) =>{
    return wayback(url,config)
}


router.get('/compare', async function (req, res) {
    if(req.params.all){
        const {urls} = req.body
        compareAll(urls).then(() =>{

        })
    }else{
        const {firstUrl,secondUrl} = req.body
        let value = await compareBetween(firstUrl,secondUrl)
        console.log(value)
        res.send(value)
    }

});
router.get('/search', async function (req, res) {
    const {url,...config} = req.query
    if(!url) return res.send({msg: "Search must include url"})
    try{
        const waybacks = await searchByDates(url,config)
        return res.send(waybacks)
    }catch(error){
        res.statusCode = 500
        console.log(error)
        return res.send({error:{msg:error.message}})
    }
});

module.exports = router;
