const data = require('./search_data').data

exports.filter = function (query) {
  let policies = data.sort(
    (p1, p2) => {
      let n1 = p1.Condition.toLowerCase()
      let n2 = p2.Condition.toLowerCase()
      return (n1 === n2 ? 0 : (n1 < n2 ? -1 : 1))
    }
  )
  function remove(array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
    }
  }
  function contains(target){
    var pattern = ["child", "antenatal", "adult", "newborn"]
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1)
  }

  if (query.term && query.term.trim() !== '') {
    let searchTerm = query.term.toLowerCase().trim()
    if (contains(searchTerm)) {
      let array = searchTerm.split(" ")
      let type = searchTerm.match(/(adult|child|newborn|antenatal)/)[0].toString()
      filteredPolicies = policies.filter((policy) => {
        return policy.Type.toLowerCase().indexOf(type) >= 0
        })
      remove(array, type)
      let term = array.toString()
      policies = filteredPolicies.filter((policy) => {
        return policy.Condition.toLowerCase().indexOf(term) >= 0
      })
    } else {
      let term = query.term.toLowerCase()
      policies = policies.filter((policy) => {
        return policy.Condition.toLowerCase().indexOf(term) >= 0
      })
    }
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
