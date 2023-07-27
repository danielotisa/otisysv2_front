import React from "react";

function DatosComp(props) {
    
    //const {datos} = props;
    //const {comprobantes} = datos;
    console.log(props);
    return (
        <div className="datosComponent">
            {props.datos.map((data, i) => 
                <div>
                    <li>{data.tipComprobante+'-'+data.serComprobante+'-'+data.nroComprobante}</li>
                    <p>{data.estadoSifen}</p>
                    {(data.estadoSifen !== 'Aprobado' && data.estadoSifen !== 'Anulado') ? <button onClick={()=>props.onClick(data.tipComprobante,data.nroComprobante,'sendComprobante')}>Enviar</button> : ''}
                    {(data.estadoSifen === 'Aprobado') ? <button onClick={()=>props.onClick(data.tipComprobante,data.nroComprobante,'cancelaComp')}>Solicitar Anulación</button> : ''}
                    {(data.estadoSifen === 'Lote Enviado') ? <button onClick={()=>props.onClick(data.tipComprobante,data.nroComprobante,'consultaLote')}>Consultar Envio</button> : ''}
                    {(data.estadoSifen === 'Lote Enviado' || data.estadoSifen === 'Lote Rechazado' ) ? <button onClick={()=>props.onClick(data.tipComprobante,data.nroComprobante,'consultaDE')}>Consultar Comprobante</button> : ''}
                    {(data.jsonData !== null) ? <button onClick={()=>props.onClick(data.tipComprobante,data.nroComprobante,'getKuDE')}>Obtener KuDE</button> : ''}
                </div>
            )}
        </div>
        
    );
}

export default DatosComp