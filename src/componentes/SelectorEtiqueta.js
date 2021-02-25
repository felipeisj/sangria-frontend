import React, { useState, useEffect, useContext } from 'react';
import { Api } from '../utils/Api';

export async function obtenerCategorias(){
    let etiquetas = await Api('api/categorias', {}, {}, false, 'get');
    if (etiquetas && etiquetas.status === 200) {
        return etiquetas.data.categorias   
    }else{
        return console.log("no encontrada")
    }
}

// function SelectorEtiqueta(){

    

//     async function setCategoria() {
//         try{
//             let resultado = await Api('api/etiquetas/post', {}, {}, false, 'POST');
//             console.log()
//         }
//     }

//     useEffect(
//         () => {
//             obtenerCategorias()
//         },
//         []
//     )

// }

// export default SelectorEtiqueta;