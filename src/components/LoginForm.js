// Import libraries
import React from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

// Import actions
import loginHandler from '../actions/login';

// Login button component  - seperated from the form to allow for the use of useNavigate().  Redirect is currently commented out to align with project rubric.
function LoginButton(props) {
  let navigate = useNavigate();
  const loginSubmit = (e)=> {
    e.preventDefault();
    let user = props.state.user[0].value;
    if (typeof user != 'undefined' && user.length) {
      props.store.dispatch(loginHandler(user));

      // Redirect is currently disabled - remove the comment around it to redirect to the home page after login
      // navigate('/');
    }
  }
  return (
    <button onClick={loginSubmit}>Login</button>
  )
}

/**
 * Login form componenet **************************************************************
 */
class LoginForm extends React.Component {

  // Set initial user input state that gets passed to the login form to empty
  state = {
    user: ''
  }

  render() {

    // Get store from redux via connected component status
    const { store } = this.props;

    // Set options for the react-select form input
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

    // Change the user input state that gets passed to the login form - wrapped in setTimeout() to allow for the value to update before grabbing it on change
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
          <h1>Welcome to the would you rather app!</h1>
          <p>Please sign in to continue</p>
        </div>
        <div className="login-logo">
          <img src="/img/logo.svg" alt="Would you rather app" />
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