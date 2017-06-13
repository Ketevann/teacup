import axios from 'axios'

const filterProps = ['gluten free', 'vegan', 'Kettis pick!', 'unhealthy', 'chocolate', 'spicy', 'kosher', 'pickled']
const reducer = (state=filterProps, action) => {
  var newArr = state.slice()
  switch (action.type) {
  case ADD_FILTER:
  if(newArr.length===8)
    newArr=[]
    newArr.push(action.category)
    return newArr
  case REMOVE_FILTER:
    var ind = newArr.indexOf(action.category)
    newArr.splice(ind, 1)
    if(newArr.length===0)
      newArr = ['gluten free', 'vegan', 'Kettis pick!', 'unhealthy', 'chocolate', 'spicy', 'kosher', 'pickled'] 
    return newArr
  }
  return newArr

}

const ADD_FILTER = 'ADD_FILTER'
const REMOVE_FILTER = 'REMOVE_FILTER'

export const addFilter = category => ({
  type: ADD_FILTER, category
})

export const removeFilter = category => ({
  type: REMOVE_FILTER, category
})

export default reducer