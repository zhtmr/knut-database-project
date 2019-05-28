import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './auth/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Board from './components/Board';
import BoardForm from './components/BoardForm';
import BoardRead from './components/BoardRead';
import About from './components/About';


import './bootstrap.min.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/signin'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />
                <Route exact path="/" component={ Home } />
                
                <div className="container">
                  <Route exact path="/board" component={Board}/>
                  <Route exact path="/signup" component={ Signup } />
                  <Route exact path="/signin" component={ Signin } />
                  <Route exact path = "/BoardForm" component = {BoardForm} />
                  <Route exact path = "/BoardRead" component = {BoardRead} />
                  <Route exact path = "/about" component = {About} />

                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
