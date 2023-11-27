import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item._id}</td>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{new Date(item.cdate).toLocaleString()}</td>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item.customer.name}</td>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item.customer.phone}</td>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item.total}</td>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item.status}</td>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>
            {item.status === 'PENDING' ?
              <div className='font-extrabold'><span className="link" onClick={() => this.lnkApproveClick(item._id)}>APPROVE</span> || <span className="link" onClick={() => this.lnkCancelClick(item._id)}>CANCEL</span></div>
              : <div />}
          </td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{index + 1}</td>
            <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item.product._id}</td>
            <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item.product.name}</td>
            <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item.product.price}</td>
            <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item.quantity}</td>
            <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <div>
        <div className="align-center mt-10">
          <h2 className="text-center font-extrabold text-2xl text-white p-1 border-2 border-rose-800 mb-2 bg-gradient-to-r from-rose-400 to-red-700">ORDER LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>ID</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Creation date</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Cust.name</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Cust.phone</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Total</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Status</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Action</th>
              </tr>
              {orders}
            </tbody>
          </table>
        </div>
        {this.state.order ?
          <div className="align-center mt-10">
            <h2 className="text-center font-extrabold text-2xl text-white p-1 border-2 border-rose-800 mb-2 bg-gradient-to-r from-rose-400 to-red-700">ORDER DETAIL</h2>
            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>No.</th>
                  <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Prod.ID</th>
                  <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Prod.name</th>
                  <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Image</th>
                  <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Price</th>
                  <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Quantity</th>
                  <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Amount</th>
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
    this.apiGetOrders();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }
  // apis
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Order;