require('dotenv').config(); // Carregar as variáveis de ambiente do arquivo .env

const nodemailer = require('nodemailer');

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // Obtém o serviço de email do .env
    host: process.env.EMAIL_HOST, // Obtém o host do .env
    port: process.env.EMAIL_PORT, // Obtém a porta do .env
    secure: process.env.EMAIL_SECURE === 'true', // Obtém o valor booleano do .env
    auth: {
        user: process.env.EMAIL_USER, // Obtém o usuário do .env
        pass: process.env.EMAIL_PASS // Obtém a senha do .env
    }
});

// Função para enviar o email
const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER, // Use o usuário do .env como remetente
            to: process.env.EMAIL_TO,
            subject: subject,
            text: text
        });
        console.log('Email enviado com sucesso.');
    } catch (error) {
        console.error('Erro ao enviar o email:', error);
    }
};

module.exports = sendEmail;
