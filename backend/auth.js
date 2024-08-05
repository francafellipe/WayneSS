const express = require('express');
const router = express.Router();

const users = {
    'funcionario1': { password: '1234', role: 'Funcionario' },
    'funcionario2': { password: '5432', role: 'Funcionario' },
    'gerente': { password: '5678', role: 'Gerente' },
    'admin': { password: 'admin', role: 'Administrador de Segurança' }
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Recebido username: ${username}, password: ${password}`); // Adicionado para depuração
    if (users[username] && users[username].password === password) {
        res.json({ success: true, role: users[username].role });
    } else {
        res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
});

module.exports = router;
