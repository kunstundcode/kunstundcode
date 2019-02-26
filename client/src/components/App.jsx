import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Codekunst from './pages/Codekunst';
// import AddCountry from './pages/AddCountry';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CodekunstDetail from './pages/CodekunstDetail';
import Profile from './pages/Profile';
import api from '../api';
import logo from '../logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">kunstundcode</h1>
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/codekunst">Codekunst</NavLink>

          {/* The NavLink "Add country" is displayed only when the user is connected */}
          {/* {api.isLoggedIn() && <NavLink to="/add-country">Add country</NavLink>} */} 

          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          {api.isAdmin() && <NavLink to="/admin">Admin</NavLink>}
          
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/codekunst" component={Codekunst} />
          <Route exact path="/codekuenste/:codekunstId" component={CodekunstDetail} />
          <Route exact path="/user/:userId" component={Profile} />
          {/* <Route exact path="/add-country" component={AddCountry} /> */}
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
