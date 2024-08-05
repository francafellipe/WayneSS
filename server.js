const express = require('express');
const cors = require('cors');
const inventoryRoutes = require('./backend/routes/inventory');
const authRoutes = require('./backend/auth');

const app = express();
const port = 3000;

// Configurações do middleware
app.use(cors());
app.use(express.json()); // Utiliza o método embutido do express para JSON

// Roteadores
app.use('/api/inventory', inventoryRoutes);
app.use('/api', authRoutes); // Certifique-se de que está usando '/api' para autenticação

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
