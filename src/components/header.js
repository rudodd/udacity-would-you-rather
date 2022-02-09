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
        name: 'Home',
        href: '/',
      },
      {
        name: 'New Question',
        href: '/add'
      },
      {
        name: 'Leader Board',
        href: '/leaderboard'
      }
    ];

    return (
      <header>
        <div className="wrap">
          <nav className="menu-wrap">
            <Menu links={menuLinks} />
          </nav>
          <div className="user-info">
            <p>Hello {user.name}</p>
            <img className="avatar" src={user.avatarURL} alt={user.name} />
          </div>
          <button onClick={logOut}>Logout</button>
        </div>
      </header>
    )
  }
};

export default Header;