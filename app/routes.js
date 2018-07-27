
var search = require('./search');

const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Add your routes here - above the module.exports line

router.get('/search', function (req, res) {
  res.render('search-v1/index', { policies: search.policies })
})

module.exports = router
