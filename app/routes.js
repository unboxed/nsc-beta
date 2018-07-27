
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
                                   let n1 = p1.Policy_full_name.toLowerCase()
                                   let n2 = p2.Policy_full_name.toLowerCase()
                                   return (n1 === n2 ? 0 : (n1 < n2 ? -1 : 1))
                                }
                              )
  if (req.query.q) {
    let term = req.query.q.toLowerCase()
    policies = policies.filter((policy) => {
      return policy.Policy_full_name.toLowerCase().indexOf(term) >= 0
    })
  }

  res.render('search-v1/index', {
    policies: policies
  })
})

module.exports = router
