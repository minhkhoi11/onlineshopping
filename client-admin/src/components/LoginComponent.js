import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
      return (
        <div className="align-valign-center bg-gradient-to-r from-rose-950 to-rose-900 text-white rounded-md drop-shadow-xl shadow-xl ">
          <h2 className="text-center bg-gradient-to-r from-rose-950 to-rose-900 text-white rounded-md shadow-t-md font-bold text-2xl p-3">ADMIN LOGIN</h2>
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
                  <td></td>
                  <td><input type="submit" className='bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-700 hover:to-rose-900 font-bold text-white p-2 ml-4 mb-2 mt-1 rounded hover:text-white hover:shadow-inner drop-shadow-md hover:shadow-md ' value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;