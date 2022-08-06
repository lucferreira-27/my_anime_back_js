var express = require('express');
var router = express.Router();
const wayback = require("../service/wayback");
const statistics = require("../service/statistics")
const compareAll = (urls) => {
    return new Promise((resolve, reject) => {
        statistics(url)
        .then((value) => resolve({ ...value, url }))
        .catch(({ message }) => {
            reject({ message, url })
        })
    })

}
const compareBetween = (url1,url2) => {
    return new Promise(async (resolve, reject) => {
        let {statistics: firstResult} = await statistics(url1)
        let {statistics: secondResult} = await statistics(url2)
        let diffMembers = parseInt(secondResult.members.replace(",","")) - parseInt(firstResult.members.replace(",",""))
        resolve((diffMembers * parseInt(firstResult.members.replace(",",""))) / 100)

    })
}

const searchByDates = (url,config) =>{
    return new Promise((resolve,reject) =>{
        wayback(url,config).then((dates) =>{
            resolve(dates)
        }).catch(reject)
    })
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
        return res.send({error:{msg:error.message}})
    }
});

module.exports = router;
