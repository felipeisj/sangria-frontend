import React, {useContext, useEffect} from 'react';
import UserContext from '../UserContext'


function Logout(props) {
    const contexto = useContext(UserContext)
    useEffect(
        () => {
            localStorage.clear();
            contexto.setPerfil({id: null, nombre: null, academico: null});
            props.history.push('/login');
        },
        []
    )

    return (
        <p>See you later!</p>
    );
}

export default Logout;