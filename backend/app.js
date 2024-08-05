const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const auth = require('./auth');
const inventoryRoutes = require('./routes/inventory');

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));


app.use(auth);

app.use('/api/inventory', inventoryRoutes);

module.exports = app;
