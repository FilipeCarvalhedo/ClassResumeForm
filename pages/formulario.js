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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        for (const [name, value] of formData.entries()) {
            data[name] = value;
        }
        console.log(data); // Aqui você pode enviar os dados para onde desejar

        try {
            await axios.post('/api/sendEmail', {
                to: 'filipecarvalhedo@hotmail.com',
                subject: 'Registro de Aulas',
                text: JSON.stringify(data)
            });
            console.log('Email enviado com sucesso');
            alert('Email enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar o email:', error);
            alert('Ocorreu um erro ao enviar o email.');
        }

        // // Simulando um envio de email assíncrono
        // try {
        //     // Aqui você pode fazer a lógica para enviar o email
        //     // Se o envio for bem-sucedido, exibimos uma mensagem de sucesso
        //     setEnvioStatus('success');
        //     alert('Email enviado com sucesso!');
        // } catch (error) {
        //     // Se ocorrer um erro, exibimos uma mensagem de erro
        //     setEnvioStatus('error');
        //     alert('Ocorreu um erro ao enviar o email.');
        // }
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
                    <AulaComponent key={index} index={index} materias={materias} />
                ))}
                <input type="submit" value="Enviar" />
            </form>
            {envioStatus && (
                <p>{envioStatus === 'success' ? 'Email enviado com sucesso!' : 'Ocorreu um erro ao enviar o email.'}</p>
            )}
        </div>
    );
}
