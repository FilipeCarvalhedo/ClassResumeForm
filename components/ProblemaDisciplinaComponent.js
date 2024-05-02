import { useState } from 'react';

export default function ProblemaDisciplinaComponent() {
    const [detalhes, setDetalhes] = useState('');

    const handleDetalhesChange = (e) => {
        setDetalhes(e.target.value);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
            <label htmlFor="detalhes">Detalhes:</label>
            <br />
            <textarea
                id="detalhes"
                value={detalhes}
                onChange={handleDetalhesChange}
                rows={6} // Aumenta o número de linhas
                cols={50} // Aumenta o número de colunas
            />
        </div>
    );
}
