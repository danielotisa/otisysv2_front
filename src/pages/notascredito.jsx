import React, {useEffect, useState} from "react";
import axios from "axios";

import DatosComp from "../components/datos_comp";

function NotasCredito(props){
    const [notascredito, setNotasCredito] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3000/db2/notcred',{params: props.user})
         .then((r)=>{setNotasCredito(r.data);})
         .catch((e)=>{console.log(e)});
    },[props.user])
    
    const handleClick = (nroComprobante) => {
        axios.get('http://localhost:3000/db2/sendfacturaset',{params: {id:props.user.id, userId: props.user.userId, nroComprobante:nroComprobante}})
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