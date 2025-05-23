import React, {useEffect, useState} from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Spinner } from "react-bootstrap";
import useAuthToken from "../../components/useAuthToken";

function Autofacturas(props){
    const [autofacturas, setAutoFacturas] = useState([]);
    const { getPermisosInfo, getPermisoPorParametro, loading } = useAuthToken();
    const [permisosInfo, setPermisosInfo] = useState([]);
    const [cursorStyle, setCursorStyle] = useState('default');
    const [loadingTable, setLoadingTable] = useState(false);
    
    let base_url = localStorage.getItem('base_url');
    
    const esMenor = (fecAlta, dias) => {
        const fechaAlta = new Date(fecAlta); // Convierte fecAlta en un objeto Date
        const fechaActual = new Date(); // Obtiene la fecha y hora actual
        const diferenciaMilisegundos = fechaActual - fechaAlta; // Calcula la diferencia en milisegundos
        const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24); // Convierte la diferencia a días
    
        return diferenciaDias < dias; // Retorna true si la diferencia es menor a 2 días
    }

    const fetchData = (url, params) => {
        setCursorStyle('wait');
        return axios.get(url, params)
            .then((r) => {return r.data})
            .catch((e) => {
                console.log(e);
                setCursorStyle('default');
                return null;
            });
    };

    useEffect(() => {
        setCursorStyle('wait');
        setLoadingTable(true);
        fetchData(`${base_url}/db2/autofacturas`,{params: props.user})
         .then((d)=>{
             if (d){setCursorStyle('default'); setAutoFacturas(d);console.log(d); setLoadingTable(false);}
         });
    },[base_url, props.user])

    useEffect(() => {
        if (!loading) { 
            const permisos = getPermisosInfo();
            setPermisosInfo(permisos); 
        }
    }, [loading, getPermisosInfo]);

    const handleClick = (serComprobante,tipComprobante, nroComprobante, funcion) => {
        setCursorStyle('wait');
        let params = {
            id:props.user.id, 
            userId: props.user.userId, 
            nroComprobante:nroComprobante, 
            tipComprobante: tipComprobante,
            serComprobante: serComprobante
        };
        let url;
        if (funcion === 'sendComprobante'){
            url = '/db2/sendautofacturaset';
        }  else if (funcion === 'consultaLote') {
            url = '/consultlote';
        } else if (funcion === 'cancelaComp') {
            const confirmCancel = window.confirm('¿Estás seguro de que deseas anular este comprobante?');
            setCursorStyle('default');
            if (!confirmCancel) {
                setLoadingTable(false);
                return;
            }
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
                },responseType: 'blob'})
            .then((resp) =>{
                const href = window.URL.createObjectURL(resp.data);
                const anchorElement = document.createElement('a');
                anchorElement.href = href;
                anchorElement.download = 'AF 001-001-'+nroComprobante;
                document.body.appendChild(anchorElement);
                anchorElement.click();
                document.body.removeChild(anchorElement);
                window.URL.revokeObjectURL(href);
                setCursorStyle('default');
            })
            .catch(e => {console.log(e); setCursorStyle('default');})
        } else if (funcion === 'getXML') {
            url = '';
            axios.get(`${base_url}/getxmlfile`,{
                params: {
                    id:props.user.id, 
                    userId: props.user.userId, 
                    nroComprobante:nroComprobante, 
                    tipComprobante: tipComprobante,
                    serComprobante:serComprobante
                }, responseType: 'blob'})
            .then((resp) =>{
                const href = window.URL.createObjectURL(resp.data);
                const anchorElement = document.createElement('a');
                anchorElement.href = href;
                anchorElement.download = 'AF 001-001-'+nroComprobante;
                document.body.appendChild(anchorElement);
                anchorElement.click();
                document.body.removeChild(anchorElement);
                window.URL.revokeObjectURL(href);
                setCursorStyle('default');
            })
            .catch(e => {console.log(e); setCursorStyle('default');});
        }

        if (url.length > 0){
            setLoadingTable(true);
            fetchData(`${base_url}${url}`,{params: params})
            .then((data) => {
                alert(data.mensaje);
                fetchData(`${base_url}/db2/autofacturas`,{params: props.user}).then((d)=>{setAutoFacturas(d); setLoadingTable(false);});
            });
        }
        setCursorStyle('default');
    }

    const rows = autofacturas;

    const columns = [
        {
            field: "nroComprobante",
            headerName: "Autofactura Nro.", 
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
            field: "cliNombProveedor",
            headerName: "Cliente",
            width: 300,
            valueGetter: (params) => params.row.cli.NombProveedor
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
                <>
                    {getPermisoPorParametro(permisosInfo,'ENVIA_AUTOFACTURA') === 'S' ? ((params.row.estadoSifen !== 'Aprobado' && params.row.estadoSifen !== 'Anulado') ? <Button size="sm" variant="success" onClick={()=>handleClick(params.row.serComprobante,params.row.tipComprobante,params.row.nroComprobante,'sendComprobante')}>Enviar</Button> : '') : ''}
                    {getPermisoPorParametro(permisosInfo,'ANULA_AUTOFACTURA') === 'S' ? ((params.row.estadoSifen === 'Aprobado' && esMenor(params.row.fecCarga, 7)) ? <Button size="sm" variant="danger" onClick={()=>handleClick(params.row.serComprobante,params.row.tipComprobante,params.row.nroComprobante,'cancelaComp')}>Anular</Button> : '') : ''}
                    {getPermisoPorParametro(permisosInfo,'ENVIA_AUTOFACTURA') === 'S' ? ((params.row.estadoSifen === 'Lote Enviado') ? <Button size="sm" variant="primary" onClick={()=>handleClick(params.row.serComprobante,params.row.tipComprobante,params.row.nroComprobante,'consultaLote')}>Consultar Envio</Button> : '') : ''}
                    {getPermisoPorParametro(permisosInfo,'ENVIA_AUTOFACTURA') === 'S' ? ((params.row.estadoSifen === 'Lote Enviado' || params.row.estadoSifen === 'Lote Rechazado' ) ? <Button size="sm" variant="primary" onClick={()=>handleClick(params.row.serComprobante,params.row.tipComprobante,params.row.nroComprobante,'consultaDE')}>Consultar CDC</Button> : '') : ''}
                    {(params.row.jsonData !== 'N' && params.row.estadoSifen !== 'Anulado') ? <Button size="sm" variant="secondary" onClick={()=>handleClick(params.row.serComprobante,params.row.tipComprobante,params.row.nroComprobante,'getKuDE')}>Desc. KuDE</Button> : ''}
                    {(params.row.xmlData !== 'N' && params.row.estadoSifen !== 'Anulado') ? <Button size="sm" variant="secondary" onClick={()=>handleClick(params.row.serComprobante,params.row.tipComprobante,params.row.nroComprobante,'getXML')}>Desc. XML</Button> : ''}
                </>
            )
        },
    ]

    return(
        <div style={{ cursor: cursorStyle }}>
            {loadingTable ? <h3><Spinner animation="border" variant="primary" />Cargando</h3> :
            <div>
                <h3>AUTOFACTURAS</h3>
                <DataGrid
                    getRowId={(row) => row.codSeg}
                    rows={rows}
                    columns={columns}
                    initialState={{pagination:{paginationModel:{pageSize: 10}}}}
                    pageSizeOptions={[10, 25, 50, 100]}
                />
            </div>}
        </div>
    );
}

export default Autofacturas;