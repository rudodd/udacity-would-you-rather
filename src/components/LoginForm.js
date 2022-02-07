import React from 'react';
import Select from 'react-select';
import { Consumer } from 'react-redux';

// Import actions
import loginHandler from '../actions/login';

class LoginForm extends React.Component {

  render() {
    const { store } = this.props;

    const selectOptions = [];
    for (let user in store.users) {
      let optionObject = {
        value: store.users[user].id,
        label: <div className="user-select">
                <img src={store.users[user].avatarURL} alt={store.users[user].name} />
                <p>{store.users[user].name}</p>
               </div>
      };
      selectOptions.push(optionObject);
    };

    const loginSubmit = (e)=> {
      e.preventDefault();
      let user = this.refs.userOption.state.selectValue;
      if (user.length) {
        store.dispatch(loginHandler(user[0].value));
      }
    }
    // this.props.history.push('/');
    console.log(this.props.history);

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