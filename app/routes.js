
var search = require('./search');

const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Add your routes here - above the module.exports line

router.get('/search', function (req, res) {
  let policies = search.policies.sort(
                                (p1, p2) => {
                                   let n1 = p1.Condition.toLowerCase()
                                   let n2 = p2.Condition.toLowerCase()
                                   return (n1 === n2 ? 0 : (n1 < n2 ? -1 : 1))
                                }
                              )
  if (req.query.term && req.query.term.trim() !== "" ) {
    let term = req.query.term.toLowerCase()
    policies = policies.filter((policy) => {
      return policy.Condition.toLowerCase().indexOf(term) >= 0
    })
  }

  if (req.query.who_filter && req.query.who_filter !== "None") {
    policies = policies.filter((policy) => {
      return req.query.who_filter.split(",").includes(policy.Type)
    })
  }

  if (req.query.status_filter&& req.query.status_filter !== "None") {
    policies = policies.filter((policy) => {
      return req.query.status_filter.split(",").includes(policy.Recommendation_filter)
    })
  }

  res.render('search-v1/index', {
    policies: policies,
    who_filter: req.query.who_filter || 'None',
    status_filter: req.query.status_filter || 'None',
    term: req.query.term
  })
})

module.exports = router
