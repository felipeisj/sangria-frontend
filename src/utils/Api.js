import axios from 'axios';

axios.interceptors.response.use(response => { // Cuando las consultas son con 200 y algo
    //console.log(response);
    return response;
}, function (error) { // cuando las repsuestas son distintas del 200 y algo
    console.log('Interceptor error', error.response);

	if(error.response.status === 401 || error.response.status === 422) {
        alert('Su sesión ha caducado, presione aceptar e inicie sesión nuevamente.')
        localStorage.clear();
        return false;
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export function Api(recurso, datos=null, cabeceras={}, requiere_token=true, metodo='get') {
    if(requiere_token===true) {
        const token = localStorage.getItem('token');
        cabeceras['Authorization'] = `Bearer ${token}`;
    }
    // loading(true);
    return new Promise(function (resolve, reject) {
        axios({
            method: metodo,
            url: `${process.env.REACT_APP_API_URL}${recurso}`,
            data: datos,
            headers: cabeceras
        }).then(function (response) {
            // loading(false);
            resolve(response);
        }).catch(function (error) {
            // loading(false);
            resolve(error.response);
        });
    });
}

export function loading(activar) {
    if (activar) {
        document.getElementById("loading-global").style.display = "";
    } else {
        document.getElementById("loading-global").style.display = "none";
    }
}

export function ObjectToFormdata(object){
    var form_data = new FormData();
    for ( var key in object ) {
        form_data.append(key, object[key]);
    }
    return form_data;
}


export function getApiFile(file) {
    if (file) {
        return `${process.env.REACT_APP_API_URL}${file}`;
    } else {
        return '';
    }
    
}

export function getLocalFile(file) {
    return `${window.location.origin}/${file}`;
}