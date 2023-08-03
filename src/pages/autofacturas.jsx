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

    const handleClick = (tipComprobante, nroComprobante, funcion) => {
        if (funcion === 'sendComprobante'){
            axios.get(`${base_url}/db2/sendautofacturaset`,{
                params: {
                    id:props.user.id, 
                    userId: props.user.userId, 
                    nroComprobante:nroComprobante, 
                    tipComprobante: tipComprobante
                }})
             .then((r)=>{console.log(r);
                let {data} = r;
                alert(data.mensaje);
                window.location.reload();
                })
             .catch((e)=>{console.log(e)});
        }else if (funcion === 'getKuDE') {
            axios.get(`${base_url}/getkude`,{
                params: {
                    id:props.user.id, 
                    userId: props.user.userId, 
                    nroComprobante:nroComprobante, 
                    tipComprobante: tipComprobante
                },responseType: 'blob'})
            .then((resp) =>{
                //const file = new Blob([resp.data],{type:'application/pdf'});
                //const downUrl = window.URL.createObjectURL(file);
                //window.open(downUrl);
                const href = window.URL.createObjectURL(resp.data);
                const anchorElement = document.createElement('a');
                anchorElement.href = href;
                anchorElement.download = 'AF 001-001-'+nroComprobante;
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
                let {data} = r;
                alert(data.mensaje);
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
                let {data} = r;
                alert(data.mensaje);
                window.location.reload();
                })
            .catch((e)=>{console.log(e)});
        } else if (funcion === 'consultaDE') {
            axios.get(`${base_url}/consultde`,{
                params: {
                    id:props.user.id,
                    userId: props.user.userId, 
                    nroComprobante:nroComprobante,
                    tipComprobante: tipComprobante
                }})
            .then((r)=>{console.log(r);
                let {data} = r;
                alert(data.mensaje);
                window.location.reload();
               })
            .catch((e)=>{console.log(e)});
        }
        
    }

    return(
        <div>
            <h3>AUTOFACTURAS</h3>
            <DatosComp datos={autofacturas} onClick={handleClick}/>
        </div>
    );
}

export default Autofacturas;