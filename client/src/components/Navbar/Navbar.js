import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from '../../assets/logo-xs.png';
import { ReactComponent as AddIcon } from '../../assets/plus.svg';
import css from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={css.nav}>
      <ul className={css.ul}>
        <li>
          <NavLink
            to="/"
            exact
            activeClassName={css.activeNavLink}
            className={css.navLink}
          >
            <img style={{ display: 'block' }} src={logo} alt="logo" />
            <span className={css.bigScreen}>Jif Chat</span>
          </NavLink>
        </li>
        <li className={css.mlAuto}>
          <NavLink
            to="/post"
            activeClassName={css.activeNavLink}
            className={css.navLink}
          >
            <AddIcon
              fill="currentColor"
              title="post a gif"
              className={css.addIcon}
            />
          </NavLink>
        </li>
        <li>
          <Link to="/login" className={css.primaryBtn}>
            Login
          </Link>
        </li>
        <li>
          <button className={css.primaryBtn}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}
