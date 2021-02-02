import React from 'react';
import {
    Route, Redirect
  } from "react-router-dom";


function PrivateRoute ({component: Component, ...rest}) {

    
    function verificaLogin() {
        var token = localStorage.getItem('token');
        if (token !== null && token !== '') {
            return true;
        } else {
            return false;
        }
    }

    return (
      <Route
        {...rest}
        render={(props) => verificaLogin() === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

  export default PrivateRoute;