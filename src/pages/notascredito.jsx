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
    
    const handleClick = (tipComprobante, nroComprobante, funcion) => {
        if (funcion === 'sendComprobante') {
            axios.get(`${base_url}/db2/sendfacturaset`,{
                params: {
                    id:props.user.id, 
                    userId: props.user.userId,
                    nroComprobante:nroComprobante, 
                    tipComprobante: tipComprobante}})
             .then((r)=>{console.log(r);
                window.location.reload();
                })
             .catch((e)=>{console.log(e)});
        } else if (funcion === 'getKuDE') {
            axios.get(`${base_url}/getkude`,{
                params: {
                    id:props.user.id, 
                    userId: props.user.userId, 
                    nroComprobante:nroComprobante, 
                    tipComprobante: tipComprobante
                }, responseType: 'blob'})
            .then((resp) =>{
                //const file = new Blob([resp.data],{type:'application/pdf'});
                //const downUrl = window.URL.createObjectURL(file);
                //window.open(downUrl);
                const href = window.URL.createObjectURL(resp.data);
                const anchorElement = document.createElement('a');
                anchorElement.href = href;
                anchorElement.download = 'NC 001-001-'+nroComprobante;
                document.body.appendChild(anchorElement);
                anchorElement.click();
                document.body.removeChild(anchorElement);
                window.URL.revokeObjectURL(href);
            })
            .catch(e => {console.log(e)})
        } else if (funcion === 'consultaLote') {
            axios.get(`${base_url}/consultlote`,{
                params: {
                    id:props.user.id,
                    userId: props.user.userId, 
                    nroComprobante:nroComprobante,
                    tipComprobante: tipComprobante
                }})
            .then((r)=>{console.log(r);
               window.location.reload();
               })
            .catch((e)=>{console.log(e)});
        } else if (funcion === 'cancelaComp') {
            axios.get(`${base_url}/cancelacionset`,{
                params: {
                    id:props.user.id,
                    userId: props.user.userId, 
                    nroComprobante:nroComprobante,
                    tipComprobante: tipComprobante
                }})
            .then((r)=>{console.log(r);
               window.location.reload();
               })
            .catch((e)=>{console.log(e)});
        }
    }

    return(
        <div>
            <h3>NOTAS DE CREDITO</h3>
            <DatosComp datos={notascredito} onClick={handleClick}/>
        </div>
    );
}

export default NotasCredito;