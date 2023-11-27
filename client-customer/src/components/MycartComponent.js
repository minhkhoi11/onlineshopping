import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import './index.css'

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="datatable">
          <td className='border-2 border-sky-900 bg-white pl-2 pr-2 font-medium'>{index + 1}</td>
          <td className='text-left border-2 border-sky-900 bg-sky-100 pl-2 pr-2 font-medium'>{item.product._id}</td>
          <td className='text-left border-2 border-sky-900 bg-white pl-2 pr-2 font-medium'>{item.product.name}</td>
          <td className='border-2 border-sky-900 bg-sky-100 pl-2 pr-2 font-medium'>{item.product.category.name}</td>
          <td className='border-2 border-sky-900 bg-white pl-2 pr-2 font-medium'><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
          <td className='border-2 border-sky-900 bg-sky-100 pl-2 pr-2 font-medium'>{item.product.price} $</td>
          <td className='border-2 border-sky-900 bg-white pl-2 pr-2 font-medium'>{item.quantity}</td>
          <td className='border-2 border-sky-900 bg-sky-100 pl-2 pr-2 font-medium'>{item.product.price * item.quantity} $</td>
          <td className='remove-link border-2 border-sky-900 bg-white pl-2 pr-2 font-medium'><span className="link" onClick={() => this.lnkRemoveClick(item.product._id)}>REMOVE</span></td>
        </tr>
      );
    });
    return (
      <div className="align-center mt-10">
        <h2 className="text-center font-extrabold text-2xl text-white p-1 border-2 border-sky-800 mb-2 bg-gradient-to-r from-sky-400 to-sky-700">ITEM LIST</h2>
        <table className="datatable" border="1">
          <tbody>
            <tr className="datatable ">
              <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>No.</th>
              <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>ID</th>
              <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Name</th>
              <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Category</th>
              <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Image</th>
              <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-6 pr-6'>Price</th>
              <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Quantity</th>
              <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Amount</th>
              <th className='bg-sky-800 text-sky-100  font-extrabold border-2 border-sky-900 pl-3 pr-3'>Action</th>
            </tr>
            {mycart}
            <tr className='mt-10'>
              <td colSpan="6" className='pt-10 '></td>
              <td className='bg-sky-800 text-sky-100  text-lg font-extrabold border-2 border-sky-900 pl-3 pr-3'>TOTAL</td>
              <td className='border-2 border-sky-900 text-xl font-extrabold bg-sky-100 pl-9 pr-9 '>{CartUtil.getTotal(this.context.mycart)}$</td>
              <td className='remove-link border-2 border-sky-900 bg-white pl-2 pr-2 font-medium'><span className="link" onClick={() => this.lnkCheckoutClick()}>CHECKOUT</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
    // event-handlers
    lnkCheckoutClick() {
      if (window.confirm('ARE YOU SURE?')) {
        if (this.context.mycart.length > 0) {
          const total = CartUtil.getTotal(this.context.mycart);
          const items = this.context.mycart;
          const customer = this.context.customer;
          if (customer) {
            this.apiCheckout(total, items, customer);
          } else {
            this.props.navigate('/login');
          }
        } else {
          alert('Your cart is empty');
        }
      }
    }
    // apis
    apiCheckout(total, items, customer) {
      const body = { total: total, items: items, customer: customer };
      const config = { headers: { 'x-access-token': this.context.token } };
      axios.post('/api/customer/checkout', body, config).then((res) => {
        const result = res.data;
        if (result) {
          alert('OK BABY!');
          this.context.setMycart([]);
          this.props.navigate('/home');
        } else {
          alert('SORRY BABY!');
        }
      });
    }
}
export default withRouter(Mycart);