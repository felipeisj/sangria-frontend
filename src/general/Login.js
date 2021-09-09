import React, {useState, useContext} from 'react';
import {Api} from '../utils/Api';
import {Alert, Button} from 'react-bootstrap';
import UserContext from '../UserContext';

function Login (props) {
    const [notificacion, setNotificacion] = useState(false);
    const contexto = useContext(UserContext);
    const [usuario, setUsuario] = useState({
        username: '',
        password: '',
        academico: '',
        access_token: ''
    });

    function onChange(event) {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value
        });
    }

    async function validaUsuario(event) {
        try{
            let resultado = await Api(
                'auth/login',
                JSON.stringify(usuario),
                {'Content-Type': 'application/json'},
                false,
                'post');   
                console.log(resultado)

            if (resultado && resultado.status === 200) {
                localStorage.setItem('token', resultado.data.access_token);
                console.log(resultado.data.access_token)
                localStorage.setItem('id', resultado.data.usuario.id);
                // localStorage.setItem('nombre', resultado.data.usuario.nombre);
                console.log("resultado")
                contexto.setPerfil(resultado.data.usuario)
                setNotificacion(false);
                //setRedireccionar(true);
                props.history.push('/ejercitar');
            } else {
                console.log("tenemos un error");
                // Determinar qué casos tratemos aquí
                console.log(resultado);
            }
        }
        catch (error) {
            // Todos los errores incluyendo auth 401.
            console.log(error);
            setNotificacion(true);
        }
    }

    async function testToken(event) {
        let resultado = await Api('auth/usuario/');
        if (resultado && resultado.status === 200) {
            console.log(resultado);
        } else {
            console.log('viene un error');
        }
    }
    return (
        <>
        <form>
            <div className="form-group">
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={usuario.username} onChange={onChange} />
                <small
                    id="usernameHelp"
                    className="form-text text-muted">
                        Mensaje muteado de ayuda
                </small>
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={usuario.password} onChange={onChange} />
            </div>
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember" />
                <label
                    className="form-check-label"
                    htmlFor="remember">
                        Recordar</label>
            </div>
            <Button variant="primary" onClick={validaUsuario}>Ingresar</Button>
            <Button variant="warning" onClick={testToken}>Probar Token</Button>
            &nbsp;
            <div className="form-group">
                {notificacion &&
                <Alert variant='warning'>
                    Usuario o contraseña incorrectos!
                </Alert>
                }
            </div>
        </form>
        </>
    );
  }

export default Login;