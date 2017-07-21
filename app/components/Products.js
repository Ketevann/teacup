import React from 'react'
import { Link } from 'react-router'
import {addFilter, removeFilter} from '../reducers/filter'
import store from '../store'
class Products extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler = (evt) =>{
      if(this.props.filtered.indexOf(evt.target.value)===-1||this.props.filtered.length===8)
              store.dispatch(addFilter(evt.target.value))
      else
              store.dispatch(removeFilter(evt.target.value))
  }

  render() {
    const divStyle = {
      width: 250,
      height: 230
    }

    let products = this.props.products.filter((prod)=> this.props.filtered.indexOf(prod.categories)!==-1)


    console.log('PROPS',this.props)
    return (
      <div className="container prodcuts">
        <div >
          <div >

          </div>
          <div >
          <h1 className="header">Products</h1>
          {
            products.length && products.map((product) => {
              return (
                <div key={product.id} className="col-md-4">
                <Link to={`/products/${product.id}`}>


                <img id="prodimg" style={divStyle} src={product.img} />
                  <p className="productinfo">{product.name} $ {product.price}</p>


                </Link>
                </div>
                )
            })
          }
      </div>
      </div>
      </div>

    )
  }
}

import {connect} from 'react-redux'

export default connect(
  state => ({products: state.products,
          filtered: state.filter}),
  {addFilter, removeFilter},
)(Products)
