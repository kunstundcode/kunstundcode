import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import api from '../api';
import { Link, NavLink } from 'react-router-dom';


class NavbarPage extends Component {
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
        <strong className="black-text">kunstundcode</strong>
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
              {!api.isLoggedIn() && <MDBDropdownItem><NavLink to="/signup">Signup</NavLink></MDBDropdownItem>}
              {!api.isLoggedIn() && <MDBDropdownItem><NavLink to="/login">Login</NavLink></MDBDropdownItem>  }
              {api.isLoggedIn() && <MDBDropdownItem><Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link></MDBDropdownItem>}
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    );
  }
}

export default NavbarPage;