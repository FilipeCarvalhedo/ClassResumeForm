// pages/api/sendEmail.js

import sendEmail from '../../sendEmail';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { to, subject, text } = req.body;

        try {
            await sendEmail(to, subject, text);
            res.status(200).json({ message: 'Email enviado com sucesso.' });
        } catch (error) {
            console.error('Erro ao enviar o email:', error);
            res.status(500).json({ error: 'Erro ao enviar o email.' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido.' });
    }
}
