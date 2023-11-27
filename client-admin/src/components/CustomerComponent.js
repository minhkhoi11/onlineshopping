import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null
    };
  }
  render() {
    const customers = this.state.customers.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trCustomerClick(item)}>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item._id}</td>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item.username}</td>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item.password}</td>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item.name}</td>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item.phone}</td>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item.email}</td>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item.active}</td>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>
            {item.active === 0 ?
                <span className="link" onClick={() => this.lnkEmailClick(item)}>EMAIL</span>
              :
              <span className="link" onClick={() => this.lnkDeactiveClick(item)}>DEACTIVE</span>}
          </td>
        </tr>
      );
    });
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trOrderClick(item)}>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item._id}</td>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{new Date(item.cdate).toLocaleString()}</td>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item.customer.name}</td>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item.customer.phone}</td>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item.total}</td>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item.status}</td>
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
          <h2 className="text-center font-extrabold text-2xl text-white p-1 border-2 border-rose-800 mb-2 bg-gradient-to-r from-rose-400 to-red-700">CUSTOMER LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>ID</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Username</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Password</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Name</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Phone</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Email</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Active</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Action</th>
              </tr>
              {customers}
            </tbody>
          </table>
        </div>
        {this.state.orders.length > 0 ?
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
                </tr>
                {orders}
              </tbody>
            </table>
          </div>
          : <div />}
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
    this.apiGetCustomers();
  }
  // event-handlers
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }
  trOrderClick(item) {
    this.setState({ order: item });
  }
  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }
  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }
  // apis
  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetCustomers();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  apiGetCustomerSendmail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Customer;