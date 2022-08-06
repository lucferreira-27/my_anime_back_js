var express = require('express');
var router = express.Router();
const axios = require('axios').default;


router.get('/', async function(req, res, next) {
  const {category,q} = req.query
  const url = `https://myanimelist.net/search/prefix.json?type=${category}&keyword=${q}&v=2`
  let {data: {categories}} = await axios.get(url)
  const items = categories[0].items.map(item => {
    let image_url = item.image_url.replace(/\/r\/[\dx]*/g,"")
    item.image_url = image_url
    return item

})
  console.log(items)
  return res.send(items);
});

module.exports = router;
