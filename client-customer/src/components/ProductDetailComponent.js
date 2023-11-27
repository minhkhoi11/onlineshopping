import axios from "axios";
import React, { Component } from "react";
import withRouter from "../utils/withRouter";
import MyContext from "../contexts/MyContext";
import './index.css'

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="align-center pt-3 pb-3">
          <h2 className="text-center pt-3 pb-3 border-4 border-sky-200 text-3xl font-extrabold text-white rounded-md bg-gradient-to-r from-sky-400 to-sky-700 ">PRODUCT DETAILS</h2>
          <figure className="caption-right">
            <img
            className="border-2 mt-3 mr-4 rounded-lg shadow-md drop-shadow-xl"
              src={"data:image/jpg;base64," + prod.image}
              width="400px"
              height="400px"
              alt=""
            />
            <figcaption>
              <form>
                
                <table className="info-section ml-10">
                  <div className="  bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg shadow-md drop-shadow-md">
                  <tbody>
                    
                    <div className=" border-red-500 mt-2 ml-2">
                    <tr className="font-extrabold text-sky-900 text-2xl">
                      <td className=''>{prod.name}</td>
                    </tr>
                    </div>

                    <div className=" border-red-500 mt-2 ml-2">
                    <tr className="font-bold">
                      <td className="">CATEGORY: {prod.category.name}</td>
                    </tr>
                    </div>

                    <div className=" border-red-500 mt-2 ml-2">
                    <tr className="font-bold">
                      <td>QUANTITY:
                        <input
                          className="ml-3 shadow-md pl-2 rounded border-2 drop-shadow-md"
                          type="number"
                          min="1"
                          max="99"
                          value={this.state.txtQuantity}
                          onChange={(e) => {
                            this.setState({ txtQuantity: e.target.value });
                          }}
                        />
                      </td>
                    </tr>
                    </div>

                    <div className="mt-2 ml-2">
                    <tr className="font-extrabold text-lg text-sky-900">
                      <td>PRICE: {prod.price} $</td>
                    </tr>
                    </div>
                  
                    <tr>
                      <td></td>
                      <td>
                        <input
                          className="font-bold hover:shadow-sky-200 hover:border-2 hover:border-sky-500 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-white hover:to-white pl-2 pr-2 m-5 rounded-lg shadow-md "
                          type="submit"
                          value="ADD TO CART"
                          onClick={(e) => this.btnAdd2CartClick(e)}
                        />
                      </td>
                    </tr>
                  </tbody>
                  </div> 
                </table>
                 
              </form>
            </figcaption>
          </figure>
        </div>
      );
    }
    return <div />;
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // apis
  apiGetProduct(id) {
    axios.get("/api/customer/products/" + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
    // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('OK BABY!');
    } else {
      alert('Please input quantity');
    }
  }
}
export default withRouter(ProductDetail);
