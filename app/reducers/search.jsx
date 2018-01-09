import axios from 'axios'
import Promise from 'bluebird'
import store from '../store'

const initialState = {listnames: false}

/** *********** ACTIONS **********************/


/**  *********** REDUCER **********************/
const searchNames = (state=initialState, action) => {
  switch (action.type) {

   case SEARCH:
        return {listnames: true, names: action.names}
      case CANCEL:
      return {listnames: false}
  default:
    return state
  }
}
const SEARCH = 'SEARCH'
const CANCEL = 'CANCEL'
export const searchProduct = (names) => ({ type: SEARCH, names})
export const cancelSearch = () => ({ type: CANCEL})


export default searchNames

