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
        <div className="input-container">
            <label>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4"></path>
                    <path d="M12 16v4"></path>
                    <path d="M8 16v4"></path>
                    <path d="M16 16v4"></path>
                    <path d="M3 11V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path>
                </svg>
                Motivo de Anulación
            </label>
            <select value={selectedOption} onChange={handleOptionChange} required>
                <option value="">Selecciona un motivo para la anulación</option>
                {options.map((option, index) => (
                    <option key={index} value={option.codMotivoAnu}>{option.descripcion}</option>
                ))}
            </select>
        </div>
    );
};

export default ListBox;
