import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/authSlice';
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavbarToggler } from 'reactstrap';
import Auth from './Auth';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <Navbar dark expand="md">
        <NavbarToggler onClick={toggleNav} />
        <NavbarBrand>BLOG</NavbarBrand>
        <Collapse isOpen={isNavOpen} navbar>
          <Nav navbar className="me-auto">
            {isAuthenticated ? (
              <>
                <NavItem active>
                  <NavLink className={({ isActive }) => (isActive ? 'menu_active nav-link' : 'nav-link')} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={({ isActive }) => (isActive ? 'menu_active nav-link' : 'nav-link')} to="/profile">
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={({ isActive }) => (isActive ? 'menu_active nav-link' : 'nav-link')} to="/mypost">
                    My Post
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={({ isActive }) => (isActive ? 'menu_active nav-link' : 'nav-link')} to="/createpost">
                    Create Post
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem active>
                <NavLink className={({ isActive }) => (isActive ? 'menu_active nav-link' : 'nav-link')} to="/">
                  Home
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
        <Nav navbar>
          <NavItem>
            <Auth />
          </NavItem>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Header;
