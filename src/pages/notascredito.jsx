import React, {useEffect, useState} from "react";
import axios from "axios";

import DatosComp from "../components/datos_comp";

function NotasCredito(props){
    const [notascredito, setNotasCredito] = useState([]);
    
    const base_url = (localStorage.getItem('env') === 'prod') ? process.env.REACT_APP_BASEURL_PROD : process.env.REACT_APP_BASEURL_TEST;

    useEffect(() => {
        axios.get(`${base_url}/db2/notcred`,{params: props.user})
         .then((r)=>{setNotasCredito(r.data);})
         .catch((e)=>{console.log(e)});
    },[base_url, props.user])
    
    const handleClick = (nroComprobante) => {
        axios.get(`${base_url}/db2/sendfacturaset`,{params: {id:props.user.id, userId: props.user.userId, nroComprobante:nroComprobante}})
             .then((r)=>{console.log(r);
                window.location.reload();
                })
             .catch((e)=>{console.log(e)});
    }

    return(
        <div>
            <h3>NOTAS DE CREDITO</h3>
            <DatosComp datos={notascredito} onClick={handleClick}/>
        </div>
    );
}

export default NotasCredito;