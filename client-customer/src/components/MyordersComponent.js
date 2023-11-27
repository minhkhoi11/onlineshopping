import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td className='text-left border-2 border-emerald-900 bg-gray-100 pl-2 pr-2 font-medium'>{item._id}</td>
          <td className='text-left border-2 border-emerald-900 bg-emerald-100 pl-2 pr-2 font-medium'>{new Date(item.cdate).toLocaleString()}</td>
          <td className='border-2 border-emerald-900 bg-gray-100 pl-2 pr-2 font-medium '>{item.customer.name}</td>
          <td className='border-2 border-emerald-900 bg-emerald-100 pl-2 pr-2 font-medium '>{item.customer.phone}</td>
          <td className='border-2 border-emerald-900 bg-gray-100 pl-2 pr-2 font-extrabold text-emerald-800'>{item.total} $</td>
          <td className='border-2 border-emerald-900 bg-emerald-100 pl-2 pr-2 font-bold'>{item.status}</td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td className='border-2 border-sky-900 bg-sky-100 pl-2 pr-2 font-medium'>{index + 1}</td>
            <td className='border-2 border-sky-900 bg-white pl-2 pr-2 font-medium'>{item.product._id}</td>
            <td className='border-2 border-sky-900 bg-sky-100 pl-2 pr-2 font-bold'>{item.product.name}</td>
            <td className='border-2 border-sky-900 bg-white pl-2 pr-2 font-medium'><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td className='border-2 border-sky-900 bg-sky-100 pl-2 pr-2 font-extrabold'>{item.product.price} $</td>
            <td className='border-2 border-sky-900 bg-white pl-2 pr-2 font-medium'>{item.quantity} </td>
            <td className='border-2 border-sky-900 bg-sky-100 pl-2 pr-2 font-extrabold'>{item.product.price * item.quantity} $</td>
          </tr>
        );
      });
    }
    return (
      <div>
        <div className="align-center mt-10 ">
          <h2 className="text-center font-extrabold text-2xl text-white p-1 border-2 border-emerald-800 mb-2 bg-gradient-to-r from-emerald-400 to-emerald-600">ORDER LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable border-2 border-red-500">
                <th className='bg-emerald-800 text-emerald-100  font-extrabold border-2 border-emerald-900'>ID</th>
                <th className='bg-emerald-800 text-emerald-100  font-extrabold border-2 border-emerald-900'>Creation date</th>
                <th className='bg-emerald-800 text-emerald-100  font-extrabold border-2 border-emerald-900 pl-3 pr-3'>Cust.name</th>
                <th className='bg-emerald-800 text-emerald-100  font-extrabold border-2 border-emerald-900 pl-3 pr-3'>Cust.phone</th>
                <th className='bg-emerald-800 text-emerald-100  font-extrabold border-2 border-emerald-900 pl-3 pr-3'>Total</th>
                <th className='bg-emerald-800 text-emerald-100  font-extrabold border-2 border-emerald-900 pl-3 pr-3'>Status</th>
              </tr>
              {orders}
            </tbody>
          </table>
        </div>
        {this.state.order ?
          <div className="align-center mt-10">
            <h2 className="text-center font-extrabold text-2xl text-white p-1 border-2 border-emerald-800 mb-2 bg-gradient-to-r from-sky-400 to-sky-700">ORDER DETAIL</h2>
            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>No.</th>
                  <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Prod.ID</th>
                  <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Prod.name</th>
                  <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Image</th>
                  <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Price</th>
                  <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Quantity</th>
                  <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Amount</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Myorders;