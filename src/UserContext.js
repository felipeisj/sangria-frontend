import React, { useState, useEffect } from 'react'
import { Api} from './utils/Api';

const UserContext  = React.createContext(
    {perfil: {id : null, nombre : null, academico : null},
    setPerfil: () => {}})

export const UserConsumer = UserContext.Consumer

export const UserProvider = (props) => {
  useEffect(
        () => {
          const id = localStorage.getItem('id');
          if(id !== '' && id !== null) {
              obtenerUsuario(id)
          }
        },
        []
    )

    async function obtenerUsuario(usuario_id){
      let resultado = await Api(`/api/usuarios/${usuario_id}`, {}, {}, true, 'get');  
      if (resultado && resultado.status === 200) {
          setPerfil(resultado.data.usuario)
      }else{
          console.log("no hay usuario")
      }
    }

  const setPerfil = (perfil) => {
    setState({...state, perfil: perfil})
  }

  const initState = {
      perfil: {id: localStorage.getItem('id'), nombre: localStorage.getItem('nombre'), academico: false},
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