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
import Menu from './componentes/menu/Menu';
import Tabla from './componentes/Tabla';
import Ejercitar from './componentes/Ejercitar';
import Logout from './componentes/Logout';
import PrivateRoute from './componentes/PrivateRoute';



function App() {
  return (
    <div className="container-fluid">
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/logout" component={Logout} />
            <PrivateRoute exact path="/menu" component={Menu}/>
            <PrivateRoute exact path="/" component={Inicio}/>
            <PrivateRoute exact path="/tabla" component={Tabla}/>
            <PrivateRoute exact path="/ejercitar" component={Ejercitar}/>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
