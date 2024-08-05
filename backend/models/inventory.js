const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Criar tabela se não existir
    db.run("CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY, tipo TEXT, nome TEXT, quantidade INTEGER, descricao TEXT, fabricante TEXT, validade TEXT, autorizadoPara TEXT)", (err) => {
        if (err) {
            console.error('Erro ao criar tabela:', err.message);
            return;
        }
        console.log('Tabela "inventory" criada ou já existe.');
    });

    // Inserir dados iniciais se a tabela estiver vazia, traz os dados do .bd criado na maquina pessoal.
    db.get("SELECT COUNT(*) AS count FROM inventory", (err, row) => {
        if (err) {
            console.error('Erro ao contar registros:', err.message);
            return;
        }
        if (row.count === 0) {
            const inicialData = [
                { tipo: "Equipamento", nome: "Capacete de Proteção", quantidade: 20, descricao: "Capacete de proteção para uso em áreas de obras", fabricante: "InfinityObras", validade: null, autorizadoPara: "Funcionario,Gerente,Administrador de Segurança" },
                { tipo: "Equipamento", nome: "Colete Reflexivo", quantidade: 50, descricao: "Colete reflexivo para alta visibilidade em áreas de risco.", fabricante: "Epi INfinity", validade: "2025-06-15", autorizadoPara: "Funcionario,Gerente,Administrador de Segurança" },
                { tipo: "Veículo", nome: "Caminhão de Bombeiros", quantidade: 2, descricao: "Veículo para combate a incêndios com escada e tanque de água.", fabricante: "VolksWagen", validade: "2030-01-01", autorizadoPara: "Gerente,Administrador de Segurança" },
                { tipo: "Veículo", nome: "Ambulância", quantidade: 3, descricao: "Veículo de emergência médica equipado com desfibrilador.", fabricante: "Infiat", validade: "2028-03-10", autorizadoPara: "Gerente,Administrador de Segurança" },
                { tipo: "Dispositivo de Segurança", nome: "Detector de Fumaça", quantidade: 100, descricao: "Detector de fumaça com alarme sonoro.", fabricante: "Securinty", validade: "2029-05-20", autorizadoPara: "Funcionario,Gerente,Administrador de Segurança" },
                { tipo: "Dispositivo de Segurança", nome: "Extintor de Incêndio", quantidade: 40, descricao: "Extintor de incêndio de pó químico ABC.", fabricante: "Extinty", validade: "2027-11-30", autorizadoPara: "Funcionario,Gerente,Administrador de Segurança" }
            ];

            const insert = db.prepare("INSERT INTO inventory (tipo, nome, quantidade, descricao, fabricante, validade, autorizadoPara) VALUES (?, ?, ?, ?, ?, ?, ?)");
            inicialData.forEach(item => {
                insert.run(item.tipo, item.nome, item.quantidade, item.descricao, item.fabricante, item.validade, item.autorizadoPara);
            });
            insert.finalize();
            console.log('Dados iniciais inseridos.');
        }
    });
});

function getInventory(callback) {
    db.all("SELECT * FROM inventory", [], (err, rows) => {
        if (err) {
            console.error('Erro ao consultar o inventário:', err.message);
            callback([]);
            return;
        }
        callback(rows);
    });
}

function addItem(item, callback) {
    const { tipo, nome, quantidade, descricao, fabricante, validade, autorizadoPara } = item;
    db.run("INSERT INTO inventory (tipo, nome, quantidade, descricao, fabricante, validade, autorizadoPara) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [tipo, nome, quantidade, descricao, fabricante, validade, autorizadoPara], function (err) {
            if (err) {
                console.error('Erro ao adicionar item:', err.message);
                callback(null);
                return;
            }
            callback(this.lastID);
        });
}

module.exports = { getInventory, addItem };
