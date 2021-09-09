import React, {useState, useContext, useEffect} from 'react';
import { Link} from 'react-router-dom';
import { Button, Table, Form} from 'react-bootstrap'
import Layout from './Layout';
import { Api} from '../utils/Api';

function Informacion(props) {

    const columns = [  
        { dataField: 'url_imagen', text: 'Célula', width: 150 },
        { dataField: 'nombre', text: 'Nombre', width: 70 },
        { dataField: 'acciones', text: 'Acciones', width: 70 }
    ];
    const [celula, setCelula] = useState([]);
    const [rows, setRows] = useState([]);
    const [estadoMostrarNoValidas, setEstadoMostrarNoValidas] = useState(false);
    
    async function obtenerDatos() { //función que identifica si el usuario es admin
        let resultado = await Api(`api/usuarios/no-admin`);
        if (resultado && resultado.status === 200) {
            setRows(resultado.data.usuarios);
        } else {
            // alert.show('Error al cargar datos', { type: 'error' });
            setRows([]);
        }
    }

    async function obtenerDatosCelula() {
    let resultado = await Api('api/celulas-etiquetadas', {}, {}, true, 'get');
        console.log(resultado)
        if (resultado && resultado.status === 200) {
            if(resultado.data.celulas){
                setCelula(resultado.data.celulas);
            }else{
                console.log("no hay imagenes para clasificar");
            }
            
        }else {
                //alert.show('Error al cargar datos', { type: 'error' });
            setCelula([]);
        }
    }

    useEffect(
        () => {
            obtenerDatos();
            obtenerDatosCelula();
        },
        []
    )

    async function cambiarCheckValidar(e, celula){
        // let data = {
        //     id : celula.id,
        //     valor : celula.valor,
        //     contador : celula.contador,
        //     nombre : celula.nombre,
        //     etiqueta_id : celula.id,
        //     path : celula.path,
        //     validacion : celula.validacion,
        //     url_imagen : celula.url_imagen
        // }
        // try{
        //     let post_etiqueta = await Api(`api/valor-etiqueta`, JSON.stringify(data),
        //                                     {'Content-Type': 'application/json'}, true,'put');
    }
    
    async function cambiarCheckCelulasValidas(e){
        if(e.target.checked)
        {
            let resultado = await Api(`api/celulas-etiquetadas?estado_etiquetar=${e.target.checked}`, {}, {}, true, 'get');
            console.log("Resultado de células no clasificadas")
            console.log(resultado)
            if (resultado && resultado.status === 200)
            {
                if(resultado.data.celulas){
                    setCelula(resultado.data.celulas);
                }else{
                    console.log("no hay imagenes para clasificar");
                }
                
            }else {
                alert.show('Error al cargar datos', { type: 'error' });
                setCelula([]);
            }
        }
        else{
            console.log(" está llamando células nuevamente")
            obtenerDatosCelula();
        }
    }
    return (
        <Layout title="Inicio">
            <div style={{ padding: "20px" }}>
                <h1 className="h2">Etiquetas</h1>
                <Form.Group controlId="formBasicCheckbox" style={{width:"255px", height:"auto", marginLeft:"10px"}}>
                    <Form.Check type="checkbox" label="Mostrar solo células sin validar" onChange={(e) => cambiarCheckCelulasValidas(e)}/>
                </Form.Group>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Celula</th>
                        <th>Resumen</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {celula.map((p) =>
                        <tr>
                            {estadoMostrarNoValidas === false ?
                            // Se muestran todas las células ( )
                            <> 
                                <td>
                                    <img style={{width:"200px", height:"250px", marginTop:"2px"}} src={p.url_imagen}></img>
                                </td>
                                <td>
                                <h5>Tipo de célula</h5>
                                    {p.etiqueta_id <= 38 ? 
                                            <>
                                            <h6>{p.valor} : {p.contador}</h6>
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                    {p.otros_valores.map((p_valores) => (
                                        <>
                                            {p_valores.etiqueta_id <= 38 ? 
                                                <>
                                                <h6>{p_valores.valor} : {p_valores.contador}</h6>
                                                </>
                                                :
                                                <>
                                                </>
                                            }
                                        </>
                                    ))}
                                    <br></br>
                                    <h5>Alteraciones</h5>
                                    {p.otros_valores.map((p_valores) => (
                                        <>
                                        {p_valores.etiqueta_id >= 38 ? 
                                            <>
                                                <h6>{p_valores.valor} : {p_valores.contador}</h6>
                                            </>
                                            :
                                            <>
                                            </>
                                        }
                                        </>
                                    ))}
                                    {p.etiqueta_id >= 38 ? 
                                        <>
                                            <h6>{p.valor} : {p.contador}</h6>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                    <br></br>
                                </td>
                            
                                <td>
                                    <Form.Group controlId="formBasicCheckbox" style={{width:"155px", height:"auto", marginLeft:"10px"}}>
                                        <Form.Check type="checkbox" label="Validar Etiquetas" onChange={(e) => cambiarCheckValidar(e, p)} />
                                    </Form.Group>
                                    <Button variant="secondary"
                                        style={{width:"155px", height:"auto", marginLeft:"10px", marginTop:"10px", textAlign:"left"}}
                                        as={Link} to={`/ejercitar/celula/${p.id}`}
                                    >
                                        Volver a etiquetar</Button>
                                </td>
                            </> 
                            :
                            <>
                            // Validar 
                            </>
                            }
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        </Layout>
    )
}

export default Informacion;
