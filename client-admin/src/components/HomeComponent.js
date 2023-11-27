import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="align-center">
      <h2 className="text-center font-extrabold text-2xl text-white p-1 border-2 border-rose-800 rounded-md mt-5 bg-gradient-to-r from-rose-400 to-red-700">ADMIN HOME</h2>

      <div className="">
        <div className="m-20">
          <div><Link to='/admin/order' className="font-extrabold text-xl text-black hover:shadow-rose-200 hover:shadow-md hover:drop-shadow-md hover:border-2 hover:border-rose-500 bg-white border-2 p-5 pl-10 pr-8 mr-2 rounded-lg ">ORDER</Link> <Link to='/admin/customer' className="font-extrabold text-black hover:shadow-rose-200 hover:border-2 hover:border-rose-500 bg-white border-2 hover:shadow-md hover:drop-shadow-md hover:from-white hover:to-white p-5 rounded-lg text-xl  ">CUSTOMER</Link></div>
        </div>
        <div className="m-20">
          <div><Link to='/admin/category' className="font-extrabold text-xl  text-black hover:shadow-rose-200 hover:shadow-md hover:drop-shadow-md hover:border-2 hover:border-rose-500 bg-white border-2  p-5 mr-2 rounded-lg ">CATEGORY</Link> <Link to='/admin/product' className="font-black text-black hover:shadow-rose-200 hover:border-2 hover:border-rose-500 bg-white border-2 hover:shadow-md hover:drop-shadow-md hover:from-white hover:to-white p-5 pr-6 pl-7 rounded-lg text-xl  ">PRODUCT</Link></div>
        </div>
      </div>
      
        
      


        
      </div>

    

    );
  }
}
export default Home;