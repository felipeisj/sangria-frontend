import React, { useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from './Layout';
import { Api} from '../utils/Api';
import { Button, Modal, Image, Table} from 'react-bootstrap'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Ejercitar(props){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [esAlteracion, setEsAlteracion] = useState(false);
    const [subCategorias, setSubCategorias] = useState([]);
    const [subCategoriaSeleccionada, setSubCategoriaSeleccionada] = useState([]);
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
    const [celula, setCelula] = useState([]);
    const [alteracionSeleccionada, setAlteracionSeleccionada] = useState({
        id: "",
        nombre: ""
    });
    const [estadoClickCategoria, setEstadoClickCategoria] = useState(true);
    const [estadoMostrarCategoria, setEstadoMostrarCategoria] = useState(false);
    const menu = () => {
        props.history.push('/menu');
    }
    
    async function obtenerCategorias(){
        let categorias = await Api('api/categorias', {}, {}, true, 'get');  
        if (categorias && categorias.status === 200) {
            setCategoria(categorias.data.categorias)
        }else{
            toast.warning("No se encontraron categorías", {position: "bottom-center", autoClose: 4000, })
            setShow(false);
        }
    }

    function obtenerEtiquetaSeleccionada(etiqueta_id, etiqueta_nombre){
        if(esAlteracion){
            setAlteracionSeleccionada({
                'id' : etiqueta_id,
                'nombre' : etiqueta_nombre
            })
        }else{  
            setEtiquetaSeleccionada({
                'id' : etiqueta_id,
                'nombre' : etiqueta_nombre   
            })
        }
    }

    function limpiarDatos(){
        setCategoriaSeleccionada({
            id : "",
            nombre : ""
        });
        setEtiquetaSeleccionada({
            id : "",
            nombre : ""
        }); 
        setEtiquetas([]);
        setAlteracionSeleccionada([]);
        setAlteraciones([]);
        setEstadoMostrarCategoria(false);
        setEstadoClickCategoria(true);
        setEsAlteracion(false);
    }

    function ejercitarNuevamente(){
        handleClose()
        setEstadoMostrarCategoria(false);
        obtenerDatosCelula()
    }

    async function enviarInfo(){
        let data = {
            categoria_id : categoriaSeleccionada.id,
            categoria_nombre : categoriaSeleccionada.nombre,
            etiqueta_id : etiquetaSeleccionada.id,
            valor_etiqueta : etiquetaSeleccionada.nombre,
            celula_id : celula.id,
            alteracion_id : alteracionSeleccionada.id ? alteracionSeleccionada.id : "",
            valor_alteracion : alteracionSeleccionada.nombre
        }
        try{
            let post_etiqueta = await Api(`api/valor-etiqueta`, JSON.stringify(data),
                                            {'Content-Type': 'application/json'}, true,'post');
            if (post_etiqueta && post_etiqueta.status === 200) {
                setEstadoClickCategoria(true);
                // Si se envía la info, limpiamos los datos.
                limpiarDatos();
                setCelula([]); 
                toast.success("Etiqueta Enviada con éxito", {position: "bottom-center", autoClose: 1000, hideProgressBar: true,});
                setShow(true)                
            }else{
                toast.warning("Debe seleccionar Categoría y Tipo de Célula para Etiquetar", {position: "bottom-center", autoClose: 4000, })
                setShow(false);
            }
        }
        catch (error) {
            toast.warning("Error al enviar info", {position: "bottom-center", autoClose: 4000, })
            setShow(false);
        }

    }

    async function llamarEtiquetas(categoria_id, categoria_nombre, dependencia_id){
        if (categoria_id === 2){
            let subcategoria = await Api(`api/categoria/${categoria_id}/sub-categorias`, {}, {}, true, 'get');
            setSubCategorias(subcategoria.data.categorias)
        }else{
            setSubCategorias([]);
            setEstadoClickCategoria(true);
            let etiqueta = await Api(`api/etiquetas?categoria_id=${categoria_id}`, {}, {}, true, 'get');
            if (etiqueta && etiqueta.status === 200){
                setEtiquetas(etiqueta.data.etiquetas)
                if (categoriaSeleccionada.nombre==""){
                    setCategoriaSeleccionada({
                        id : categoria_id,
                        nombre : categoria_nombre
                    })
                }
                setEstadoClickCategoria(false);
                setEstadoMostrarCategoria(true);
            }else{
                toast.warning("Error al llamar etiquetas", {position: "bottom-center", autoClose: 4000, })
                setShow(false);
            }
        }

        if(dependencia_id){
            categoria_id = dependencia_id;
        }
        
        let alteracion = await Api(`api/categorias/alteraciones?categoria_id=${categoria_id}`, {}, {}, true, 'get');
        if (alteracion && alteracion.status == 200){
            setAlteraciones(alteracion.data.alteraciones)
        }else{
            console.log("eror al llamar alteraciones")
        }

          
    }

    async function obtenerDatosCelula() {
    let resultado = await Api('api/celula', {}, {}, true, 'get');
        if (resultado && resultado.status === 200) {
            setCelula(resultado.data.celula);
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
                                <h5>Seleccione línea</h5>
                                {estadoMostrarCategoria===false ? 
                                <>
                                    {categorias.map((radio, index) => (
                                        <>
                                        <Button 
                                            key={radio.id}
                                            variant={categoriaSeleccionada.id===radio.id ? "secondary":"outline-secondary"}
                                            value={radio.descripcion} 
                                            onClick={() => llamarEtiquetas(radio.id, radio.nombre)}
                                            style={{width:"250px"}} 
                                            >
                                            {radio.nombre}
                                        </Button>
                                        {/* // Poner if radio.nombre === leucocito / Desplegando sub categorias leucocito */}
                                        {radio.nombre ==="Leucocito" &&
                                            <> 
                                            {subCategorias.map((radio, index) => (
                                                <Button 
                                                    key={radio.id}
                                                    variant={subCategoriaSeleccionada.id===radio.id ? "secondary":"outline-secondary"}
                                                    value={radio.descripcion} 
                                                    onClick={() => llamarEtiquetas(radio.id, radio.nombre, radio.dependencia_id)}
                                                    style={{width:"210px", marginBottom:"5px"}} 
                                                    >
                                                    {radio.nombre}
                                                </Button>
                                            ))}
                                            </> //React fragment
                                        }
                                        </>
                                    ))}
                                </>     
                                :
                                  <></>  
                                }
                            </div>
                            <Button variant="outline-secondary" hidden={estadoClickCategoria} onClick={(e)=>{
                                limpiarDatos();
                            }}>
                                Volver a Línea
                            </Button>
                            <div hidden = {estadoClickCategoria} style={{ marginTop: "10px" }} align="center">    
                                <h6>{categoriaSeleccionada.nombre}</h6>
                                <h6>Seleccione la etiqueta</h6>
                                {etiquetas.map((radio, index) => (
                                    <Button
                                        key={radio.id}                                                 
                                        style={{width:"270px", height:"50px", marginLeft:"10px", textAlign:"left"}}
                                        value={radio.nombre}
                                        variant={etiquetaSeleccionada.nombre===radio.nombre || alteracionSeleccionada.nombre ===radio.nombre ? "secondary":"outline-secondary"}
                                        onClick={() =>obtenerEtiquetaSeleccionada(radio.id, radio.nombre)} 
                                    >
                                        <Image style={{width:"40px", height:"40px", marginRight:"10px"}} src={radio.ejemplo} rounded></Image>
                                        {radio.nombre}
  
                                    </Button>
                                ))}
                            </div>
                            <div hidden={estadoClickCategoria} style={{ marginTop: "20px" }} align="center">
                            <h6>Alteraciones</h6>
                                    {alteraciones.map((radio, index) => (
                                    <div key={radio.id}>
                                        <Button 
                                            key={radio.nombre}                                                 
                                            style={{width:"210px"}}
                                            value={radio.nombre}
                                            variant={alteracionSeleccionada.nombre===radio.nombre ? "secondary":"outline-secondary"}
                                            onClick={(e) =>{
                                                if (etiquetaSeleccionada.id){
                                                    setEsAlteracion(true);
                                                    llamarEtiquetas(radio.id, radio.nombre);
                                                }else{
                                                    toast.warning("Debe seleccionar el tipo de célula antes de ver alteraciones", {position: "bottom-center", autoClose: 4000, })
                                                    setShow(false);
                                                }
                                            }
                                            } 
                                        >
                                            {radio.nombre}
                                        </Button>
                                    </div>
                                    ))}
                            </div>
                                <Table striped bordered hover size="sm" hidden={estadoClickCategoria} style={{marginTop:"10px"}}>
                                    <thead>
                                        <tr>
                                            <th>Línea</th>
                                            <th>Célula</th>
                                            <th>Alteración</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{categoriaSeleccionada.nombre}</td>
                                            <td >{etiquetaSeleccionada.nombre}</td>
                                            <td >{alteracionSeleccionada.nombre}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Button  style={{width:"200px", height:"50px", marginTop:"20px"}} variant="info" onClick={(e)=>{
                                        enviarInfo();
                                        }
                                    }>
                                    Enviar respuesta
                                </Button> 
                                
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
            </Layout>
        )
}   



export default Ejercitar;