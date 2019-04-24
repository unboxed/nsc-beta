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

  if (query.who_filter && query.who_filter !== 'None') {
    policies = policies.filter((policy) => {
      return query.who_filter.split(',').includes(policy.Type)
    })
  }

  if (query.status_filter && query.status_filter !== 'None') {
    policies = policies.filter((policy) => {
      return query.status_filter.split(',').includes(policy.Recommendation_filter)
    })
  }

  return policies
}
