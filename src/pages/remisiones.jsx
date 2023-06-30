import React, {useEffect, useState} from "react";
import axios from "axios";

import DatosComp from "../components/datos_comp";


function Remisiones(props){
    const [remisiones, setRemisiones] = useState([]);
    
    const base_url = process.env.REACT_APP_BASEURL;

    useEffect(() => {
        axios.get(`${base_url}/db2/remisiones`,{params: props.user})
         .then((r)=>{setRemisiones(r.data);})
         .catch((e)=>{console.log(e)});
    },[props.user])

    const handleClick = (nroComprobante) => {
        axios.get(`${base_url}/db2/sendremisionset`,{params: {id:props.user.id, userId: props.user.userId, nroComprobante:nroComprobante}})
             .then((r)=>{console.log(r);
                window.location.reload();
                })
             .catch((e)=>{console.log(e)});
    }

    return(
        <div>
            <h3>REMISIONES</h3>
            <DatosComp datos={remisiones} onClick={handleClick}/>
        </div>
    );
}

export default Remisiones;