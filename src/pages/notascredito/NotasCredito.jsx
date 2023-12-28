import React, {useEffect, useState} from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

function NotasCredito(props){
    const [notascredito, setNotasCredito] = useState([]);
    
    //var url = window.location.hostname;
    let base_url = localStorage.getItem('base_url');
    /* if (url === process.env.REACT_APP_BASEIP_PROD) {
        base_url = (process.env.REACT_APP_ENV === 'prod') ? process.env.REACT_APP_BASEURL_PROD : process.env.REACT_APP_BASEURL_TEST;
    } else {
        base_url = (process.env.REACT_APP_ENV === 'prod') ? 'http://'+url+':8000/api' : process.env.REACT_APP_BASEURL_TEST;
    } */
    //const base_url = (localStorage.getItem('env') === 'prod') ? process.env.REACT_APP_BASEURL_PROD : process.env.REACT_APP_BASEURL_TEST;

    const fetchData = (url, params) => {
        return axios.get(url, params)
            .then((r) => {return r.data})
            .catch((e) => {
                console.log(e);
                return null;
            });
    };

    useEffect(() => {
        fetchData(`${base_url}/db2/notcred`,{params: props.user})
         .then((d)=>{
             if (d){setNotasCredito(d);}
         });
    },[base_url, props.user])
    
    const handleClick = (serComprobante,tipComprobante, nroComprobante, funcion) => {
        let params = {
            id:props.user.id, 
            userId: props.user.userId,
            nroComprobante:nroComprobante, 
            tipComprobante: tipComprobante,
            serComprobante: serComprobante};
        let url;

        if (funcion === 'sendComprobante') {
            url = '/db2/sendfacturaset';
        } else if (funcion === 'consultaLote') {
            url = '/consultlote';
        } else if (funcion === 'cancelaComp') {
            url = '/cancelacionset';
        } else if (funcion === 'consultaDE') {
            url = '/consultde';
        }else if (funcion === 'getKuDE') {
            url = '';
            axios.get(`${base_url}/getkude`,{
                params: {
                    id:props.user.id, 
                    userId: props.user.userId, 
                    nroComprobante:nroComprobante, 
                    tipComprobante: tipComprobante,
                    serComprobante: serComprobante
                }, responseType: 'blob'})
            .then((resp) =>{
                const href = window.URL.createObjectURL(resp.data);
                const anchorElement = document.createElement('a');
                anchorElement.href = href;
                anchorElement.download = `NC ${serComprobante}-${nroComprobante}`;
                document.body.appendChild(anchorElement);
                anchorElement.click();
                document.body.removeChild(anchorElement);
                window.URL.revokeObjectURL(href);
            })
            .catch(e => {console.log(e)})
        } else if (funcion === 'getXML') {
            url = '';
            axios.get(`${base_url}/getxmlfile`,{
                params: {
                    id:props.user.id, 
                    userId: props.user.userId, 
                    nroComprobante:nroComprobante, 
                    tipComprobante: tipComprobante,
                    serComprobante: serComprobante
                }, responseType: 'blob'})
            .then((resp) =>{
                const href = window.URL.createObjectURL(resp.data);
                const anchorElement = document.createElement('a');
                anchorElement.href = href;
                anchorElement.download = `NC ${serComprobante}-${nroComprobante}`;
                document.body.appendChild(anchorElement);
                anchorElement.click();
                document.body.removeChild(anchorElement);
                window.URL.revokeObjectURL(href);
            })
            .catch(e => {console.log(e)});
        }

        if (url.length > 0){
            fetchData(`${base_url}${url}`,{params: params})
            .then((data) => {
                alert(data.mensaje);
                fetchData(`${base_url}/db2/notcred`,{params: props.user}).then((d)=>{setNotasCredito(d);});
            });
        }
    }

    const rows = notascredito;

    const columns = [
        {
            field: "nroComprobante",
            headerName: "Nota de Crédito Nro.",
            width: 150,
            valueGetter: (params) => `${params.row.tipComprobante}-${params.row.serComprobante}-${params.row.nroComprobante}`
        },
        {
            field: "fecComprobante",
            headerName: "Fecha",
            type: 'datetime',
            valueGetter: ({ value }) => value && new Date(value).toLocaleDateString(),
            width: 100
        },
        {
            field: "nomCliente",
            headerName: "Cliente",
            width: 200
        },
        {
            field: "cdc",
            headerName: "CDC",
            width: 400
        },
        {
            field: "estadoSifen",
            headerName: "Estado"
        },
        {
            field: "options",
            headerName: "Opciones",
            sortable: false,
            width: 350,
            renderCell: (params) => (
                <div className="button-group">
                    {(params.row.estadoSifen !== 'Aprobado' && params.row.estadoSifen !== 'Anulado') ? <button onClick={()=>handleClick(params.row.tipComprobante,params.row.nroComprobante,'sendComprobante')}>Enviar</button> : ''}
                    {(params.row.estadoSifen === 'Aprobado') ? <button onClick={()=>handleClick(params.row.tipComprobante,params.row.nroComprobante,'cancelaComp')}>Anular</button> : ''}
                    {(params.row.estadoSifen === 'Lote Enviado') ? <button onClick={()=>handleClick(params.row.tipComprobante,params.row.nroComprobante,'consultaLote')}>Consultar Envio</button> : ''}
                    {(params.row.estadoSifen === 'Lote Enviado' || params.row.estadoSifen === 'Lote Rechazado' ) ? <button onClick={()=>handleClick(params.row.tipComprobante,params.row.nroComprobante,'consultaDE')}>Consultar CDC</button> : ''}
                    {(params.row.jsonData !== null) ? <button onClick={()=>handleClick(params.row.tipComprobante,params.row.nroComprobante,'getKuDE')}>Desc. KuDE</button> : ''}
                    {(params.row.xmlData !== null) ? <button onClick={()=>handleClick(params.row.tipComprobante,params.row.nroComprobante,'getXML')}>Desc. XML</button> : ''}
                </div>
            )
        },
    ]

    return(
        <div>
            <h3>NOTAS DE CREDITO</h3>
            <DataGrid
                getRowId={(row) => row.codSeg}
                rows={rows}
                columns={columns}
                initialState={{pagination:{paginationModel:{pageSize: 10}}}}
                pageSizeOptions={[10, 25, 50, 100]}
            />
        </div>
    );
}

export default NotasCredito;