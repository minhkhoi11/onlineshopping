import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import './index.css'
class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="mt-3 p-3 ml-2 mr-1 shadow-xl drop-shadow-xl border-2 border-gray-200 rounded-md border-2">
        <div className="float-left">
        {this.context.token === '' ? 
        <div className='account-section font-medium text-lg'><Link to='/login' className='login shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-200 to-gray-200 hover:from-rose-400 hover:to-rose-700 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-red-800 hover:uppercase'>SIGN IN</Link> <Link to='/signup' className='signup shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-200 to-gray-200 hover:from-sky-400 hover:to-sky-600 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-sky-800 hover:uppercase'>SIGN UP</Link> <Link to='/active' className='Active shadow-md hover:shadow-inner p-1 bg-gradient-to-r from-gray-200 to-gray-200 hover:from-emerald-400 hover:to-emerald-600 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-lime-800 hover:uppercase'>ACTIVE</Link></div>
                  :
          <div className='sign-in'>Hello <b>{this.context.customer.name}</b> | <Link to='/home' className='font-medium border-2 shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-300 to-gray-200 hover:from-rose-400 hover:to-rose-700 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-red-800 hover:uppercase'onClick={() => this.lnkLogoutClick()}>LOGOUT</Link>  <Link to='/myprofile' className='font-medium border-2 shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-300 to-gray-200 hover:from-sky-400 hover:to-sky-700 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-sky-800 hover:uppercase'>PROFILE</Link> <Link to='/myorders' className='font-medium border-2 shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-300 to-gray-200 hover:from-emerald-400 hover:to-emerald-700 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-emerald-800 hover:uppercase '>MY ORDERS</Link></div>
        }
      </div>
      <div className="float-right ">
      <Link to='/mycart'className='cart underline hover:underline hover:decoration-sky-500 hover:decoration-2 font-bold'>My cart</Link> have <b>{this.context.mycart.length}</b> items      </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;