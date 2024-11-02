import React, { useState } from 'react';
import axios from 'axios';

const ImportarFormulario = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setData(response.data);
    };

    return (
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            <ListaFormulario data={data} />
        </div>
    );
};

const ListaFormulario = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    {/* Ajusta las columnas según tus datos */}
                    {data.length > 0 && data[0].map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>
                                <a href={`/detail/${cell}`}>{cell}</a> {/* Cambia la lógica de enlace según sea necesario */}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ImportarFormulario;
