import React from "react";
import axios from "axios";
import { Button, Container, Form, FloatingLabel, Row, Col } from "react-bootstrap";

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
        <Container>
            <h1>Inutilización de Numeración de Comprobantes Electronicos</h1>        
            <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                    <Form.Group>
                        <FloatingLabel controlId="fsTipComprobante" label="Tipo de Comprobante">
                            <Form.Select name="tipComprobante">
                                <option value="">Seleccione Tipo de Comprobante</option>
                                <option value="1">FACTURA ELECTRONICA</option>
                                <option value="4">AUTOFACTURA ELECTRONICA</option>
                                <option value="5">NOTA DE CREDITO ELECTRONICA</option>
                                <option value="7">NOTA DE REMISION ELECTRONICA</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <FloatingLabel controlId="fsEstablecimiento" label="Establecimiento">
                            <Form.Control name="establecimiento" placeholder="Establecimiento"/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <FloatingLabel controlId="fspunto" label="Punto de Expedicion">
                            <Form.Control name="punto" placeholder="Punto de Expedicion"/>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <FloatingLabel controlId="fsDesde" label="Nro. Desde">
                            <Form.Control name="desde" placeholder="Nro. Desde"/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <FloatingLabel controlId="fsHasta" label="Nro. Hasta">
                            <Form.Control name="hasta" placeholder="Nro. Hasta"/>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <FloatingLabel controlId="fsMotivo" label="Motivo Inutilización">
                            <Form.Control name="motivo" placeholder="Motivo Inutilización"/>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit"> Enviar </Button>
            </Form>
        </Container>

    )
};

export default Inutilizacion;