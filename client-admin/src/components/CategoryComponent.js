import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td className='border-2 border-rose-900 bg-rose-100 pl-2 pr-2 font-medium'>{item._id}</td>
          <td className='border-2 border-rose-900 bg-white pl-2 pr-2 font-medium'>{item.name}</td>
        </tr>
      );
    });
    return (
      <div>
        <div className="float-left mt-10">
          <h2 className="text-center font-extrabold text-2xl text-white p-1 border-2 border-rose-800 mb-2 bg-gradient-to-r from-rose-400 to-red-700">CATEGORY LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>ID</th>
                <th className='bg-rose-800 text-rose-100  font-extrabold border-2 border-rose-900 pl-3 pr-3'>Name</th>
              </tr>
              {cates}
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
        <div className="float-clear" />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
}
export default Category;