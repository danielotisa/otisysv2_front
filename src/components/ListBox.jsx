import React, { useState, useEffect } from 'react';
import axios from "axios";

const ListBox = ({id, userId, onOptionChange }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [options, setOptions] = useState([]);

    const base_url = localStorage.getItem('base_url');

    useEffect(() => {
        // Llamada a la API para obtener las opciones
        const fetchOptions = async () => {
            try {
                const response = await axios.get(`${base_url}/motivanula`, {
                    params: {
                        id: id, 
                        userId: userId,
                    }
                });
                setOptions(response.data); // Suponiendo que la respuesta contiene un array de opciones
            } catch (error) {
                console.error('Error al obtener las opciones:', error);
            }
        };

        fetchOptions();
    }, [id, userId, base_url]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        onOptionChange(e.target.value);
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleOptionChange}>
                <option value="">Selecciona un Motivo para la anulación</option>
                {options.map((option, index) => (
                    <option key={index} value={option.codMotivoAnu}>{option.descripcion}</option>
                ))}
            </select>
        </div>
    );
};

export default ListBox;
