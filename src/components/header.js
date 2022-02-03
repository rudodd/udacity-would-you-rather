import react from 'react';
import Menu from './menu';

class Header extends react.Component {

  render() {
    let state = {
      user: 'John Doe',
      avatar: '/img/avatars/john.jpg',
    }

    const menuLinks = [
      {
        name: 'Home',
        href: '/',
      },
      {
        name: 'New Question',
        href: '/question'
      },
      {
        name: 'Leader Board',
        href: '/leaders'
      }
    ];

    return (
      <header>
        <div className="wrap">
          <nav className="menu-wrap">
            <Menu links={menuLinks} />
          </nav>
          <div className="user-info">
            <p>Hello {state.user}</p>
            <img className="avatar" src={state.avatar} alt={state.user} />
          </div>
          <button>Logout</button>
        </div>
      </header>
    )
  }
};

export default Header;