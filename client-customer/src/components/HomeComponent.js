import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }
  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="inline bg-white shadow-xl drop-shadow-xl shadow-inner m-5 p-4 rounded-lg hover:scale-105 hover:text-lg hover:font-bold border-2">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" className='border-4 border-white'alt="" /></Link>
            <figcaption className="text-left font-medium bg-white p-1 mt-3 ">{item.name}<br /> </figcaption>
            <figcaption className="text-left font-bold text-red-500 bg-white pl-2 pr-2 rounded-md border-2 border-red-200 shadow-md">{item.price} $</figcaption>
          </figure>
        </div>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline bg-white shadow-xl drop-shadow-xl shadow-inner m-5 p-4 rounded-lg hover:scale-105 hover:text-lg hover:font-bold bo">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" className='border-4 border-white' alt="" /></Link>
            <figcaption className="text-left font-medium bg-white p-1 mt-3">{item.name}<br /></figcaption>
            <figcaption className="text-left font-bold text-red-500 bg-white pl-2 pr-2 rounded-md border-2 border-red-200 shadow-md">{item.price} $</figcaption>
          </figure>
        </div>
      );
    });
    return (  
      <div>
        <div className="align-center pt-3 pb-3 ">
          <h2 className="text-center pt-3 pb-3 border-4 border-rose-200 text-3xl font-extrabold text-white rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 ">NEW PRODUCTS</h2>
          {newprods}
        </div>
        {this.state.hotprods.length > 0 ?
          <div className="align-center pt-3 pb-3">
            <h2 className="text-center pt-3 pb-3 border-4 border-rose-200 text-3xl font-extrabold text-white rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 ">HOT PRODUCTS</h2>
            {hotprods}
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;