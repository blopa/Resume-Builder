import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from '../styles/Header.scss';
import logo from '../logo.png';

export class Header extends React.Component {
  render() {
    return (
      <div className={styles['nav-menu']}>
        <ul>
          <li>
            <a href="#" className={styles['nav-disabled']}>
              <img className={styles.logo} src={logo} title="Made with squarespace.com"/>
            </a>
          </li>
          <li>
            <NavLink to="/" exact activeclassName={styles['router-link-active']}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/parser" exact activeclassName={styles['router-link-active']}>Build a Resume</NavLink>
          </li>
          <li>
            <NavLink to="/contact" exact activeclassName={styles['router-link-active']}>Contact</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
