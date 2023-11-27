import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import './index.css'

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu shadow-md drop-shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-sky-400 hover:to-sky-600 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-sky-800 hover:uppercase text-xl "><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div className="pt-6 pb-2 pl-4 pr-4 m-1 shadow-md drop-shadow-lg bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg">
        <div className="float-left">
          <ul className="menu ">
          <li className="menu shadow-md drop-shadow-md hover:shadow-inner p-1 mr-1 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-sky-400 hover:to-sky-600 text-black hover:text-white rounded-md hover:font-extrabold hover:border-2 hover:border-sky-800 hover:uppercase text-xl"><Link to='/'>Home</Link></li>
            {cates}
          </ul>
        </div>
        <div className="float-right">
        <form className="search border-2 border-sky-800 bg-white rounded-2xl shadow-md drop-shadow-md  ">
        <input type="search"  placeholder="" className="keyword bg-white p-1 m-1 " value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
        <input type="submit" value="search" className='sbtn pl-2 pr-2 mr-2 border-2 border-sky-800 bg-gradient-to-r from-sky-400 to-sky-700  rounded-xl hover:shadow-inner font-bold text-white' onClick={(e) => this.btnSearchClick(e)} />
      </form>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);
