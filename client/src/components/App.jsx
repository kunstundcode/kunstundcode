import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Codekunst from './pages/Codekunst';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavbarPage from './NavbarPage';
import JumbotronPage from './JumbotronPage';
import CodekunstDetail from './pages/CodekunstDetail';
import Profile from './pages/Profile';
import api from '../api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
    api.refreshIfNotAnymoreLoggedIn()
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {

    return (
      <div className="App">
        <NavbarPage />
        <JumbotronPage />
        <Switch>
          <Route exact path="/" component={Codekunst} />
          <Route exact path="/codekunst" component={Codekunst} />
          <Route exact path="/codekuenste/:codekunstId" component={CodekunstDetail} />
          <Route exact path="/user/:userId" component={Profile} />
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
