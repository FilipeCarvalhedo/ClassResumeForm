import { useState } from 'react';

export default function DeverCasaComponent({ aulasData, onChange }) {
    const [tipoDeverCasa, setTipoDeverCasa] = useState('');
    const [detalhesDeverCasa, setDetalhesDeverCasa] = useState('');
    const [paginasLivro, setPaginasLivro] = useState('');

    const handleTipoDeverChange = (e) => {
        setTipoDeverCasa(e.target.value);
        onChange('tipoDeverCasa', e.target.value); // Chama a função onChange passando o campo e o valor
    };

    const handleDetalhesDeverChange = (e) => {
        setDetalhesDeverCasa(e.target.value);
        onChange('detalhesDeverCasa', e.target.value); // Chama a função onChange passando o campo e o valor
    };

    const handlePaginasLivroChange = (e) => {
        setPaginasLivro(e.target.value);
        onChange('paginasLivro', e.target.value); // Chama a função onChange passando o campo e o valor
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
            <label htmlFor="tipoDeverCasa">Tipo de Dever de Casa:</label>
            <br />
            <select
                id="tipoDeverCasa"
                value={tipoDeverCasa}
                onChange={handleTipoDeverChange}
            >
                <option value="">Selecione o tipo de dever de casa</option>
                <option value="Caderno">Caderno</option>
                <option value="Livro">Livro</option>
                <option value="Folhas a Parte">Folhas a Parte</option>
            </select>
            <br />
            <div>
                <label htmlFor="DetalhesDeverCasa">
                    Detalhes do Dever de Casa:
                </label>
                <br />
                <textarea
                    id="detalhesDeverCasa"
                    value={detalhesDeverCasa}
                    onChange={handleDetalhesDeverChange}
                    rows={6} // Aumenta o número de linhas
                    cols={50} // Aumenta o número de colunas
                />
            </div>
        </div>
    );
}
