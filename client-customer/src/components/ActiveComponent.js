import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div className="align-center bg-gradient-to-r from-emerald-950 to-emerald-800 text-white rounded-md drop-shadow-xl shadow-xl mt-40">
        <h2 className="text-center bg-gradient-to-r from-emerald-950 to-emerald-800 text-white rounded-md shadow-t-md font-bold text-2xl p-3">ACTIVE ACCOUNT</h2>
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td className='font-medium pr-2 pl-2 '>ID</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75'type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className='font-medium pr-2 pl-2 '>Token</td>
                <td><input className=' mt-2 mb-2 mr-2 pl-1 pb-1 rounded bg-zinc-400/75'type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input className='bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-700 hover:to-emerald-900 font-bold text-white  pt-2 pb-2 pl-5 pr-5 ml-5 mb-2 mt-1 rounded hover:text-white hover:shadow-inner drop-shadow-md hover:shadow-md 'type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Active;