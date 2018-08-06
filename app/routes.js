
var search = require('./search');

const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Add your routes here - above the module.exports line

router.get('/search_a', function (req, res) {
  let policies = search.filter(req.query)
  res.render('search-v1/index_a', {
    serviceNameOverride: ' ',
    policies: policies,
    who_filter: req.query.who_filter || 'None',
    status_filter: req.query.status_filter || 'None',
    term: req.query.term
  })
})

router.get('/search_b', function (req, res) {
  let policies = search.filter(req.query)
  res.render('search-v1/index_b', {
    serviceNameOverride: ' ',
    policies: policies,
    who_filter: req.query.who_filter || 'None',
    status_filter: req.query.status_filter || 'None',
    term: req.query.term
  })
})

module.exports = router
