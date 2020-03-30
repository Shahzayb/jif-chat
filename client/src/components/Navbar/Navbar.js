import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from '../../assets/logo-xs.png';
import { ReactComponent as AddIcon } from '../../assets/plus.svg';
import css from './Navbar.module.css';
import useAuthState from '../../hooks/useAuthState';

export default function Navbar() {
  const { logout, isAuthenticated } = useAuthState();
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
        <li className="mlAuto">
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
        {!isAuthenticated && (
          <li>
            <Link to="/login" className="primaryBtn">
              Login
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={logout} className="primaryBtn">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
