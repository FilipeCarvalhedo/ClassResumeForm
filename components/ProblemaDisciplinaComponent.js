import { useState } from 'react';

export default function ProblemaDisciplinaComponent({ aulasData, onChange }) {
    const [detalhes, setDetalhes] = useState('');

    const handleDetalhesChange = (e) => {
        setDetalhes(e.target.value);
        onChange('detalhes', e.target.value); // Chama a função onChange passando o campo e o valor

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
