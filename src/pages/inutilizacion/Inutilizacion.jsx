import React from "react";
import axios from "axios";

function Inutilizacion(props) {
    let base_url = localStorage.getItem('base_url');

    const handleSubmit = (e) => {
        e.preventDefault();
        var { tipComprobante, establecimiento, punto, desde, hasta, motivo} = document.forms[0];

        let params = {
            id: props.user.id,
            userId: props.user.userId,
            tipComprobante: tipComprobante.value,
            establecimiento: establecimiento.value,
            punto: punto.value, 
            desde: desde.value, 
            hasta: hasta.value, 
            motivo: motivo.value
        };

        axios.post(`${base_url}/inutilizacionset`,{params: params})
        .then((response) => {
            if (response.result) {
                alert(response.mensaje);
            } else {
                alert(`Error al enviar solicitud de inutilización, respuesta de la SET: ${response.mensaje}`);
            }
        });
    }

    return (
        <div className="content">
            <div className="page-header">
                <h1 className="page-title">Inutilización de Numeración</h1>
                <p className="page-subtitle">Solicite la inutilización de numeración de comprobantes electrónicos</p>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14,2 14,8 20,8"></polyline>
                            </svg>
                            Tipo de Comprobante
                        </label>
                        <select name="tipComprobante" required>
                            <option value="">Seleccione Tipo de Comprobante</option>
                            <option value="1">Factura Electrónica</option>
                            <option value="4">Autofactura Electrónica</option>
                            <option value="5">Nota de Crédito Electrónica</option>
                            <option value="7">Nota de Remisión Electrónica</option>
                        </select>
                    </div>

                    <div className="inutilizacion-form-grid-2">
                        <div className="input-container">
                            <label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9,22 9,12 15,12 15,22"></polyline>
                                </svg>
                                Establecimiento
                            </label>
                            <input
                                type="text"
                                name="establecimiento"
                                required
                                placeholder="Ingrese el establecimiento"
                            />
                        </div>

                        <div className="input-container">
                            <label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                Punto de Expedición
                            </label>
                            <input
                                type="text"
                                name="punto"
                                required
                                placeholder="Ingrese el punto de expedición"
                            />
                        </div>
                    </div>

                    <div className="inutilizacion-form-grid-2">
                        <div className="input-container">
                            <label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                                Número Desde
                            </label>
                            <input
                                type="number"
                                name="desde"
                                required
                                placeholder="Número inicial"
                                min="1"
                            />
                        </div>

                        <div className="input-container">
                            <label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                                Número Hasta
                            </label>
                            <input
                                type="number"
                                name="hasta"
                                required
                                placeholder="Número final"
                                min="1"
                            />
                        </div>
                    </div>

                    <div className="input-container">
                        <label>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            Motivo de Inutilización
                        </label>
                        <textarea
                            name="motivo"
                            required
                            placeholder="Describa el motivo de la inutilización"
                            rows="3"
                        />
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
                        <button type="submit" className="btn btn-primary inutilizacion-submit-btn">
                            Enviar Solicitud
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Inutilizacion;
