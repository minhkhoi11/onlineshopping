import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td className='border-2 border-rose-900 bg-rose-100  font-sm'>{item._id}</td>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-sm'>{item.name}</td>
          <td className='border-2 border-rose-900 bg-rose-100  font-sm'>{item.price}</td>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-sm'>{new Date(item.cdate).toLocaleString()}</td>
          <td className='border-2 border-rose-900 bg-rose-100  font-sm'>{item.category.name}</td>
          <td className='border-2 border-rose-900 bg-white  font-sm'><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<span key={index}>| <b>{index + 1}</b> |</span>);
      } else {
        return (<span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>);
      }
    });
    return (
      <div>
        <div className="float-left mt-10">
          <h2 className="text-center font-extrabold text-2xl text-white p-1 border-2 border-rose-800 mb-2 bg-gradient-to-r from-rose-400 to-red-700">PRODUCT LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>ID</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Name</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Price</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Creation date</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Category</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Image</th>
              </tr>
              {prods}
              <tr>
                <td colSpan="6">{pagination}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        <div className="float-clear" />
      </div>
    );
  }
  updateProducts = (products, noPages, curPage) => { // arrow-function
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;