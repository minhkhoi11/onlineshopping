import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="float-right border-2 bg-gradient-to-r from-gray-200 to-white text-black rounded-md drop-shadow-xl shadow-xl mt-10 ">
        <h2 className="text-center font-bold text-black rounded-md shadow-t-md font-bold text-2xl p-3">CATEGORY DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td className='font-medium text-black pr-2 pl-2'>ID</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-gradient-to-r from-gray-100 to-gray-200 shadow-md drop-shadow-md' disabled type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr>
                <td className='font-medium text-black pr-2 pl-2'>Name</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-gradient-to-r from-gray-100 to-gray-200 shadow-md drop-shadow-md' type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td className='pl-8'>
                  <input className="font-bold text-black hover:shadow-rose-200 hover:border-2 hover:border-rose-500 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-white hover:to-white pl-2 pr-2  mb-2  rounded shadow-md " type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} /><br></br>
                  <input className="font-bold text-black hover:shadow-rose-200 hover:border-2 hover:border-rose-500 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-white hover:to-white pl-2 pr-5  mb-2  rounded shadow-md "type="submit" value=" UPDATE" onClick={(e) => this.btnUpdateClick(e)} /><br></br>
                  <input className="font-bold text-black hover:shadow-rose-200 hover:border-2 hover:border-rose-500 bg-gradient-to-r from-gray-100 to-gray-300 hover:from-white hover:to-white pl-2 pr-5  mb-2  rounded shadow-md " type="submit" value="  DELETE" onClick={(e) => this.btnDeleteClick(e)} /><br></br>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input name');
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }
  // apis
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  // event-handlers
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input id');
      }
    }
  }
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default CategoryDetail;