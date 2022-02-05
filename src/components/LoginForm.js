import React from 'react';
class User extends React.Component {

  render() {

    return(
      <option value={this.props.user.id}>
        {this.props.user.name}
      </option>
    )
  }
}

class LoginForm extends React.Component {

  render() {
    let users = [];
    for (let user in this.props.users) {
      users.push(this.props.users[user]);
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
        <form>
          <h2>Login</h2>
          <select id="login-select">
            {users.map((user, index)=> <User key={index} user={user} />)}
          </select>
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm;