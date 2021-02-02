import React from 'react';
import { UserProvider } from './UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css'
import Login from './general/Login';
//import Logout from './general/Logout';
import Inicio from './general/Inicio';
import Menu from './componentes/Menu';
import Tabla from './componentes/Tabla';
//import PrivateRoute from './componentes/PrivateRoute';

function App() {
  return (
    <div className="container-fluid">
      <UserProvider>
        <Router>
          <Switch>
          <Route exact path="/login" component={Login}/>
            <Route exact path="/" component={Menu}/>
            <Route exact path="/inicio" component={Inicio}/>
            <Route exact path="/tabla" component={Tabla}/>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
