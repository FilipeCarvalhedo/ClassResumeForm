import { useState, useEffect } from 'react';
import AulaComponent from '../components/AulaComponent';

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

export default function Formulario() {
    const [numAulas, setNumAulas] = useState(6);
    const [aulasData, setAulasData] = useState([]);
    const [envioStatus, setEnvioStatus] = useState(null);

    useEffect(() => {
        const savedNumAulas = localStorage.getItem('numAulas');
        if (savedNumAulas) {
            setNumAulas(parseInt(savedNumAulas));
        }

        return () => {
            localStorage.removeItem('numAulas');
        };
    }, []);

    const handleNumAulasChange = (e) => {
        setNumAulas(parseInt(e.target.value));
        localStorage.setItem('numAulas', e.target.value);
        setAulasData(Array.from({ length: parseInt(e.target.value) }, () => ({})));
    };

    const handleAulaChange = (index, field, value) => {
        setAulasData((prevAulasData) => {
            const updatedAulasData = [...prevAulasData];
            updatedAulasData[index] = {
                ...updatedAulasData[index],
                [field]: value
            };
            return updatedAulasData;
        });
    };

    const buildEmailMessage = (num_aulas, aulasData) => {
        let message = `Registro de Aulas\n\nQuantidade de aulas: ${num_aulas}\n\n`;
        aulasData.forEach((aulaData, index) => {
            message += `Aula ${index + 1}:\n`;
            message += `Matéria: ${aulaData.materia}\n`;
            message += `Resumo da Aula: ${aulaData.resumoAula}\n`;
            message += `Capítulos: ${aulaData.capitulos}\n`;
            message += `Teve dever de casa: ${aulaData.teveDeverCasa ? 'Sim' : 'Não'}\n`;
            if (aulaData.teve_dever_casa && aulaData.dever_casa) {
                message += `Tipo de dever de casa: ${aulaData.dever_casa}\n`;
                if (aulaData.dever_casa === 'Livro' && aulaData.paginas) {
                    message += `Páginas: ${aulaData.paginas}\n`;
                } else {
                    message += `Detalhes: ${aulaData.detalhes}\n`;
                }
            }
            message += '\n';
        });
        return message;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(aulasData); // Aqui você pode enviar os dados para onde desejar

        const emailText = buildEmailMessage(numAulas, aulasData);
        console.log(emailText); // Verifique se o texto do email está correto

        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: 'filipecarvalhedo@hotmail.com',
                    subject: 'Registro de Aulas',
                    text: emailText
                })
            });
            if (response.ok) {
                setEnvioStatus('success');
                alert('Email enviado com sucesso!');
            } else {
                setEnvioStatus('error');
                alert('Ocorreu um erro ao enviar o email.');
            }
        } catch (error) {
            console.error('Erro ao enviar o email:', error);
            setEnvioStatus('error');
            alert('Ocorreu um erro ao enviar o email.');
        }
    };

    return (
        <div>
            <h2>Registro de Aulas</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="num_aulas">Quantas aulas você teve hoje?</label><br />
                <input
                    type="number"
                    id="num_aulas"
                    name="num_aulas"
                    value={numAulas}
                    onChange={handleNumAulasChange}
                    required
                /><br /><br />
                {[...Array(numAulas)].map((_, index) => (
                    <AulaComponent key={index} index={index} materias={materias} onChange={handleAulaChange} />
                ))}
                <input type="submit" value="Enviar" />
            </form>
            {envioStatus && (
                <p>{envioStatus === 'success' ? 'Email enviado com sucesso!' : 'Ocorreu um erro ao enviar o email.'}</p>
            )}
        </div>
    );
}
