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
                    {(data.estadoSifen !== 'Aprobado') ? <button onClick={()=>props.onClick(data.nroComprobante)}>Enviar</button> : ''}
                </div>
            )}
        </div>
        
    );
}

export default DatosComp