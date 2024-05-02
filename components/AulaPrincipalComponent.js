import React from 'react';

const materias = [
    'Português',
    'Matemática',
    'Ciências',
    'Artes',
    'Educação Física',
    'Geografia',
    'História',
    'Inglês',
    'Projeto Interdisciplinar 1',
    'Projeto Interdisciplinar 2',
    'Projeto Interdisciplinar 3'
];

export default function AulaPrincipalComponent({ onChange }) {
    const handleInputChange = (e) => {
        onChange('materia', e.target.value);
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <label htmlFor="materia">Matéria:</label>
            <select id="materia" name="materia" onChange={handleInputChange} required>
                {materias.map((materia, index) => (
                    <option key={index} value={materia}>{materia}</option>
                ))}
            </select>
            <br />
            <label htmlFor="resumoAula">Resumo da Aula:</label><br />
            <textarea id="resumoAula" name="resumoAula" rows="4" cols="50" onChange={(e) => onChange('resumoAula', e.target.value)} required></textarea>
            <br />
            <label htmlFor="capitulos">Capítulos:</label><br />
            <input type="text" id="capitulos" name="capitulos" onChange={(e) => onChange('capitulos', e.target.value)} required />
            <br />
        </div>
    );
}
