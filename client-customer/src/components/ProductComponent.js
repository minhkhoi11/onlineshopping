import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="inline bg-white shadow-xl drop-shadow-xl shadow-inner m-5 p-4 rounded-lg hover:scale-105 hover:text-lg hover:font-bold border-2">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px"  className='border-4 border-white' alt="" /></Link>
            <figcaption className="text-left font-medium bg-white p-1 mt-3">{item.name}<br /></figcaption>
            <figcaption className="text-left font-bold text-red-500 bg-white pl-2 pr-2 rounded-md border-2 border-red-200 shadow-md">{item.price} $</figcaption>
          </figure>
        </div>
      );
    });
    return (
      <div className="text-center pt-3 pb-3">
        <h2 className="text-center pt-3 pb-3 border-4 border-sky-200 text-3xl font-extrabold text-white rounded-md bg-gradient-to-r from-sky-400 to-sky-700">PRODUCT LIST</h2>
        {prods}
      </div>
    );
  }
  componentDidMount() { // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    }else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) { // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    }else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}
export default withRouter(Product);