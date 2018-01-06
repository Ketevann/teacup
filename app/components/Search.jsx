import React from 'react'
import { Link } from 'react-router'
import {
  deleteProduct, findProduct, search, filterRemove,

} from '../reducers/products'
import {
  cancelSearch, searchProduct
} from '../reducers/search'
import store from '../store'

const products = ['jasmine', 'apple', 'jam'];
var temp = [];

class Search extends React.Component {
  constructor(props) {
    super(props)

    //   this.state = {search: false, val:null}
  }

 componentDidMount() {
   store.dispatch(cancelSearch)
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

  filter = (products) => {
    console.log(Array.isArray(this.props.products.all), products, 'in filter', this.props.products.all)
    var filteredProducts = this.props.products.all.filter(product => {
      return product.categories.toLowerCase() === products.toLowerCase()

    })
    console.log(filteredProducts, 'filter')
    // this.setState()
    return filteredProducts;

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
    console.log(this.props, 'print search props')
    const divStyle = {
      width: 250,
      height: 230
    }
    // let products = this.props.products.filter((prod)=> this.props.filtered.indexOf(prod.categories)!==-1)
    { console.log(this.props, 'props') }
    return (
      <div className="container prodcuts">

        <form id="searchproducts" action="" onSubmit={(evt) => {
          evt.preventDefault()
          store.dispatch(search(evt.target.search.value))
          //this.filter(evt.target.search.value)
          //console.log(evt.target.value, evt.target)
          //          store.dispatch(findProduct(evt.target.search.value))
        }
        }>



          <input onChange={(evt) => console.log(this.checkSearchState(evt.target.value))

            // console.log(evt.target.value,' target')
          } id="search" type="text" name="searching" placeholder="Search" />
          <input id="searchsubmit" type="submit" />
        </form>
        <div className="autocomplete" >{this.props.searched && this.props.searched.listnames ?
          this.props.searched.names.map(names => {
            return <div id="names">{names}</div>

          })
          : null}</div>
      </div>

    )
  }
}

import { connect } from 'react-redux'



export default connect(
  state => ({
    products: state.products,
    filtered: state.filter, auth: state.auth,
    filter: state.filter,
    searched: state.searchNames
  }),
  { filterRemove, deleteProduct, search, searchProduct, cancelSearch },
)(Search)
