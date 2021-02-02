import React, { useState } from 'react'

const UserContext = React.createContext(
    {perfil: {nombre: null, permisos: null},
    setPerfil: () => {}})

export const UserConsumer = UserContext.Consumer

export const UserProvider = (props) => {

    const setPerfil = (perfil) => {
      setState({...state, perfil: perfil})
    }

    const initState = {
        perfil: {nombre: localStorage.getItem('nombre'), permisos: localStorage.getItem('permisos')},
        setPerfil: setPerfil
    }

    const [state, setState] = useState(initState)

    return (
      <UserContext.Provider value={state}>
        {props.children}
      </UserContext.Provider>
    )
  }


export default UserContext