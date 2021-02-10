import React, { useState, useEffect, useContext } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from './Layout';
import { Api, getLocalFile } from '../utils/Api';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

function Ejercitar() {

      const [celula, setCelula] = useState([]);
      async function obtenerDatos() {
        let resultado = await Api('api/celula', {}, {}, false, 'get');
        console.log(resultado)
        if (resultado && resultado.status === 200) {
            setCelula(resultado.data.celula);
        } else {
             //alert.show('Error al cargar datos', { type: 'error' });
            setCelula([]);
        }
    }
    useEffect(
        () => {
            obtenerDatos()
        },
        []
    )
    console.log(celula.nombre)
    
    return (

                   <div style={{ padding: "20px" }}>
                        <h1 >Celula</h1>
                        <img style={{width:"200px", height:"auto"}} src={celula.url_imagen}></img>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="secondary">Left</Button>
                            <Button variant="secondary">Middle</Button>
                            <Button variant="secondary">Right</Button>
                        </ButtonGroup>
                    </div>                    

        )
}   

export default Ejercitar;