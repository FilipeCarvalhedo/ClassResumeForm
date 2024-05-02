import { useState } from 'react';
import AulaPrincipalComponent from './AulaPrincipalComponent';
import DeverCasaComponent from './DeverCasaComponent';
import TrabalhoComponent from './TrabalhoComponent';
import ProblemaDisciplinaComponent from './ProblemaDisciplinaComponent';

export default function AulaComponent() {
    const [materia, setMateria] = useState('');
    const [resumoAula, setResumoAula] = useState('');
    const [capitulos, setCapitulos] = useState('');
    const [teveDeverCasa, setTeveDeverCasa] = useState(false);
    const [teveTrabalho, setTeveTrabalho] = useState(false);
    const [teveProblemaDisciplina, setTeveProblemaDisciplina] = useState(false);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'teveDeverCasa') {
            setTeveDeverCasa(checked);
        } else if (name === 'teveTrabalho') {
            setTeveTrabalho(checked);
        } else if (name === 'teveProblemaDisciplina') {
            setTeveProblemaDisciplina(checked);
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
    };

    return (
        <div>
            <AulaPrincipalComponent onChange={handleAulaPrincipalChange} />
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="teveDeverCasa" style={{ marginRight: '10px' }}>
                    Teve dever de casa:
                    <input
                        type="checkbox"
                        id="teveDeverCasa"
                        name="teveDeverCasa"
                        checked={teveDeverCasa}
                        onChange={handleCheckboxChange}
                    />
                </label>
                {teveDeverCasa && <DeverCasaComponent />}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="teveTrabalho" style={{ marginRight: '10px' }}>
                    Teve trabalho:
                    <input
                        type="checkbox"
                        id="teveTrabalho"
                        name="teveTrabalho"
                        checked={teveTrabalho}
                        onChange={handleCheckboxChange}
                    />
                </label>
                {teveTrabalho && <TrabalhoComponent />}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="teveProblemaDisciplina" style={{ marginRight: '10px' }}>
                    Teve problema de disciplina:
                    <input
                        type="checkbox"
                        id="teveProblemaDisciplina"
                        name="teveProblemaDisciplina"
                        checked={teveProblemaDisciplina}
                        onChange={handleCheckboxChange}
                    />
                </label>
                {teveProblemaDisciplina && <ProblemaDisciplinaComponent />}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <hr style={{ borderTop: '2px solid #ccc' }} />
            </div>
        </div>
    );
}
