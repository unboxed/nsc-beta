const data = require('./search_data').data

exports.filter = function (query) {
  let policies = data.sort(
    (p1, p2) => {
      let n1 = p1.Condition.toLowerCase()
      let n2 = p2.Condition.toLowerCase()
      return (n1 === n2 ? 0 : (n1 < n2 ? -1 : 1))
    }
  )
  if (query.term && query.term.trim() !== '') {
    let term = query.term.toLowerCase()
    policies = policies.filter((policy) => {
      return policy.Condition.toLowerCase().indexOf(term) >= 0
    })
  }

  if (query.whoFilter && query.whoFilter !== 'None') {
    policies = policies.filter((policy) => {
      return query.whoFilter.split(',').includes(policy.Type)
    })
  }

  if (query.statusFilter && query.statusFilter !== 'None') {
    policies = policies.filter((policy) => {
      return query.statusFilter.split(',').includes(policy.Recommendation_filter)
    })
  }

  return policies
}
