import React, { useState, useEffect} from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import Layout from './Layout';
import { Api} from '../utils/Api';

function Tabla(props) {

    const columns = [  
        { dataField: 'id', text: 'Id', width: 150 },
        { dataField: 'nombre', text: 'Nombre', width: 70 },
    ];
      const [rows, setRows] = useState([]);
      async function obtenerDatos() {
        let resultado = await Api(`api/usuarios/test`);
        console.log(resultado)
        if (resultado && resultado.status === 200) {
            setRows(resultado.data.usuarios);
        } else {
            // alert.show('Error al cargar datos', { type: 'error' });
            setRows([]);
        }
    }
    useEffect(
        () => {
            obtenerDatos()
        },
        []
    )



    console.log("entra a la tabla")
    return (
            <Layout title="Inicio">
                   <div style={{ padding: "20px" }}>
                    <h1 className="h2">Usuario</h1>
                    <BootstrapTable keyField="id" data={rows} columns={columns} />
                    </div>
            </Layout>
        )
}   


export default Tabla;
