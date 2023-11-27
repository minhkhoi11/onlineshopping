import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="pt-6 pl-4 pr-4 m-1 shadow-md drop-shadow-lg bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg">
        <div className="float-left">
          <ul className="menu">
            <li className="menu shadow-md drop-shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-rose-400 hover:to-red-600 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-rose-800 hover:uppercase text-xl">
              <Link to="/admin/home">Home</Link>
            </li>
            <li className="menu shadow-md drop-shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-rose-400 hover:to-red-600 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-rose-800 hover:uppercase text-xl"><Link to='/admin/category'>Category</Link></li>
            <li className="menu shadow-md drop-shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-rose-400 hover:to-red-600 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-rose-800 hover:uppercase text-xl"><Link to='/admin/product'>Product</Link></li>
            <li className="menu shadow-md drop-shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-rose-400 hover:to-red-600 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-rose-800 hover:uppercase text-xl"><Link to='/admin/order'>Order</Link></li>
            <li className="menu shadow-md drop-shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-rose-400 hover:to-red-600 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-rose-800 hover:uppercase text-xl"><Link to='/admin/customer'>Customer</Link></li>
          </ul>
        </div>
        <div className="float-right font-bold mb-3 ">Hello <b>{this.context.username}</b> {" "}
        <div className="text-center shadow-md drop-shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-rose-400 hover:to-red-600 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-rose-800 hover:uppercase text-md"><Link to="/admin/home"onClick={() => this.lnkLogoutClick()}>LOGOUT</Link>

    
        </div>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setUsername("");
  }
}
export default Menu;
