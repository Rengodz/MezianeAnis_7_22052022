const express = require('express');
require('dotenv').config({ path: './config/.env' });
const mysql = require('mysql');


const path = require('path');
const userRoutes = require('./routes/user');

const forumRoutes = require('./routes/forum');

mysql.connect(process.env.DB_CONFIG, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à la base de donnée réussie !'))
    .catch(() => console.log('Connexion à la base de donnée échouée !'));

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/forum', forumRoutes);

app.use('/api/auth', userRoutes);

module.exports = app;