import React from 'react';
import { Route } from "react-router-dom";

function AdminRoute ({component: Component, ...rest}) {

    
    function verificaAdminSistema() {
        var token = localStorage.getItem('token');
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        if (token !== null && token !== '' && usuario.admin_sistema === true) {
            return true;
        } else {
            return false;
        }
    }

    return (
      <Route
        {...rest}
        render={(props) => verificaAdminSistema() === true
          ? <Component {...props} />
          : props.history.goBack()}
      />
    )
  }

  export default AdminRoute;