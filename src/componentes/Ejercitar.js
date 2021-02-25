import React, { useState, useEffect, useContext, Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from './Layout';
import { Api, getLocalFile } from '../utils/Api';
import {ButtonGroup, Button, ToggleButtonGroup, Alert, Modal, Image, Table} from 'react-bootstrap'

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Ejercitar(props){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const [categorias, setCategoria] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] =useState({
        id: "",
        nombre: ""
    });
    const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState({
        id: "",
        nombre: ""
    });
    const [alteraciones, setAlteraciones] = useState([]);
    const [alteracionSeleccionada, setAlteracionSeleccionada] = useState({
        id: "",
        nombre: ""
    });
    const [celula, setCelula] = useState([]);
    const [estadoClickCategoria, setEstadoClickCategoria] = useState(true);
    const [estadoMostrarCategoria, setEstadoMostrarCategoria] = useState(false);
    const menu = () => {
        props.history.push('/menu');
    }
    
    async function obtenerCategorias(){
        let categorias = await Api('api/categorias', {}, {}, 'get');  
        if (categorias && categorias.status === 200) {
            setCategoria(categorias.data.categorias)
        }else{
            return console.log("no encontrada")
        }
    }

    async function obtenerEtiquetaSeleccionada(etiqueta_id, etiqueta_nombre){  
        setEtiquetaSeleccionada({
            'id' : etiqueta_id,
            'nombre' : etiqueta_nombre   
        })
    }

    async function obtenerAlteracionSeleccionada(alteracion_id, alteracion_nombre){  
        setAlteracionSeleccionada({
            'id' : alteracion_id,
            'nombre' : alteracion_nombre
        })        
    }

    function ejercitarNuevamente(){
        obtenerDatosCelula()
        handleClose()
    }

    async function enviarInfo(){
        let data = {
            categoria_id : categoriaSeleccionada.id,
            categoria_nombre : categoriaSeleccionada.nombre,
            etiqueta_id : etiquetaSeleccionada.id,
            valor_etiqueta : etiquetaSeleccionada.nombre,
            celula_id : celula.id
        }
        try{
            let post_etiqueta = await Api(`api/valor-etiqueta`, JSON.stringify(data),
                                            {'Content-Type': 'application/json'}, true,'post');
            if (post_etiqueta && post_etiqueta.status === 200) {
                console.log("Se envió la etiqueta")
                setEstadoClickCategoria(true);
                // Si se envía la info, limpiamos los datos.
                setCategoriaSeleccionada({
                    id : "",
                    nombre : ""
                });
                setEtiquetaSeleccionada({
                    id : "",
                    nombre : ""
                });  
                setCelula([]);
                setEtiquetas([]);
                setAlteracionSeleccionada([]);
                setAlteraciones([]);

                toast.success("Etiqueta Enviada con éxito", {position: "bottom-center", autoClose: 1000, hideProgressBar: true,});
                setShow(true)                
            }else{
                toast.warning("Debe seleccionar Categoría y Tipo de Célula para Etiquetar", {position: "bottom-center", autoClose: 4000, })
                setShow(false);
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    async function llamarEtiquetas(categoria_id, categoria_nombre){
        let etiqueta = await Api(`api/etiquetas?categoria_id=${categoria_id}`, {}, {}, 'get');
        if (etiqueta && etiqueta.status == 200){
            console.log(etiqueta)
            setEtiquetas(etiqueta.data.etiquetas)
            setCategoriaSeleccionada({
                id : categoria_id,
                nombre : categoria_nombre
            })
            setEstadoClickCategoria(false);
            setEstadoMostrarCategoria(true);
        }else{
            console.log("eror al llamar etiquetas")
            //setEstadoClickCategoria(true);
        }
        
        let alteracion = await Api(`api/categorias/alteraciones?categoria_id=${categoria_id}`, {}, {}, 'get');
        if (alteracion && etiqueta.status == 200){
            setAlteraciones(alteracion.data.alteraciones)
        }else{
            console.log("eror al llamar alteraciones")
        }  
    }
    


    async function obtenerDatosCelula() {
    let resultado = await Api('api/celula', {}, {}, 'get');
        if (resultado && resultado.status === 200) {
            setCelula(resultado.data.celula);
            console.log(resultado)
        } else {
             //alert.show('Error al cargar datos', { type: 'error' });
            setCelula([]);
        }
    }

    useEffect(
        () => {
            obtenerDatosCelula();
            obtenerCategorias();
            obtenerEtiquetaSeleccionada();
        },
        []
    )
    return (
            <Layout>
                        <div style={{ marginTop: "10px" }} align="center" >
                            <div hidden={estadoMostrarCategoria}>
                                <h4 >Célula a clasificar</h4>
                                <Image style={{width:"150px", height:"auto"}} src={celula.url_imagen} rounded></Image>
                                <br></br>
                                <h5>Categorias</h5>
                                {estadoMostrarCategoria===false ? 
                                <>
                                    {categorias.map((radio, index) => (
                                        <Button 
                                            key={radio.id}
                                            variant={categoriaSeleccionada.id==radio.id ? "secondary":"outline-secondary"}
                                            value={radio.descripcion} 
                                            onClick={() => llamarEtiquetas(radio.id, radio.nombre)}
                                            style={{width:"150px"}} 
                                            >
                                            {radio.nombre}
                                        </Button>
                                    ))}
                                </>     
                                :
                                  <></>  
                                }
                            </div>
                            <Button variant="outline-secondary" hidden={estadoClickCategoria} onClick={(e)=>{
                                setEstadoMostrarCategoria(false);
                                setEstadoClickCategoria(true);
                            }}>
                                Volver a Categorias
                            </Button>
                            <div hidden = {estadoClickCategoria} style={{ marginTop: "10px" }} align="center">    
                                <h5>Etiquetas</h5>
                                {etiquetas.map((radio, index) => (
                                    <Button
                                        key={radio.id}                                                 
                                        style={{width:"270px", height:"50px", marginLeft:"10px", textAlign:"left"}}
                                        value={radio.nombre}
                                        variant={etiquetaSeleccionada.nombre==radio.nombre ? "secondary":"outline-secondary"}
                                        onClick={() =>obtenerEtiquetaSeleccionada(radio.id, radio.nombre)} 
                                    >
                                        <Image style={{width:"40px", height:"40px", marginRight:"10px"}} src={radio.ejemplo} rounded></Image>
                                        {radio.nombre}
  
                                    </Button>
                                ))}
                            </div>

                            <div hidden = {estadoClickCategoria} style={{ marginTop: "20px" }} align="center">
                            <h6>Alteraciones</h6>
                                    {alteraciones.map((radio, index) => (
                                    <div key={radio.id}>
                                        <Button 
                                            key={radio.nombre}                                                 
                                            style={{width:"210px"}}
                                            value={radio.nombre}
                                            variant={alteracionSeleccionada.nombre==radio.nombre ? "secondary":"outline-secondary"}
                                            onClick={() =>obtenerAlteracionSeleccionada(radio.id, radio.nombre)} 
                                        >
                                            {radio.nombre}  
                                        </Button>
                                    </div>
                                    ))}
                                    <Button marginTop="10px" variant="info" onClick={enviarInfo}>
                                        Enviar
                                     </Button>
                            </div>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>¿Qué deseas hacer?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Puedes Volver a Ejercitar o volver al Menú principal</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={menu}>
                                    Volver a Menú
                                </Button>
                                <Button variant="primary" onClick={ejercitarNuevamente}>
                                    Volver a Ejercitar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <br></br>
                                    
            </Layout>
        )
}   

// Ejemplo tabla:
{/* <Table striped bordered hover>
        <thead>
            <tr>
            <th>Nucleo</th>
            <th>Citoplasma</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>
                <Button variant="secondary">
                    ejemplo
                </Button>
            </td>
            <td>
                <Button variant="secondary">
                    ejemplo
                </Button></td>
            </tr>
            <tr>
            <td>
                <Button variant="secondary">
                    ejemplo
                </Button>
            </td>
            <td>
                <Button variant="secondary">
                    ejemplo
                </Button>
            </td>
            </tr>
            <tr>
            <td >
            <Button variant="secondary">
                    ejemplo
                </Button>
            </td>
            <td>
                <Button variant="secondary">
                    ejemplo
                </Button>
            </td>
            </tr>
        </tbody>
    </Table> */}

export default Ejercitar;