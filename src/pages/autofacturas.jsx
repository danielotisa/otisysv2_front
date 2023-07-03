import React, {useEffect, useState} from "react";
import axios from "axios";

import DatosComp from '../components/datos_comp';

function Autofacturas(props){
    const [autofacturas, setAutoFacturas] = useState([]);
    
    const base_url = (localStorage.getItem('env') === 'prod') ? process.env.REACT_APP_BASEURL_PROD : process.env.REACT_APP_BASEURL_TEST;

    useEffect(() => {
        axios.get(`${base_url}/db2/autofacturas`,{params: props.user})
         .then((r)=>{setAutoFacturas(r.data);})
         .catch((e)=>{console.log(e)});
    },[base_url, props.user])

    const handleClick = (nroComprobante) => {
        axios.get(`${base_url}/db2/sendautofacturaset`,{params: {id:props.user.id, userId: props.user.userId, nroComprobante:nroComprobante}})
             .then((r)=>{console.log(r);
                window.location.reload();
                })
             .catch((e)=>{console.log(e)});
    }

    return(
        <div>
            <h3>AUTOFACTURAS</h3>
            <DatosComp datos={autofacturas} onClick={handleClick}/>
        </div>
    );
}

export default Autofacturas;