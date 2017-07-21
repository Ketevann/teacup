import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateProduct, addProducts} from '../reducers/products'
import _ from 'lodash'





class Update extends React.Component {
  constructor(props) {
    super(props)
    //this.clickHandler = this.clickHandler.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  handleSubmit = (evt, id) =>{
    evt.preventDefault()
    let data = {}
    console.log( evt.target.img.value==="", " img")
    if ( evt.target.name !== "")
      data.name= evt.target.name.value
    if ( evt.target.inventory.value !== "")
      data.inventory= evt.target.inventory.value
    if ( evt.target.price.value !== "")
      data.price= evt.target.price.value
    if ( evt.target.inStock.value !== "")
        data.inStock= evt.target.inStock.value
    if ( evt.target.img.value !==""){
      data.img= evt.target.img.value
    console.log("not emplty")}
    // const data ={
    //   name: evt.target.name.value,
    //   inventory: evt.target.inventory.value,
    //   price: evt.target.price.value,
    //   inStock: evt.target.inStock.value,
    //   //img: evt.target.img.value

    // }
    if (this.props.path === '/add' && Object.keys(data).length ===5)
    this.props.addProducts(data)
    else if (this.props.path !== '/add')
    {
      console.log(this.props.product.id, "IDIDIDIIDID")
      this.props.updateProduct(this.props.product.id, data)}
      else {
        alert("Please input all fields")
      }
    evt.target.name.value = ""
    evt.target.inventory.value = ""
    evt.target.price.value = ""
    evt.target.inStock.value = ""
    evt.target.img.value = ""

  }
  render(){
  {console.log(this.props, 'prp')}
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 text-center">
            <div className="search-box">
              <div className="caption">
                {this.props.path === '/add' ?
                <h3>Add Product</h3>
                :
                <h3>Update Product</h3> }
                {this.props.product?
                <h4 id="prodname" style={{'color': '#fb044a'}}>{this.props.product.name}</h4>
                : null}
              </div>
              <form className="updateForm" onSubmit={(evt) => this.handleSubmit(evt)}>
                <div >
                  <input type="text" name="name" placeholder="Prodcut Name" className="form-control"  />
                  <input type="number" name="inventory" className="form-control" placeholder="quantity" />
                  <input type="number" step="0.1"  name="price" className="form-control" placeholder="price" />
                   <input type="text" name="inStock" className="form-control" placeholder="inStock" />
                   <input type="text" name="img" className="form-control" placeholder="imageUrl" />
                  <input type="submit" id="submit" className="form-control" defaultValue="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapState = (state, ownProps) => {
  console.log(ownProps, 'ownprop')
  const paramId = Number(ownProps.params.productId)
  return {
    product: _.find(state.products, product => product.id === paramId),
    state,
    path: ownProps.route.path
  }
  }
export default connect(mapState, {updateProduct, addProducts})(Update)
