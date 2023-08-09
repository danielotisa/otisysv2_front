import React, {useEffect, useState} from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function Facturas(props){ 
    const [facturas, setFacturas] = useState([]);
    
    const base_url = (localStorage.getItem('env') === 'prod') ? process.env.REACT_APP_BASEURL_PROD : process.env.REACT_APP_BASEURL_TEST;
    
    const fetchData = (url, params) => {
        return axios.get(url, params)
            .then((r) => {return r.data})
            .catch((e) => {
                console.log(e);
                return null;
            });
    };

    useEffect(() => { 
        fetchData(`${base_url}/db2/facturas`,{params: props.user})
        .then((d)=>{
            if (d){setFacturas(d);}
        });
    },[base_url, props.user])

    const handleClick = (tipComprobante, nroComprobante, funcion) => {
        let params = {
                id:props.user.id, 
                userId: props.user.userId, 
                nroComprobante:nroComprobante, 
                tipComprobante: tipComprobante
            }
        let url;
        if (funcion === 'sendComprobante') {
            url = '/db2/sendfacturaset';
        } else if (funcion === 'consultaLote') {
            url = '/consultlote';
        } else if (funcion === 'cancelaComp') {
            url = '/cancelacionset';
        } else if (funcion === 'consultaDE') {
            url = '/consultde';
        } else if (funcion === 'getKuDE') {
            axios.get(`${base_url}/getkude`,{
                params: {
                    id:props.user.id, 
                    userId: props.user.userId, 
                    nroComprobante:nroComprobante, 
                    tipComprobante: tipComprobante
                }, responseType: 'blob'})
            .then((resp) =>{
                const href = window.URL.createObjectURL(resp.data);
                const anchorElement = document.createElement('a');
                anchorElement.href = href;
                anchorElement.download = 'FAC 001-001-'+nroComprobante;
                document.body.appendChild(anchorElement);
                anchorElement.click();
                document.body.removeChild(anchorElement);
                window.URL.revokeObjectURL(href);
            })
            .catch(e => {console.log(e)});
        }

        if (url.length > 0){
            fetchData(`${base_url}${url}`, {params: params})
            .then((data) => {
                alert(data.mensaje);
                fetchData(`${base_url}/db2/facturas`,{params: props.user}).then((d)=>{setFacturas(d);});
            });
        }
    }

    const rows = facturas;

    const columns = [
        {
            field: "nroComprobante",
            headerName: "Factura Nro.",
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
                </div>
            )
        },
    ]
    
    return (
    <div>
        <h3>FACTURAS</h3>
        <DataGrid
            getRowId={(row) => row.codSeg}
            rows={rows}
            columns={columns}
            initialState={{pagination:{paginationModel:{pageSize: 10}}}}
            pageSizeOptions={[10, 25, 50, 100]}
        />
    </div>
)};

export default Facturas;