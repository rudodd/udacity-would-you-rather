import react from 'react';
import { Link } from 'react-router-dom';

class MenuLink extends react.Component {

  render() {

    return (
      <li className="menu-item">
        <Link to={this.props.link.href}>{this.props.link.name}</Link>
      </li>
    )
  }
};

class Menu extends react.Component {


  render() {

    return (
      <ul>
        {this.props.links.map((link, index)=> <MenuLink link={link} key={index} />)}
      </ul>
    )
  }
};

export default Menu