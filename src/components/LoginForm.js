import React from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

// Import actions
import loginHandler from '../actions/login';

function LoginButton(props) {
  let navigate = useNavigate();
  const loginSubmit = (e)=> {
    e.preventDefault();
    let user = props.state.user[0].value;
    if (typeof user != 'undefined' && user.length) {
      props.store.dispatch(loginHandler(user));
      navigate('/');
    }
  }
  return (
    <button onClick={loginSubmit}>Login</button>
  )
}

class LoginForm extends React.Component {

  state = {
    user: ''
  }

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

    const handleSelectChange = ()=> {
      setTimeout(()=> {
        this.setState({
          user: this.refs.userOption.getValue(),
        })
      }, 0)
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
        <form className="login-form">
          <h2>Login</h2>
          <Select ref="userOption" className="login-select-container" classNamePrefix="login-select" options={selectOptions} onChange={handleSelectChange} />
          <LoginButton store={store} state={this.state} />
        </form>
      </div>
    )
  }
}

export default LoginForm;