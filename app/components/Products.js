import React from 'react'
import { Link } from 'react-router'
import { addFilter, removeFilter } from '../reducers/filter'
import { deleteProduct, findProduct } from '../reducers/products'
import store from '../store'


class Products extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
    this.handleClick = this.handleClick.bind(this)



    this.state = {search: false, val:null}
  }


  clickHandler = (evt) => {
    // if(this.props.filtered.indexOf(evt.target.value)===-1||this.props.filtered.length===8)
    //   store.dispatch(addFilter(evt.target.value))
    // else store.dispatch(removeFilter(evt.target.value))
  }

  handleClick = (id, action) => {
    if (action === 'delete')
      this.props.deleteProduct(id)
    else this.props.somefunc
  }
  filter = (products) => {
    console.log(this.props, products)
    var filteredProducts = this.props.products.filter(product => {
      return product.categories.toLowerCase() === products.toLowerCase()

    })
    console.log(filteredProducts, 'filter')
   // this.setState()
     return filteredProducts;

  }
search = (product) => {
  this.setState({search: true, val: product})
}
  renderProduct(allproducts) {

    return allproducts.map((product) => {

      return (
        <div key={product.id} className='col-md-4 col-sm-6' >
          <Link to={`/products/${product.id}`}>
            <img id="prodimg" src={product.img} />
            <p className="productinfo" data-price="{product.price}">{product.name} $ {product.price}</p>
          </Link>
          {this.props.auth && this.props.auth.role === 'admin' ?
            <button className="rmedit btn btn-default" onClick={() => this.handleClick(product.id, 'delete')}>Remove</button> : null}
          {this.props.auth && this.props.auth.role === 'admin' ?
            <Link to={`/update/${product.id}`}><button className="btn btn-default" >Edit</button></Link> : null}


        </div>
      )
    })
  }

  render() {
    const divStyle = {
      width: 250,
      height: 230
    }
    // let products = this.props.products.filter((prod)=> this.props.filtered.indexOf(prod.categories)!==-1)
    { console.log(this.props, 'props') }
    return (
      <div className="container prodcuts">
        <h1 className="productsheader" onClick={() => {this.setState({search:false})}}>All Products</h1>
        <form action="" onSubmit={(evt) => {
          evt.preventDefault()
          this.search(evt.target.search.value)
          //this.filter(evt.target.search.value)
          //console.log(evt.target.value, evt.target)
//          store.dispatch(findProduct(evt.target.search.value))
        }
        }>

          <input type="text" name="search" />
          <input type="submit" />
        </form>
        {this.props.auth && this.props.auth.role === 'admin' ?
          <h1>
            <Link to='/add'><button className="btn btn-default" >Add Products</button></Link></h1> : null}
        {this.state.search ?

          <div>{this.renderProduct(this.filter(this.state.val))}</div> :


          this.props.products ?
            <div>{this.renderProduct(this.props.products)}</div>
            : null
        }

      </div>

    )
  }
}

import { connect } from 'react-redux'
// const filterTea = (state, ownProps) => {
//   console.log(state.products, ' state in own !!!!!!!!',state.products.length)
//   if (state.products.length > 1){
//   const allProducts = state.products[0],
//           selected = state.products[1];
//           console.log(Array.isArray(allProducts), selected, '1234567890', allProducts)
//       var products = allProducts['0'].filter(product =>{
//       console.log(product)

//        return product.categories.toLowerCase() === selected.id.toLowerCase()
//       })
//   console.log(state, ' state in own', products, '@@@@@@')
//   return {products: products }
// }
// return {products: state.products[0] }
// }



export default connect(
  state => ({
    products: state.products,
    filtered: state.filter, auth: state.auth,
    filter: state.filter
  }),
  { addFilter, removeFilter, deleteProduct, findProduct },
)(Products)
