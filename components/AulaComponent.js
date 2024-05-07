import { useState, useEffect } from 'react';
import AulaPrincipalComponent from './AulaPrincipalComponent';
import DeverCasaComponent from './DeverCasaComponent';
import TrabalhoComponent from './TrabalhoComponent';
import ProblemaDisciplinaComponent from './ProblemaDisciplinaComponent';
import './styles/custom.css';

export default function AulaComponent({ index, materias, aulasData, setAulasData, onChange }) {
    const [materia, setMateria] = useState('');
    const [resumoAula, setResumoAula] = useState('');
    const [capitulos, setCapitulos] = useState('');
    const [teveDeverCasa, setTeveDeverCasa] = useState(false);
    const [teveTrabalho, setTeveTrabalho] = useState(false);
    const [teveProblemaDisciplina, setTeveProblemaDisciplina] = useState(false);
    const [teveDeverNaSala, setTeveDeverNaSala] = useState(false);
    const [teveMateriaNoQuadro, setTeveMateriaNoQuadro] = useState(false);

    // Definindo o valor inicial da matéria como uma string vazia
    useEffect(() => {
        setMateria('');
    }, [index]);

    const handleCheckboxChange = (e) => {
        e.stopPropagation(); // Impede a propagação do evento para os elementos pais
        const { name, checked } = e.target;
        if (name === `teveDeverCasa`) {
            setTeveDeverCasa(checked);
        } else if (name === `teveTrabalho`) {
            setTeveTrabalho(checked);
        } else if (name === `teveProblemaDisciplina`) {
            setTeveProblemaDisciplina(checked);
        } else if (name === 'teveDeverNaSala') {
            setTeveDeverNaSala(checked);
        } else if (name === 'teveMateriaNoQuadro') {
            setTeveMateriaNoQuadro(checked);
        }
        onChange(index, name, checked); // Chamando a função onChange passando o índice, nome e estado do checkbox
    };

    const handleAulaChange = (field, value) => {
        // Se o campo for relacionado ao dever de casa, precisamos atualizar aulasData de forma diferente
        if (field === 'tipoDeverCasa' || field === 'detalhesDeverCasa' || field === 'paginasLivro') {
            // Fazemos uma cópia do estado atual de aulasData
            const updatedAulasData = [...aulasData];
            // Se ainda não houver uma entrada para o dever de casa neste índice de aulasData, criamos uma nova entrada
            if (!updatedAulasData[index].deverCasa) {
                updatedAulasData[index].deverCasa = {};
            }
            // Atualizamos o campo específico do dever de casa
            updatedAulasData[index].deverCasa[field] = value;
            // Atualizamos o estado de aulasData com a nova cópia atualizada
            setAulasData(updatedAulasData);
        }
        else if (field === 'detalhesTrabalho' || field === 'dataEntrega') {
            // Fazemos uma cópia do estado atual de aulasData
            const updatedAulasData = [...aulasData];
            // Se ainda não houver uma entrada para o dever de casa neste índice de aulasData, criamos uma nova entrada
            if (!updatedAulasData[index].trabalho) {
                updatedAulasData[index].trabalho = {};
            }
            // Atualizamos o campo específico do dever de casa
            updatedAulasData[index].trabalho[field] = value;
            // Atualizamos o estado de aulasData com a nova cópia atualizada
            setAulasData(updatedAulasData);
        }
        else if (field === 'detalhes') {
            // Fazemos uma cópia do estado atual de aulasData
            const updatedAulasData = [...aulasData];
            // Se ainda não houver uma entrada para o dever de casa neste índice de aulasData, criamos uma nova entrada
            if (!updatedAulasData[index].disciplina) {
                updatedAulasData[index].disciplina = {};
            }
            // Atualizamos o campo específico do dever de casa
            updatedAulasData[index].disciplina[field] = value;
            // Atualizamos o estado de aulasData com a nova cópia atualizada
            setAulasData(updatedAulasData);
        } else {
            // Se não for um campo de dever de casa, atualizamos normalmente
            setAulasData((prevAulasData) => {
                const updatedAulasData = [...prevAulasData];
                updatedAulasData[index] = {
                    ...updatedAulasData[index],
                    [field]: value
                };
                return updatedAulasData;
            });
        }
    };

    const handleAulaPrincipalChange = (field, value) => {
        if (field === 'materia') {
            setMateria(value);
        } else if (field === 'resumoAula') {
            setResumoAula(value);
        } else if (field === 'capitulos') {
            setCapitulos(value);
        }
        onChange(index, field, value); // Chamando a função onChange passando o índice, campo e valor atualizado
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridColumnGap: '20px', marginBottom: '20px' }}>
            <div>
                <AulaPrincipalComponent index={index} onChange={handleAulaPrincipalChange} />
            </div>
            <div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor={`teveDeverCasa`} style={{ marginRight: '10px' }}>
                        Teve dever de casa:
                        <input
                            type="checkbox"
                            id={`teveDeverCasa`}
                            name={`teveDeverCasa`}
                            checked={teveDeverCasa}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                    {teveDeverCasa && <DeverCasaComponent onChange={handleAulaChange} />}
                </div>
            </div>
            <div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor={`teveTrabalho`} style={{ marginRight: '10px' }}>
                        Teve trabalho:
                        <input
                            type="checkbox"
                            id={`teveTrabalho`}
                            name={`teveTrabalho`}
                            checked={teveTrabalho}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                    {teveTrabalho && <TrabalhoComponent onChange={handleAulaChange} />}
                </div>
            </div>
            <div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor={`teveProblemaDisciplina`} style={{ marginRight: '10px' }}>
                        Teve problema de disciplina:
                        <input
                            type="checkbox"
                            id={`teveProblemaDisciplina`}
                            name={`teveProblemaDisciplina`}
                            checked={teveProblemaDisciplina}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                    {teveProblemaDisciplina && <ProblemaDisciplinaComponent onChange={handleAulaChange} />}
                </div>
            </div>
            <div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor={`teveDeverNaSala`} style={{ marginRight: '10px' }}>
                        Teve dever na sala:
                        <input
                            type="checkbox"
                            id={`teveDeverNaSala`}
                            name={`teveDeverNaSala`}
                            checked={teveDeverNaSala}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor={`teveMateriaNoQuadro`} style={{ marginRight: '10px' }}>
                        Teve matéria no quadro:
                        <input
                            type="checkbox"
                            id={`teveMateriaNoQuadro`}
                            name={`teveMateriaNoQuadro`}
                            checked={teveMateriaNoQuadro}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
