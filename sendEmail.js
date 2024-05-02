const nodemailer = require('nodemailer');

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'seu_provedor_de_email', // Por exemplo, 'gmail'
    auth: {
        user: 'seu_email@example.com',
        pass: 'sua_senha'
    }
});

// Função para enviar o email
const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'seu_email@example.com',
            to,
            subject,
            text
        });
        console.log('Email enviado com sucesso.');
    } catch (error) {
        console.error('Erro ao enviar o email:', error);
    }
};

module.exports = sendEmail;
