import React from 'react';
import {NavLink} from 'react-router-dom';

import '../styles/Header.scss';
import logo from '../logo.png';

export class Header extends React.Component {
  render() {
    return (
      <div className="nav-menu no-print">
        <ul>
          <li>
            <a href="#" className="nav-disabled">
              <img className="logo" src={logo} title="Made with squarespace.com"/>
            </a>
          </li>
          <li>
            <NavLink to="/" exact activeClassName="router-link-active">Home</NavLink>
          </li>
          <li>
            <NavLink to="/parser" exact activeClassName="router-link-active">Build a Resume</NavLink>
          </li>
          <li>
            <NavLink to="/contact" exact activeClassName="router-link-active">Contact</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
