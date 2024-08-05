const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/inventory');

router.get('/', (req, res) => {
    inventoryModel.getInventory(items => {
        console.log('Inventário:', items); // Adicione esta linha para depuração
        res.json(items);
    });
});


router.post('/', (req, res) => {
    const item = req.body;
    inventoryModel.addItem(item, id => {
        res.json({ id });
    });
});

module.exports = router;
