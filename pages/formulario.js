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
            message += `------------------------------\n`; // Divisão visual
    
            // Seção padrão: Matéria, Resumo da Aula e Capítulos
            message += `Matéria: ${aulaData.materia}\n`;
            message += `Resumo da Aula: ${aulaData.resumoAula}\n`;
            message += `Capítulos: ${aulaData.capitulos}\n`;
            message += `\n`;
    
            // Seção de Dever de Casa
            if(aulaData.teveDeverCasa)
            {
                message += `Dever de Casa:\n`;
                message += `Teve dever de casa: ${aulaData.teveDeverCasa ? 'Sim' : 'Não'}\n`;
                if (aulaData.teveDeverCasa && aulaData.deverCasa) {
                    message += `Tipo de dever de casa: ${aulaData.deverCasa.tipoDeverCasa}\n`;
                    if (aulaData.deverCasa.tipoDeverCasa === 'Livro' && aulaData.deverCasa.paginasLivro) {
                        message += `Páginas: ${aulaData.deverCasa.paginasLivro}\n`;
                    } else {
                        message += `Detalhes: ${aulaData.deverCasa.detalhesDeverCasa}\n`;
                    }
                }
                message += `\n`;
            }
            
    
            // Seção de Trabalho
            if(aulaData.teveTrabalho)
            {
                message += `Trabalho:\n`;
                message += `Teve trabalho: ${aulaData.teveTrabalho ? 'Sim' : 'Não'}\n`;
                if (aulaData.teveTrabalho && aulaData.trabalho) {
                    message += `Detalhes do trabalho: ${aulaData.trabalho.detalhesTrabalho}\n`;
                    message += `Data de entrega do trabalho: ${aulaData.trabalho.dataEntrega}\n`;
                }
                message += `\n`;
            }
    
            // Seção de Problema de Disciplina
            if(aulaData.teveProblemaDisciplina)
            {
                message += `Problema de Disciplina:\n`;
                message += `Teve problema de disciplina: ${aulaData.teveProblemaDisciplina ? 'Sim' : 'Não'}\n`;
                if (aulaData.teveProblemaDisciplina && aulaData.disciplina) {
                    message += `Detalhes do problema de disciplina: ${aulaData.disciplina.detalhes}\n`;
                }
                message += `\n`;
            }
           
    
            message += `------------------------------\n\n`; // Divisão visual entre aulas
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
                    to: "",
                    subject: 'Registro de Aulas: Fernando',
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
                    <div key={index}>
                        <AulaComponent key={index} index={index} materias={materias} aulasData={aulasData} setAulasData={setAulasData} onChange={handleAulaChange} />
                        {index !== numAulas - 1 && <hr />} {/* Separador */}
                    </div>
                ))}
                <input type="submit" value="Enviar" />
            </form>
            {envioStatus && (
                <p>{envioStatus === 'success' ? 'Email enviado com sucesso!' : 'Ocorreu um erro ao enviar o email.'}</p>
            )}
        </div>
    );
}
