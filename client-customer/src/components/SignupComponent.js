import axios from 'axios';
import React, { Component } from 'react';

class Signup extends Component {
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
    return (
      <div className="align-center text-white bg-gradient-to-r from-sky-950 to-sky-900 rounded-md drop-shadow-xl mt-40 shadow-md">
        <h2 className="text-center text-white bg-gradient-to-r from-sky-950 to-sky-900 rounded-md font-bold text-2xl p-3 ">SIGN-UP</h2>
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td className='font-medium pr-2 pl-2 '>Username</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75' type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className='font-medium pr-2 pl-2 '>Password</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75' type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className='font-medium pr-2 pl-2 '> Name</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75' type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className='font-medium pr-2 pl-2 '>Phone</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75' type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className='font-medium pr-2 pl-2 '>Email</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75' type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input type="submit" className='bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-700 hover:to-sky-900 font-bold text-white  p-2 ml-4 mb-2 mt-1 rounded hover:text-white  hover:shadow-inner drop-shadow-md hover:shadow-md ' value="SIGN UP" onClick={(e) => this.btnSignupClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;