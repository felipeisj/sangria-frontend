import React, {useContext, useEffect} from 'react';
import UserContext from '../UserContext'


function Logout(props) {

    const contexto = useContext(UserContext)

    useEffect(
        () => {
            localStorage.clear();
            contexto.setPerfil({nombre: null, permisos: null});
            props.history.push('/login');
        },
        []
    )

    return (
        <p>See you later!</p>
    );
}

export default Logout;