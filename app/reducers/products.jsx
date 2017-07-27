import axios from 'axios'

const initialState = []

const reducer = (state=initialState, action) => {

  switch (action.type) {
  case GET_PRODUCTS:
    return action.products
  case DEL_PRODUCTS:
    var arr = state.filter(product => product.id !== action.id)

    return arr

  case UPDATE_PRODUCT:
    return state.map(product => (
        action.product.id === product.id ? action.product : product
      ))
    case ADD_PRODUCT:
    return [...state, action.product]
  }
  return state

}
const GET_PRODUCTS = 'GET_PRODUCTS'
const DEL_PRODUCTS = 'DEL_PRODUCTS'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const ADD_PRODUCT =   'ADD_PRODUCT'




export const getAllProducts = products => ({
  type: GET_PRODUCTS, products
})
const removeProduct = (id) => ({type: DEL_PRODUCTS, id })
const update = (product) => ({type: UPDATE_PRODUCT, product })
const add = (product) => ({type: ADD_PRODUCT, product })



export const loadProducts = () =>
    dispatch =>
      axios.get('/api/products')
        .then((products) => dispatch(getAllProducts(products.data)))
        .catch(console.err)

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


export default reducer
