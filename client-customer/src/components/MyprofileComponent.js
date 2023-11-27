import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div className="align-center text-white bg-gradient-to-r from-sky-950 to-sky-900 rounded-md drop-shadow-xl mt-40 shadow-md">
        <h2 className="text-center text-white bg-gradient-to-r from-sky-950 to-sky-900 rounded-md font-bold text-2xl p-3 ">MY PROFILE</h2>
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td className='font-medium pr-2 pl-2 '>Username</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75'type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className='font-medium pr-2 pl-2 '>Password</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75'type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className='font-medium pr-2 pl-2 '>Name</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75'type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className='font-medium pr-2 pl-2 '>Phone</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75'type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className='font-medium pr-2 pl-2 '>Email</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75' type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input type="submit" className='bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-700 hover:to-sky-900 font-bold text-white  p-2 ml-4 mb-2 mt-1 rounded hover:text-white  hover:shadow-inner drop-shadow-md hover:shadow-md ' value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setCustomer(result);
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Myprofile;