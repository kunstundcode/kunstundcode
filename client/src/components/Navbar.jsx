import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import api from '../api';
import { Link } from 'react-router-dom';


class Navbar extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

handleLogoutClick(e) {
  api.logout()
}

render() {
  let username, userId;
  if (localStorage.getItem('user')) {
    username = JSON.parse(localStorage.getItem('user')).username;
    userId = JSON.parse(localStorage.getItem('user'))._id;
  }

  return (
    <MDBNavbar color="lime accent-2" light expand="md">
      <MDBNavbarBrand>
      <MDBNavLink to="/">
        <strong className="black-text">kunstundcode</strong>
      </MDBNavLink>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to="/codekunst">Codekunst</MDBNavLink>
          </MDBNavItem>
          {api.isLoggedIn() && <MDBNavItem><MDBNavLink to={"/user/"+userId}>MyArt</MDBNavLink></MDBNavItem>}
        </MDBNavbarNav>
        <MDBNavbarNav right>
        {username && <MDBNavItem><MDBNavLink to={"/user/"+userId}>{username}</MDBNavLink></MDBNavItem>}
        {api.isAdmin() && <MDBNavItem><MDBNavLink to="/admin">Admin</MDBNavLink></MDBNavItem>}
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default" right>
              {!api.isLoggedIn() && <MDBNavLink to="/signup"><MDBDropdownItem>Signup</MDBDropdownItem></MDBNavLink>}
              {!api.isLoggedIn() && <MDBNavLink to="/login"><MDBDropdownItem>Login</MDBDropdownItem></MDBNavLink>  }
              {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}><MDBDropdownItem>Logout</MDBDropdownItem></Link>}
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    );
  }
}

export default Navbar;