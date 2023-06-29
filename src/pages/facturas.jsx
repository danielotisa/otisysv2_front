import React, {useEffect, useState} from "react";
import axios from "axios";

import DatosComp from '../components/datos_comp';

function Facturas(props){ 
    const [facturas, setFacturas] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3000/db2/facturas',{params: props.user})
         .then((r)=>{setFacturas(r.data);})
         .catch((e)=>{console.log(e)});
    },[props.user])
    
    const handleClick = (nroComprobante) => {
        axios.get('http://localhost:3000/db2/sendfacturaset',{params: {id:props.user.id, userId: props.user.userId, nroComprobante:nroComprobante}})
             .then((r)=>{console.log(r);
                window.location.reload();
                })
             .catch((e)=>{console.log(e)});
    }

    return (
    <div>
        <h3>FACTURAS</h3>
        <DatosComp datos={facturas} onClick={handleClick}/>
    </div>
)};

export default Facturas;