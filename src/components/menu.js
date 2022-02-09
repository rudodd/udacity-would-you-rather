// Import libraries
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Navigation menu individual link componenet **************************************************************
 */
class MenuLink extends React.Component {

  render() {

    return (
      <li className="menu-item">
        <Link to={this.props.link.href}><span className="material-icons">{this.props.link.icon}</span>{this.props.link.name}</Link>
      </li>
    )
  }
};

/**
 * Navigation menu componenet **************************************************************
 */
class Menu extends React.Component {


  render() {

    return (
      <ul>
        {this.props.links.map((link, index)=> <MenuLink link={link} key={index} />)}
      </ul>
    )
  }
};

export default Menu