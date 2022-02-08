import react from 'react';
import Menu from './Menu';

// Import actions
import loginHandler from '../actions/login';

class Header extends react.Component {

  render() {

    const store = this.props.store;
    const sessionUser = store.session.user;
    const user = this.props.store.users[sessionUser];
    const logOut = ()=> {
      this.props.store.dispatch(loginHandler());
    }

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