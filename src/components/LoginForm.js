import React from 'react';
import Select from 'react-select';
import { Consumer } from 'react-redux';

// Import actions
import loginHandler from '../actions/login';

class LoginForm extends React.Component {

  render() {

    const selectOptions = [];
    for (let user in this.props.users) {
      let optionObject = {
        value: this.props.users[user].id,
        label: <div className="user-select">
                <img src={this.props.users[user].avatarURL} alt={this.props.users[user].name} />
                <p>{this.props.users[user].name}</p>
               </div>
      };
      selectOptions.push(optionObject);
    };

    const loginSubmit = (e)=> {
      e.preventDefault();
      let user = this.refs.userOption.state.selectValue;
      if (user.length) {
        this.props.dispatch(loginHandler(user[0].value));
      }
    }

    return(
      <div className="login-form-wrapper">
        <div className="login-header">
          <h1>Welcome to the would you rather App!</h1>
          <p>Please sign in to continue</p>
        </div>
        <div className="login-logo">
          {/* Logo goes here */}
        </div>
        <form className="login-form" onSubmit={loginSubmit}>
          <h2>Login</h2>
          <Select ref="userOption" className="login-select-container" classNamePrefix="login-select" options={selectOptions} />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm;