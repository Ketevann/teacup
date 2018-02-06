import axios from 'axios'

const initialState = { all: [], search: false, val: null,  path: null }

const reducer = (state = initialState, action) => {
  //var newState = Object.assign({}, state)
  var newState = Object.assign({}, state)

  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, all: action.products, search: false }
    case DEL_PRODUCTS:
      var arr = state.procuts.filter(product => product.id !== action.id)

      return arr

    case UPDATE_PRODUCT:
      return state.map(product => (
        action.product.id === product.id ? action.product : product
      ))
    case ADD_PRODUCT:
      return [...state, action.product]
    case FIND:
    console.log('in FIND!!!!!', action.val)
      return {...state,  all: state.all, search: true, val: action.val }
    case REMOVE_FILTER:
      return {...state,  all: state.all, search: false }
    case UPDATE_PATH:

      return { ...state, path: action.payload }

  }

  return state

}
const SEARCH = 'SEARCH'
const CANCEL = 'CANCEL'

const UPDATE_PATH = 'UPDATE_PATH'
const GET_PRODUCTS = 'GET_PRODUCTS'
const DEL_PRODUCTS = 'DEL_PRODUCTS'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const FIND = 'FIND'
const REMOVE_FILTER = ' REMOVE_FILTER'

export const filterRemove = () => ({ type: REMOVE_FILTER })
// export const searchProduct = (names) => ({ type: SEARCH, names})
// export const cancelSearch = () => ({ type: CANCEL})


export const search = (val) => ({ type: 'FIND', val })
export const getAllProducts = products => ({ type: GET_PRODUCTS, products })
const removeProduct = (id) => ({ type: DEL_PRODUCTS, id })
const update = (product) => ({ type: UPDATE_PRODUCT, product })
const add = (product) => ({ type: ADD_PRODUCT, product })



export const loadProducts = () => {
  return dispatch =>
    axios.get('/api/products')
      .then((products) => dispatch(getAllProducts(products.data)))
      .catch(console.err)
}
export const addProducts = (data) =>
  dispatch =>
    axios.post('/api/products', data)
      .then((products) => dispatch(add(products.data)))
      .catch(console.err)



export const deleteProduct = (productId) =>
  dispatch =>
    axios.delete(`/api/products/${productId}`)
      .then(() => dispatch(removeProduct(productId)))
      .catch(console.error())



export const updateProduct = (id, data) =>
  dispatch =>
    axios.put(`/api/products/${id}`, data)
      .then((products) => dispatch(update(products.data)))
      .catch(console.error())


export const updatePath = (bool) => ({ type: UPDATE_PATH, payload: bool })
export default reducer
