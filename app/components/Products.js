import React from 'react'
import { Link } from 'react-router'
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
    this.clickHandler = this.clickHandler.bind(this)
    this.handleClick = this.handleClick.bind(this)



    //   this.state = {search: false, val:null}
  }


  clickHandler = (evt) => {
    // if(this.props.filtered.indexOf(evt.target.value)===-1||this.props.filtered.length===8)
    //   store.dispatch(addFilter(evt.target.value))
    // else store.dispatch(removeFilter(evt.target.value))
  }
  handleChange(value) {
  }

  componentDidMount() {
    store.dispatch(cancelSearch())
    store.dispatch(this.props.updatePath(true))

  }

  // componentDidMount() {

  // }
  componentWillUnmount() {
    store.dispatch(this.props.updatePath(false))

  }
  findWords = (text) => {
    if (typeof text[temp.length] === 'string') temp.push(text[temp.length])
    let complete = []

    for (var j = 0; j < products.length; j++) {
      if (text[0] === products[j][0]) {
      }
    }
    var news = []
    for (var m = 0; m < complete.length; m++) {
      if (complete[m].slice(0, text.length) === text) {
        news.push(complete[m])
      }
    }

    return news


  }

  checkSearchState = (text) => {
    if (text === '') {
      store.dispatch(cancelSearch())
    }
    else {
      const productsArray = this.findWords(text)
      store.dispatch(searchProduct(productsArray))

    }
  }

  someFunc = (name) => {
    var nameField = document.getElementById('search');
    nameField.value = name

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
  // search = (product) => {
  //   this.setState({search: true, val: product})
  // }
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

    return (
      <div className="container prodcuts">
        <h1 className="productsheader" onClick={() => { store.dispatch(filterRemove()) }}>All Products</h1>
        {this.props.auth && this.props.auth.role === 'admin' ?
          <h1>
            <Link to='/add'><button className="btn btn-default" >Add Products</button></Link></h1> : null}
        {this.props.products && this.props.products.search ?
          <div>{this.renderProduct(this.filter(this.props.products.val))}</div> :
          this.props.products.all ?
            <div>{this.renderProduct(this.props.products.all)}</div>
            : null
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
