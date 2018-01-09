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
    console.log(value);
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
    // console.log(temp, 'this is temp', text, "&&**")
    let complete = []
    // console.log(text, 'text', text.lenght, typeof text)
    //for (let i = 0; i < temp.length; i++) {
    //console.log('in loop')
    for (var j = 0; j < products.length; j++) {
      console.log('in loop', j, products[j], temp)
      //  console.log(text[i] === products[j][0], text[i] === products[j])
      if (text[0] === products[j][0]) {
        //console.log('equal', temp, products[j], temp.join(''), temp[0] === products[j][0],
        // products[j], j ,'jjjj', complete.indexOf(products[j]))
        if (complete.indexOf(products[j] === -1)) complete.push(products[j])
        //compare(temp.join(''), products[j], temp[i],j ,'jjjj')
        //}
      }
    }
    console.log('complete', complete)
    var news = []
    for (var m = 0; m < complete.length; m++) {
      // console.log('looop', complete[m].slice(0, text.length), text.length+1)
      if (complete[m].slice(0, text.length) === text) {
        //  console.log('texts are equal', complete[m])
        news.push(complete[m])
      }
      // else console.log('not equal')
    }

    return news

    // function compare(text, word) {
    //  console.log('text is right', text, word, text.length)
    //   for (let l = 0; l < text.length; l++) {
    //     //for (var k = l; k < text.length; k++) {
    //       if (text[l] === word[l]) {
    //         console.log(word, 'words are equal', text[l],' ***', word[l], text[l] === word[l])
    //      // }
    //     }
    //     else console.log('not equal')
    //   }
    // }
  }

  checkSearchState = (text) => {
    console.log('in checkstate', text)
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
    console.log(nameField, 'namefield', name)
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
    console.log(this.props, 'print props')
    const divStyle = {
      width: 250,
      height: 230
    }
    // let products = this.props.products.filter((prod)=> this.props.filtered.indexOf(prod.categories)!==-1)
    { console.log(this.props, 'props') }
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


const mapStateToProps = (state, ownProps) => {
  console.log(ownProps, 'che@ ')
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
