
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
    policies: policies,
    whoFilter: req.query.who_filter || 'None',
    statusFilter: req.query.status_filter || 'None',
    term: req.query.term
  })
})

router.get('/search_b', function (req, res) {
  let policies = search.filter(req.query)

  res.render('search-v1/index_b', {
    policies: policies,
    whoFilter: req.query.who_filter || 'None',
    statusFilter: req.query.status_filter || 'None',
    term: req.query.term
  })
})

router.get('/search', function (req, res) {
  let policies = search.filter(req.query)

  res.render('topup/search', {
    policies: policies,
    whoFilter: req.query.who_filter || 'None',
    statusFilter: req.query.status_filter || 'None',
    term: req.query.term
  })
})


router.get('/search_c', function (req, res) {
  var search_c = require('./search_c')
  let policies = search_c.filter(req.query)
  res.render('search-v1/index_a', {
    policies: policies,
    whoFilter: req.query.who_filter || 'None',
    statusFilter: req.query.status_filter || 'None',
    term: req.query.term
  })
})


router.get('/v5-s0/admin-view/new-review-start', function (req, res) {
for (var a in req.query) req.session[a] = req.query[a];
res.render('v5-s0/admin-view/new-review-start');
});

router.get('/v5-s0/admin-view/new-review', function (req, res) {
for (var a in req.query) req.session[a] = req.query[a];
res.render('v5-s0/admin-view/new-review', {

'review_name' : req.session.review_name,

})
});

module.exports = router
