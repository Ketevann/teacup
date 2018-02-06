import React from 'react'
import { Link } from 'react-router'
import { BarLoader } from 'react-spinners';

import {
  deleteProduct, findProduct, search, filterRemove, updatePath

} from '../reducers/products'
import store from '../store'
import Search from './Search'
import {
  cancelSearch, searchProduct
} from '../reducers/search'

const products = ['jasmine', 'apple', 'jam'];
var temp = [];

class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.handleClick = this.handleClick.bind(this)
  }




  componentDidMount() {
    store.dispatch(this.props.updatePath(true))
  }


  componentWillUnmount() {
    store.dispatch(this.props.updatePath(false))
  }
  handleClick = (id, action) => {
    if (action === 'delete')
      this.props.deleteProduct(id)
    else this.props.somefunc
  }
  filter = (products) => {
    var filteredProducts = this.props.products.all.filter(product => {
      return product.categories.toLowerCase() === products.toLowerCase()
    })
    return filteredProducts;

  }

  renderProduct(allproducts) {
    return allproducts.map((product) => {
      if (product.length === 0) {
        return <div>Your search did not return any results</div>
      }

      return (
        <div key={product.id} className='col-md-4 col-sm-6 items' >
          <Link to={`/products/${product.id}`}>
            <img id="prodimg" src={product.img} />
            <p className="productinfo" data-price="{product.price}">{product.name} $ {product.price}</p>
          </Link>
          {this.props.auth && this.props.auth.role === 'admin' ?
            <button className="rmedit btn btn-default" onClick={() => this.handleClick(product.id, 'delete')}>Remove</button> : null}
          {this.props.auth && this.props.auth.role === 'admin' ?
            <Link to={`/update/${product.id}`}><button className="btn btn-default" >Edit</button></Link> :
            null}


        </div>
      )
    })
  }

  render() {
    console.log(this.props)
    const divStyle = {
      width: 250,
      height: 230
    }

    return (
      <div className="">
        <h1 className="productsheader" onClick={() => { store.dispatch(filterRemove()) }}>All Products</h1>

        {this.props.auth && this.props.auth.role === 'admin' ?
          <h1>
            <Link to='/add'><button className="btn btn-default" >Add Products</button></Link></h1> : null}
        {this.props.products && this.props.products.search ?
          <div>{this.renderProduct(this.filter(this.props.products.val))}</div> :
          this.props.products.all ?
            <div>{this.renderProduct(this.props.products.all)}</div>
            : <div className='sweet-loading'>
              <BarLoader
                color={'#123abc'}
                loading={this.state.loading}
              />
            </div>
        }
      </div>

    )
  }
}

import { connect } from 'react-redux'



const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    filtered: state.filter,
    auth: state.auth,
    filter: state.filter,
    searched: state.searchNames

  }
}
export default connect(
  mapStateToProps,
  {
    filterRemove,
    deleteProduct,
    search,
    searchProduct,
    cancelSearch,
    updatePath
  },
)(Products)
