import axios from 'axios'

const initialState = { all: [], search: false, val: null,  path: null }

const reducer = (state = initialState, action) => {
  //var newState = Object.assign({}, state)
  var newState = Object.assign({}, state)

  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, all: action.products, search: false }
    case DEL_PRODUCTS:
    console.log(state, 'state')
      var arr = state.all.filter(product => product.id !== action.id)

      return arr

    case UPDATE_PRODUCT:
      return state.map(product => (
        action.product.id === product.id ? action.product : product
      ))
    case ADD_PRODUCT:
      return [...state, action.product]
    case FIND:
      return {...state,  all: state.all, search: true, val: action.val }
    case REMOVE_FILTER:
      return {...state,  all: state.all, search: false }
    case UPDATE_PATH:

      return { ...state, path: action.payload }

  }

  return state

}

const UPDATE_PATH = 'UPDATE_PATH'
export const updatePath = (bool) => ({ type: UPDATE_PATH, payload: bool })

//get all prodcuts
const GET_PRODUCTS = 'GET_PRODUCTS'
export const getAllProducts = products => ({ type: GET_PRODUCTS, products })

//delete a specific product
const DEL_PRODUCTS = 'DEL_PRODUCTS'
const removeProduct = (id) => ({ type: DEL_PRODUCTS, id })

//update  a specific product
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const update = (product) => ({ type: UPDATE_PRODUCT, product })

//add a new product
const ADD_PRODUCT = 'ADD_PRODUCT'
const add = (product) => ({ type: ADD_PRODUCT, product })

//search a product
const FIND = 'FIND'

//remove search filter and get all prdoducts
export const search = (val) => ({ type: 'FIND', val })

const REMOVE_FILTER = ' REMOVE_FILTER'

export const filterRemove = () => ({ type: REMOVE_FILTER })


//load all products
export const loadProducts = () => {
  return dispatch =>
    axios.get('/api/products')
      .then((products) => dispatch(getAllProducts(products.data)))
      .catch(console.err)
}

//add products
export const addProducts = (data) =>
  dispatch =>
    axios.post('/api/products', data)
      .then((products) => dispatch(add(products.data)))
      .catch(console.err)


//delete a specific product
export const deleteProduct = (productId) =>
  dispatch =>
    axios.delete(`/api/products/${productId}`)
      .then(() => dispatch(removeProduct(productId)))
      .catch(console.error())


//update a specific product
export const updateProduct = (id, data) =>
  dispatch =>
    axios.put(`/api/products/${id}`, data)
      .then((products) => dispatch(update(products.data)))
      .catch(console.error())


export default reducer
