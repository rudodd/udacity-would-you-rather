// Import libraries
import React from 'react';
import Menu from './Menu';

// Import actions
import loginHandler from '../actions/login';


/**
 * Universal header componenet **************************************************************
 */
class Header extends React.Component {

  render() {
    const { store } = this.props;
    const sessionUser = store.session.user;
    const user = store.users[sessionUser];

    // Log out function - this simply dispatches the loginHandler() without passing parameters which logs the user out
    const logOut = ()=> {
      store.dispatch(loginHandler());
    }

    // Create array of menu link objects to itterate over to create the navigation menu
    const menuLinks = [
      {
        icon: 'home',
        name: 'Home',
        href: '/',
      },
      {
        icon: 'contact_support',
        name: 'New Question',
        href: '/add'
      },
      {
        icon: 'emoji_events',
        name: 'Leader Board',
        href: '/leaderboard'
      }
    ];

    return (
      <header>
        <div className="wrap">
          <div className="logo-wrap">
            <img src="/img/logo.svg" alt="Would you rather app" />
          </div>
          <nav className="menu-wrap">
            <Menu links={menuLinks} />
          </nav>
          <div className="user-wrap">
            <p>Hello {user.name}</p>
            <img className="avatar" src={user.avatarURL} alt={user.name} />
          </div>
          <div className="button-wrap">
            <button onClick={logOut}><span className="material-icons">logout</span> Logout</button>
          </div>
        </div>
      </header>
    )
  }
};

export default Header;
