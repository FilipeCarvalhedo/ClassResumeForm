import { useState } from 'react';

export default function TrabalhoComponent({ aulasData, onChange }) {
    const [detalhesTrabalho, setDetalhesTrabalho] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');

    const handleDetalhesTrabalhoChange = (e) => {
        setDetalhesTrabalho(e.target.value);
        onChange('detalhesTrabalho', e.target.value); // Chama a função onChange passando o campo e o valor
    };

    const handleDataEntregaChange = (e) => {
        setDataEntrega(e.target.value);
        onChange('dataEntrega', e.target.value); // Chama a função onChange passando o campo e o valor
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
            <label htmlFor="detalhesTrabalho">Detalhes do Trabalho:</label>
            <br />
            <textarea
                id="detalhesTrabalho"
                value={detalhesTrabalho}
                onChange={handleDetalhesTrabalhoChange}
                rows={6} // Aumenta o número de linhas
                cols={50} // Aumenta o número de colunas
            />
            <br />
            <label htmlFor="dataEntrega">Data de Entrega:</label>
            <br />
            <input
                type="date"
                id="dataEntrega"
                value={dataEntrega}
                onChange={handleDataEntregaChange}
            />
        </div>
    );
}
